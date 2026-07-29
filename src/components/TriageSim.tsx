import { useState } from "react";
import { useLanguage } from "../i18n";
import triageQueue from "../data/triageQueue";

const ROW_HEIGHT = 46;

interface TriageSimProps {
  reducedMotion: boolean;
}

export default function TriageSim({ reducedMotion }: TriageSimProps) {
  const { t, lang } = useLanguage();
  const [played, setPlayed] = useState(false);

  const run = () => setPlayed(true);
  const reset = () => setPlayed(false);

  const urgencyLabel = {
    critical: t.triage.critical,
    priority: t.triage.priority,
    routine: t.triage.routine,
  } as const;

  return (
    <section className="section" id="triage">
      <div className="shell">
        <p className="section-label">{t.triage.label}</p>
        <h2 className="section-title">{t.triage.title}</h2>
        <p className="section-sub">{t.triage.sub}</p>

        <div className="triage">
          <div className="triage__labels mono">
            <span>{played ? t.triage.after : t.triage.before}</span>
            <button
              type="button"
              className="btn btn--outline"
              onClick={played ? reset : run}
            >
              {played ? t.triage.replay : t.triage.play}
            </button>
          </div>

          <div
            className="triage__list"
            style={{ height: triageQueue.length * ROW_HEIGHT }}
          >
            {triageQueue.map((item) => {
              const position = played ? item.aiPosition : item.initialPosition;
              return (
                <div
                  key={item.id}
                  className={`triage__row triage__row--${item.urgency} ${
                    reducedMotion ? "no-anim" : ""
                  }`}
                  style={{ top: (position - 1) * ROW_HEIGHT }}
                >
                  <span className="triage__rank mono">{position}</span>
                  <span className={`triage__dot triage__dot--${item.urgency}`} aria-hidden="true" />
                  <span className="triage__label">{item.label[lang]}</span>
                  <span className="triage__urgency mono">{urgencyLabel[item.urgency]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="triage__caption">{t.triage.caption}</p>
      </div>
    </section>
  );
}
