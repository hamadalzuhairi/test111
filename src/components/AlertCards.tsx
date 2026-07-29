import { useLanguage } from "../i18n";

const ICONS = ["↻", "✓", "☓", "◔", "◐", "⎘"];

export default function AlertCards() {
  const { t } = useLanguage();

  return (
    <section className="section" id="alerts">
      <div className="shell">
        <p className="section-label">{t.alerts.label}</p>
        <h2 className="section-title">{t.alerts.title}</h2>

        <div className="alert-grid">
          {t.alerts.items.map((item, i) => (
            <div className="alert-card" key={i}>
              <span className="alert-card__icon mono" aria-hidden="true">
                {ICONS[i % ICONS.length]}
              </span>
              <p className="alert-card__text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
