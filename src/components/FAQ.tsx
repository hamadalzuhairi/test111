import { useState } from "react";
import { useLanguage } from "../i18n";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="shell">
        <p className="section-label">{t.faq.label}</p>
        <h2 className="section-title">{t.faq.title}</h2>

        <div className="faq">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className="faq__item" key={i}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__chevron mono" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && <p className="faq__answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
