import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n";
import { QR_URL } from "../config";

export default function Closing() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        if (cancelled || !canvasRef.current) return;
        await QRCode.toCanvas(canvasRef.current, QR_URL, {
          width: 168,
          margin: 1,
          color: { dark: "#07090b", light: "#e8e6df" },
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section closing" id="closing">
      <div className="shell closing__grid">
        <div>
          <p className="section-label">{t.closing.label}</p>
          <p className="closing__line">{t.closing.line1}</p>
          <p className="closing__line">{t.closing.line2}</p>
          <p className="closing__line closing__line--last">{t.closing.line3}</p>
        </div>

        <div className="closing__qr">
          {!failed ? (
            <canvas ref={canvasRef} width={168} height={168} aria-label={t.closing.qrCaption} />
          ) : (
            <div className="closing__qr-fallback mono" role="img" aria-label={t.closing.qrCaption}>
              {QR_URL}
            </div>
          )}
          <span className="closing__qr-caption mono">{t.closing.qrCaption}</span>
        </div>
      </div>

      <div className="shell">
        <p className="disclaimer">{t.meta.disclaimer}</p>
      </div>
    </section>
  );
}
