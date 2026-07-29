import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n";

const IDLE_MS = 90_000;
const WARNING_SECONDS = 5;
const ACTIVITY_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

interface IdleResetProps {
  onReset: () => void;
  paused?: boolean;
}

export default function IdleReset({ onReset, paused }: IdleResetProps) {
  const { t } = useLanguage();
  const [warning, setWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_SECONDS);
  const idleTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (countdownTimer.current) window.clearInterval(countdownTimer.current);
  };

  const armIdleTimer = useCallback(() => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      setWarning(true);
      setCountdown(WARNING_SECONDS);
    }, IDLE_MS);
  }, []);

  // Warning countdown
  useEffect(() => {
    if (!warning) return;
    countdownTimer.current = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(countdownTimer.current!);
          setWarning(false);
          onReset();
          armIdleTimer();
          return WARNING_SECONDS;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (countdownTimer.current) window.clearInterval(countdownTimer.current);
    };
  }, [warning, onReset, armIdleTimer]);

  const handleStillHere = () => {
    setWarning(false);
    armIdleTimer();
  };

  useEffect(() => {
    if (paused) {
      clearTimers();
      setWarning(false);
      return;
    }
    armIdleTimer();
    const onActivity = () => {
      if (!warning) armIdleTimer();
    };
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, onActivity, { passive: true }));
    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, onActivity));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, armIdleTimer]);

  if (!warning) return null;

  return (
    <div className="idle-warning" role="alertdialog" aria-live="assertive">
      <div className="idle-warning__box">
        <p className="idle-warning__title">{t.idle.warning}</p>
        <p className="idle-warning__count mono">
          {t.idle.resetting} {countdown}s
        </p>
        <button type="button" className="btn btn--primary btn--large" onClick={handleStillHere}>
          {t.idle.stay}
        </button>
      </div>
    </div>
  );
}
