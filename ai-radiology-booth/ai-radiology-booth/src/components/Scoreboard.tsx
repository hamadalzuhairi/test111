import { useLanguage } from "../i18n";

interface ScoreboardProps {
  you: number;
  ai: number;
  total: number;
  compact?: boolean;
}

export default function Scoreboard({ you, ai, total, compact }: ScoreboardProps) {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="scoreboard scoreboard--compact mono" aria-live="polite">
        <span>
          {t.scoreboard.you} {you}/{total}
        </span>
        <span className="scoreboard__sep">·</span>
        <span>
          {t.scoreboard.ai} {ai}/{total}
        </span>
        <span className="scoreboard__sep">·</span>
        <span>
          {t.scoreboard.radiologist} {total}/{total}
        </span>
      </div>
    );
  }

  return (
    <div className="scoreboard">
      <p className="section-label">{t.scoreboard.label}</p>
      <div className="scoreboard__row mono">
        <div className="scoreboard__cell">
          <span className="scoreboard__value">
            {you}/{total}
          </span>
          <span className="scoreboard__name">{t.scoreboard.you}</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--ai">
          <span className="scoreboard__value">
            {ai}/{total}
          </span>
          <span className="scoreboard__name">{t.scoreboard.ai}</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--radiologist">
          <span className="scoreboard__value">
            {total}/{total}
          </span>
          <span className="scoreboard__name">{t.scoreboard.radiologist}</span>
        </div>
      </div>
      <p className="scoreboard__footnote">{t.scoreboard.footnote}</p>
    </div>
  );
}
