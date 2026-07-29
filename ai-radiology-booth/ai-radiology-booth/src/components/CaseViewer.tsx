import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n";
import type { RadiologyCase } from "../data/types";
import ScanCanvas, { type TapPoint } from "./ScanCanvas";
import AIOverlay from "./AIOverlay";
import Scoreboard from "./Scoreboard";

const STEP1_SECONDS = 15;
const AI_PROCESS_MS = 1150;

interface CaseResult {
  youCorrect: boolean;
  aiCorrect: boolean;
}

interface CaseViewerProps {
  caseData: RadiologyCase;
  caseNumber: number;
  totalCases: number;
  onClose: () => void;
  onComplete: (caseId: string, result: CaseResult) => void;
  onNextCase: () => void;
  hasNext: boolean;
  scoreYou: number;
  scoreAI: number;
  scoreTotal: number;
  reducedMotion: boolean;
}

function pointInRegion(p: TapPoint, r: { x: number; y: number; width: number; height: number }, pad = 4) {
  return (
    p.x >= r.x - pad &&
    p.x <= r.x + r.width + pad &&
    p.y >= r.y - pad &&
    p.y <= r.y + r.height + pad
  );
}

export default function CaseViewer({
  caseData,
  caseNumber,
  totalCases,
  onClose,
  onComplete,
  onNextCase,
  hasNext,
  scoreYou,
  scoreAI,
  scoreTotal,
  reducedMotion,
}: CaseViewerProps) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [tapPoint, setTapPoint] = useState<TapPoint | null>(null);
  const [chosenNone, setChosenNone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(STEP1_SECONDS);
  const [aiRevealed, setAiRevealed] = useState(false);
  const [reported, setReported] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset local state whenever a new case is loaded into the viewer.
  useEffect(() => {
    setStep(1);
    setTapPoint(null);
    setChosenNone(false);
    setTimeLeft(STEP1_SECONDS);
    setAiRevealed(false);
    setReported(false);
  }, [caseData.id]);

  useEffect(() => {
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Step 1 countdown
  useEffect(() => {
    if (step !== 1) return;
    if (timeLeft <= 0) {
      setChosenNone(true);
      window.setTimeout(() => setStep(2), 550);
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [step, timeLeft]);

  // Step 2 processing -> reveal
  useEffect(() => {
    if (step !== 2) return;
    setAiRevealed(false);
    const id = window.setTimeout(() => setAiRevealed(true), reducedMotion ? 150 : AI_PROCESS_MS);
    return () => window.clearTimeout(id);
  }, [step, reducedMotion]);

  const youHit = useMemo(() => {
    if (!tapPoint) return false;
    return caseData.groundTruth.some((r) => pointInRegion(tapPoint, r));
  }, [tapPoint, caseData.groundTruth]);

  const youCorrect = caseData.expected === "none" ? chosenNone : !chosenNone && youHit;

  useEffect(() => {
    if (step === 3 && !reported) {
      onComplete(caseData.id, { youCorrect, aiCorrect: caseData.aiOutcome === "correct" });
      setReported(true);
    }
  }, [step, reported, onComplete, caseData.id, caseData.aiOutcome, youCorrect]);

  const handleTap = (p: TapPoint) => {
    if (step !== 1) return;
    setTapPoint(p);
    setChosenNone(false);
    window.setTimeout(() => setStep(2), 450);
  };

  const handleNone = () => {
    if (step !== 1) return;
    setChosenNone(true);
    setTapPoint(null);
    window.setTimeout(() => setStep(2), 350);
  };

  const overlayTone = caseData.aiOutcome === "correct" ? "ai" : "ai-wrong";

  const youLabel =
    caseData.expected === "none"
      ? youCorrect
        ? t.viewer.noneCorrect
        : t.viewer.noneIncorrect
      : youCorrect
      ? t.viewer.hit
      : t.viewer.missResult;

  const aiLabel =
    caseData.aiOutcome === "correct"
      ? t.viewer.aiCorrect
      : caseData.aiOutcome === "false_positive"
      ? t.viewer.aiFalsePositive
      : t.viewer.aiMiss;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal case-viewer"
        role="dialog"
        aria-modal="true"
        aria-label={`${caseData.bodyRegion[lang]} · ${caseData.modality[lang]}`}
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-viewer__topbar">
          <div className="case-viewer__progress mono">
            {t.viewer.step} {step} {t.viewer.of} 4 · {caseNumber}/{totalCases}
          </div>
          <Scoreboard you={scoreYou} ai={scoreAI} total={scoreTotal} compact />
          <button type="button" className="modal__close" onClick={onClose} aria-label={t.viewer.close}>
            ✕
          </button>
        </div>

        <div className="case-viewer__body">
          <div className="case-viewer__stage">
            <ScanCanvas
              imageKind={caseData.imageKind}
              variant={caseData.variant}
              altText={`${caseData.bodyRegion[lang]} ${caseData.modality[lang]} — ${caseData.groundTruthLabel[lang]}`}
              cornerTag={caseData.modality[lang].toUpperCase()}
              interactive={step === 1}
              onTap={handleTap}
              tapPoint={tapPoint}
              tapCorrect={step >= 2 ? youCorrect : null}
              sweepActive={step === 2 && !aiRevealed}
              reducedMotion={reducedMotion}
            >
              {step >= 2 && aiRevealed && (
                <AIOverlay
                  regions={caseData.aiFindings.map((f) => ({
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height,
                    label: f.label[lang],
                    confidence: f.confidence,
                  }))}
                  tone={overlayTone}
                  reducedMotion={reducedMotion}
                />
              )}
              {step >= 3 && (
                <AIOverlay
                  regions={caseData.groundTruth.map((r) => ({ ...r, label: caseData.groundTruthLabel[lang] }))}
                  tone="radiologist"
                  reducedMotion={reducedMotion}
                />
              )}
            </ScanCanvas>
            <p className="case-viewer__history">
              <span className="mono">{t.viewer.history}:</span> {caseData.history[lang]}
            </p>
          </div>

          <div className="case-viewer__panel">
            {step === 1 && (
              <div className="viewer-step">
                <h3 className="viewer-step__title">{t.viewer.step1Title}</h3>
                <p className="viewer-step__prompt">{t.viewer.step1Prompt}</p>
                <div className="viewer-step__timer mono" aria-live="polite">
                  {timeLeft > 0
                    ? `${timeLeft} ${t.viewer.step1TimeLeft}`
                    : t.viewer.step1TimeUp}
                </div>
                <button type="button" className="btn btn--outline btn--large" onClick={handleNone}>
                  {t.viewer.step1None}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="viewer-step">
                <h3 className="viewer-step__title">{t.viewer.step2Title}</h3>
                {!aiRevealed ? (
                  <p className="viewer-step__analyzing mono">{t.viewer.step2Analyzing}</p>
                ) : (
                  <>
                    <p className="viewer-step__ai-time mono">
                      {t.viewer.step2ResponseTime}: {caseData.aiResponseSeconds.toFixed(1)} s
                    </p>
                    <button type="button" className="btn btn--primary btn--large" onClick={() => setStep(3)}>
                      {t.viewer.step2Continue}
                    </button>
                  </>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="viewer-step">
                <h3 className="viewer-step__title">{t.viewer.step3Title}</h3>
                <ul className="verdict-cards">
                  <li className="verdict-card verdict-card--you" style={{ animationDelay: "0ms" }}>
                    <span className="verdict-card__who">{t.viewer.verdictYou}</span>
                    <span className={`verdict-card__result ${youCorrect ? "is-good" : "is-bad"}`}>{youLabel}</span>
                  </li>
                  <li className="verdict-card verdict-card--ai" style={{ animationDelay: "160ms" }}>
                    <span className="verdict-card__who">{t.viewer.verdictAI}</span>
                    <span className={`verdict-card__result ${caseData.aiOutcome === "correct" ? "is-good" : "is-bad"}`}>
                      {aiLabel}
                    </span>
                  </li>
                  <li className="verdict-card verdict-card--radiologist" style={{ animationDelay: "320ms" }}>
                    <span className="verdict-card__who">{t.viewer.verdictRadiologist}</span>
                    <p className="verdict-card__report">{caseData.radiologistReport[lang]}</p>
                    <p className="verdict-card__note">
                      <span className="mono">{t.viewer.radiologistNote}:</span> {caseData.doctorAddedNote[lang]}
                    </p>
                  </li>
                </ul>
                <button type="button" className="btn btn--primary btn--large" onClick={() => setStep(4)}>
                  {t.viewer.step4Title} →
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="viewer-step">
                <h3 className="viewer-step__title">{t.viewer.step4Title}</h3>
                <p className="viewer-step__takeaway">{caseData.takeaway[lang]}</p>
                <div className="viewer-step__actions">
                  {hasNext ? (
                    <button type="button" className="btn btn--primary btn--large" onClick={onNextCase}>
                      {t.viewer.nextCase} →
                    </button>
                  ) : null}
                  <button type="button" className="btn btn--outline btn--large" onClick={onClose}>
                    {t.viewer.backToAll}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
