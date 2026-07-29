import React, { useCallback, useId, useRef } from "react";
import type { ImageKind } from "../data/types";

/*
  Every graphic below is a deliberately stylized illustration — simplified
  silhouettes with a grayscale/duotone treatment and grain, not an attempt
  at a photorealistic radiograph. That's the honest choice for a public
  booth with no licensed patient imagery: convincing at booth-viewing
  distance, unmistakably illustrative up close. See README "Swapping in
  real teaching images" for how to replace these with licensed scans.

  Tissue-density palette (distinct from the app's UI palette on purpose —
  this represents film density, not brand color):
*/
const FILM = {
  base: "#262d33", // soft tissue baseline
  baseDeep: "#1a2025",
  air: "#0b0d0f", // lung fields / air — darkest
  bone: "#e2e0d6", // dense bone — brightest
  boneDim: "#b9b6a9",
  fluid: "#161b1f", // CSF / dark fluid
  vessel: "#4a5761",
};

export interface TapPoint {
  x: number;
  y: number;
}

interface ScanCanvasProps {
  imageKind: ImageKind;
  variant: number;
  altText: string;
  onTap?: (point: TapPoint) => void;
  tapPoint?: TapPoint | null;
  tapCorrect?: boolean | null;
  sweepActive?: boolean;
  reducedMotion?: boolean;
  interactive?: boolean;
  cornerTag: string;
  children?: React.ReactNode;
}

function WristGraphic({ variant }: { variant: number }) {
  const shift = variant === 1 ? 1.5 : 0;
  return (
    <g>
      <rect x={41 + shift} y={4} width={9} height={44} rx={4} fill={FILM.bone} opacity={0.92} />
      <rect x={52 + shift} y={7} width={6.5} height={41} rx={3.2} fill={FILM.boneDim} opacity={0.88} />
      <ellipse cx={50 + shift} cy={54} rx={13} ry={9} fill={FILM.bone} opacity={0.55} />
      <ellipse cx={50 + shift} cy={54} rx={9} ry={6} fill={FILM.boneDim} opacity={0.5} />
      {[22, 34, 50, 66, 78].map((x, i) => (
        <rect
          key={i}
          x={x + shift - 2.5}
          y={60}
          width={5}
          height={30 - Math.abs(i - 2) * 3}
          rx={2.4}
          fill={FILM.bone}
          opacity={0.78}
        />
      ))}
    </g>
  );
}

function ChestGraphic({ variant }: { variant: number }) {
  const seed = variant === 1 ? 2 : 0;
  return (
    <g>
      <ellipse cx={30} cy={46} rx={19} ry={30} fill={FILM.air} opacity={0.9} />
      <ellipse cx={70} cy={46} rx={19} ry={30} fill={FILM.air} opacity={0.9} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={"l" + i}
          d={`M ${14 - i} ${20 + i * 9} Q 50 ${10 + i * 9.5} ${86 + i} ${20 + i * 9}`}
          stroke={FILM.boneDim}
          strokeWidth={1.1}
          fill="none"
          opacity={0.5}
        />
      ))}
      <rect x={48.5} y={12} width={3} height={72} fill={FILM.bone} opacity={0.4} />
      <ellipse cx={42 + seed} cy={60} rx={15} ry={17} fill={FILM.base} opacity={0.95} />
      <ellipse cx={40 + seed} cy={56} rx={9} ry={10} fill={FILM.baseDeep} opacity={0.6} />
    </g>
  );
}

function HeadCTGraphic() {
  return (
    <g>
      <circle cx={50} cy={50} r={39} fill={FILM.bone} opacity={0.85} />
      <circle cx={50} cy={50} r={35} fill={FILM.base} />
      <circle cx={50} cy={50} r={35} fill={FILM.baseDeep} opacity={0.3} />
      <ellipse cx={44} cy={50} rx={4} ry={8} fill={FILM.fluid} opacity={0.85} />
      <ellipse cx={56} cy={50} rx={4} ry={8} fill={FILM.fluid} opacity={0.85} />
      <line x1={50} y1={20} x2={50} y2={80} stroke={FILM.vessel} strokeWidth={0.6} opacity={0.4} />
    </g>
  );
}

function ChestCTGraphic() {
  return (
    <g>
      <circle cx={50} cy={50} r={39} fill={FILM.base} opacity={0.9} />
      <ellipse cx={32} cy={48} rx={16} ry={21} fill={FILM.air} />
      <ellipse cx={68} cy={48} rx={16} ry={21} fill={FILM.air} />
      <circle cx={50} cy={76} r={6} fill={FILM.bone} opacity={0.85} />
      <circle cx={32} cy={44} r={1.4} fill={FILM.vessel} />
      <circle cx={68} cy={44} r={1.4} fill={FILM.vessel} />
      <circle cx={36} cy={54} r={1} fill={FILM.vessel} />
      <circle cx={64} cy={54} r={1} fill={FILM.vessel} />
    </g>
  );
}

