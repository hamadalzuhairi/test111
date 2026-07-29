import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";
import cases from "../data/cases";
import ScanCanvas from "./ScanCanvas";
import AIOverlay from "./AIOverlay";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const LOOP = cases.slice(0, 4);
const CYCLE_MS = 4200;
const REVEAL_MS = 1100;

export default function AttractHero() {
  const { t, lang } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    setRevealed(false);
    const revealTimer = window.setTimeout(() => setRevealed(true), REVEAL_MS);
    const nextTimer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % LOOP.length);
    }, CYCLE_MS);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(nextTimer);
    };
  }, [index, reducedMotion]);

  const current = LOOP[index];

  const scrollToCases = () => {
    document.getElementById("cases")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section className="hero shell">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="section-label">{t.hero.kicker}</p>
          <h1 className="hero__question">{t.hero.question}</h1>
          <p className="hero__answer">{t.hero.answer}</p>
          <p className="hero__booth-message">{t.hero.boothMessage}</p>
          <button type="button" className="btn btn--primary btn--large" onClick={scrollToCases}>
            {t.hero.cta}
          </button>
          <p className="hero__cta-sub mono">{t.hero.ctaSub}</p>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <ScanCanvas
            key={current.id}
            imageKind={current.imageKind}
            variant={current.variant}
            altText=""
            sweepActive={!reducedMotion}
            reducedMotion={reducedMotion}
            cornerTag={current.modality[lang].toUpperCase()}
          >
            {revealed && (
              <AIOverlay
                regions={current.aiFindings.map((f) => ({
                  x: f.x,
                  y: f.y,
                  width: f.width,
                  height: f.height,
                  label: f.label[lang],
                  confidence: f.confidence,
                }))}
                tone={current.aiOutcome === "correct" ? "ai" : "ai-wrong"}
                reducedMotion={reducedMotion}
                confidenceSuffix=""
              />
            )}
          </ScanCanvas>
          <div className="hero__visual-caption mono">
            {revealed ? `AI · ${current.aiFindings[0]?.confidence ?? "—"}%` : t.viewer.step2Analyzing}
          </div>
        </div>
      </div>
    </section>
  );
}
