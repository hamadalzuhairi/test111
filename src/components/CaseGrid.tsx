import { useLanguage } from "../i18n";
import cases from "../data/cases";
import type { RadiologyCase } from "../data/types";
import ScanCanvas from "./ScanCanvas";

interface CaseGridProps {
  onOpenCase: (id: string) => void;
  completedIds: Set<string>;
}

function tagFor(c: RadiologyCase, t: ReturnType<typeof useLanguage>["t"]) {
  if (c.aiOutcome === "false_positive") return { text: t.caseGrid.falsePositive, cls: "tag--alert" };
  if (c.aiOutcome === "miss") return { text: t.caseGrid.miss, cls: "tag--alert" };
  if (c.difficulty === "subtle") return { text: t.caseGrid.subtle, cls: "tag--amber" };
  return { text: t.caseGrid.easy, cls: "tag--phosphor" };
}

export default function CaseGrid({ onOpenCase, completedIds }: CaseGridProps) {
  const { t, lang } = useLanguage();

  return (
    <section className="section" id="cases">
      <div className="shell">
        <p className="section-label">{t.caseGrid.label}</p>
        <h2 className="section-title">{t.caseGrid.title}</h2>
        <p className="section-sub">{t.caseGrid.sub}</p>

        <div className="case-grid">
          {cases.map((c) => {
            const tag = tagFor(c, t);
            const done = completedIds.has(c.id);
            return (
              <button
                type="button"
                key={c.id}
                className={`case-card ${done ? "is-done" : ""}`}
                onClick={() => onOpenCase(c.id)}
              >
                <div className="case-card__thumb">
                  <ScanCanvas
                    imageKind={c.imageKind}
                    variant={c.variant}
                    altText={`${c.bodyRegion[lang]} ${c.modality[lang]}`}
                    cornerTag={c.modality[lang].toUpperCase()}
                  />
                  {done && <span className="case-card__done" aria-hidden="true">✓</span>}
                </div>
                <div className="case-card__body">
                  <span className={`tag ${tag.cls}`}>{tag.text}</span>
                  <h3 className="case-card__title">
                    {c.bodyRegion[lang]} · {c.modality[lang]}
                  </h3>
                  <p className="case-card__history">{c.history[lang]}</p>
                  <span className="case-card__cta">{t.caseGrid.startCase} →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
