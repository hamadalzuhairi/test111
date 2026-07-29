import { useLanguage } from "../i18n";

export default function CompareColumns() {
  const { t } = useLanguage();

  return (
    <section className="section" id="compare">
      <div className="shell">
        <p className="section-label">{t.compare.label}</p>
        <h2 className="section-title">{t.compare.title}</h2>

        <div className="compare">
          <div className="compare__col compare__col--ai">
            <h3 className="compare__title">{t.compare.aiTitle}</h3>
            <ul className="compare__list">
              {t.compare.aiItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="compare__divider" aria-hidden="true" />
          <div className="compare__col compare__col--doc">
            <h3 className="compare__title">{t.compare.docTitle}</h3>
            <ul className="compare__list">
              {t.compare.docItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
