import { useLanguage } from "../i18n";

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="header">
      <div className="shell header__row">
        <div className="header__brand">
          <span className="header__dot" aria-hidden="true" />
          <span className="header__booth">{t.header.booth}</span>
        </div>
        <button
          type="button"
          className="header__lang"
          onClick={toggleLang}
          aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        >
          <span className={lang === "en" ? "is-active" : ""}>EN</span>
          <span className="header__lang-sep">|</span>
          <span className={lang === "ar" ? "is-active" : ""}>ع</span>
        </button>
      </div>
    </header>
  );
}
