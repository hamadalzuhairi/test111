
export interface OverlayRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  confidence?: number;
}

export type OverlayTone = "ai" | "ai-wrong" | "radiologist";

interface AIOverlayProps {
  regions: OverlayRegion[];
  tone: OverlayTone;
  reducedMotion?: boolean;
  confidenceSuffix?: string;
}

/*
  Tone carries both a color AND a shape/marker so the AI-correct /
  AI-wrong / radiologist states never rely on color alone:
    ai         -> solid teal box, small dot marker (confident, correct)
    ai-wrong   -> dashed red box, small triangle marker (false positive or miss)
    radiologist-> long-dash amber box, small diamond marker
*/
export default function AIOverlay({ regions, tone, reducedMotion, confidenceSuffix }: AIOverlayProps) {
  const dash = tone === "ai-wrong" ? "1.6 1.2" : tone === "radiologist" ? "3 1.4" : "none";

  return (
    <g className={`ai-overlay ai-overlay--${tone} ${reducedMotion ? "no-anim" : ""}`}>
      {regions.map((r, i) => {
        const labelAbove = r.y > 14;
        const labelY = labelAbove ? r.y - 2.4 : r.y + r.height + 5.2;
        const cx = r.x;
        return (
          <g key={i} className="ai-overlay__region" style={{ animationDelay: `${i * 90}ms` }}>
            <rect
              x={r.x}
              y={r.y}
              width={r.width}
              height={r.height}
              rx={1.4}
              className="ai-overlay__box"
              strokeDasharray={dash}
            />
            <Marker tone={tone} cx={r.x + r.width} cy={r.y} />
            {(r.label || typeof r.confidence === "number") && (
              <g className="ai-overlay__label-group" transform={`translate(${cx}, ${labelY})`}>
                <text className="ai-overlay__label mono">
                  {r.label}
                  {typeof r.confidence === "number" ? ` · ${r.confidence}%${confidenceSuffix ?? ""}` : ""}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function Marker({ tone, cx, cy }: { tone: OverlayTone; cx: number; cy: number }) {
  if (tone === "ai-wrong") {
    return (
      <path
        d={`M ${cx} ${cy - 2} L ${cx + 1.8} ${cy + 1.4} L ${cx - 1.8} ${cy + 1.4} Z`}
        className="ai-overlay__marker"
      />
    );
  }
  if (tone === "radiologist") {
    return (
      <rect x={cx - 1.4} y={cy - 1.4} width={2.8} height={2.8} transform={`rotate(45 ${cx} ${cy})`} className="ai-overlay__marker" />
    );
  }
  return <circle cx={cx} cy={cy} r={1.5} className="ai-overlay__marker" />;
}