function MammoGraphic() {
  return (
    <g>
      <path
        d="M 8 50 C 8 34, 30 12, 90 8 L 92 92 C 30 88, 8 66, 8 50 Z"
        fill={FILM.base}
        opacity={0.92}
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${16 + i * 4} ${50 + (i - 1.5) * 4} Q ${45} ${35 - i * 6} ${80} ${20 + i * 12}`}
          stroke={FILM.boneDim}
          strokeWidth={0.9}
          fill="none"
          opacity={0.4}
        />
      ))}
      <circle cx={9} cy={50} r={2.4} fill={FILM.boneDim} opacity={0.7} />
    </g>
  );
}

function KneeGraphic() {
  return (
    <g>
      <path d="M 28 10 Q 30 40 32 44 Q 50 52 68 44 Q 70 40 72 10 Z" fill={FILM.bone} opacity={0.85} />
      <ellipse cx={40} cy={26} rx={7} ry={9} fill={FILM.boneDim} opacity={0.7} />
      <rect x={30} y={48} width={40} height={30} rx={6} fill={FILM.bone} opacity={0.82} />
      <rect x={70} y={48} width={7} height={42} rx={3} fill={FILM.boneDim} opacity={0.75} />
      <rect x={38} y={78} width={26} height={16} rx={4} fill={FILM.bone} opacity={0.7} />
    </g>
  );
}

function AnatomyGraphic({ kind, variant }: { kind: ImageKind; variant: number }) {
  switch (kind) {
    case "wrist":
      return <WristGraphic variant={variant} />;
    case "chest":
      return <ChestGraphic variant={variant} />;
    case "head-ct":
      return <HeadCTGraphic />;
    case "chest-ct":
      return <ChestCTGraphic />;
    case "mammo":
      return <MammoGraphic />;
    case "knee":
      return <KneeGraphic />;
    default:
      return null;
  }
}

export default function ScanCanvas({
  imageKind,
  variant,
  altText,
  onTap,
  tapPoint,
  tapCorrect,
  sweepActive,
  reducedMotion,
  interactive,
  cornerTag,
  children,
}: ScanCanvasProps) {
  const uid = useId().replace(/[:]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointer = useCallback(
    (e: React.MouseEvent<SVGRectElement> | React.PointerEvent<SVGRectElement>) => {
      if (!interactive || !onTap || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const clientX = "clientX" in e ? e.clientX : 0;
      const clientY = "clientY" in e ? e.clientY : 0;
      const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
      onTap({ x, y });
    },
    [interactive, onTap]
  );

  const noiseSeed = 2 + variant * 3;

  return (
    <div className="scan-canvas">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        role="img"
        aria-label={altText}
        className="scan-canvas__svg"
      >
        <defs>
          <radialGradient id={`vig-${uid}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#1c2227" />
            <stop offset="75%" stopColor="#0e1215" />
            <stop offset="100%" stopColor="#05070a" />
          </radialGradient>
          <filter id={`grain-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={noiseSeed} result="n" />
            <feColorMatrix in="n" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={0.05} />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect x={0} y={0} width={100} height={100} fill={`url(#vig-${uid})`} />
        <AnatomyGraphic kind={imageKind} variant={variant} />
        <rect x={0} y={0} width={100} height={100} filter={`url(#grain-${uid})`} />

        {/* Corner annotations — reading-room instrument text, and an
            always-visible reminder these are illustrative. */}
        <text x={3} y={6} className="scan-canvas__corner mono">
          {cornerTag}
        </text>
        <text x={97} y={6} textAnchor="end" className="scan-canvas__corner mono">
          ILLUSTRATIVE
        </text>
        <text x={3} y={97} className="scan-canvas__corner mono">
          TEACHING CASE
        </text>

        {sweepActive && !reducedMotion && (
          <rect x={-20} y={0} width={20} height={100} className="scan-canvas__sweep" />
        )}

        {children}

        {tapPoint && (
          <g className={`scan-canvas__tap ${tapCorrect === false ? "is-off" : ""}`}>
            <circle cx={tapPoint.x} cy={tapPoint.y} r={3.2} className="scan-canvas__tap-ring" />
            <circle cx={tapPoint.x} cy={tapPoint.y} r={0.8} className="scan-canvas__tap-dot" />
          </g>
        )}

        {interactive && (
          <rect
            x={0}
            y={0}
            width={100}
            height={100}
            fill="transparent"
            onClick={handlePointer}
            className="scan-canvas__hit"
          />
        )}
      </svg>
    </div>
  );
}
