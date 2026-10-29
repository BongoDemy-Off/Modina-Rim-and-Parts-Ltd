import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  animate as motionAnimate,
  useMotionValue,
  useTransform,
} from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

/** SVG Rim — styled to match the site's light premium aesthetic */
function RimSVG() {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      {/* Outer tyre ring */}
      <circle cx="130" cy="130" r="124" stroke="#E5E7EB" strokeWidth="10" />
      {/* Outer rim ring */}
      <circle cx="130" cy="130" r="112" stroke="#D1D5DB" strokeWidth="3" />
      {/* Red accent ring */}
      <circle cx="130" cy="130" r="108" stroke="#E52525" strokeWidth="1" strokeDasharray="6 6" />
      {/* Spoke barrel ring */}
      <circle cx="130" cy="130" r="72" stroke="#F3F4F6" strokeWidth="2.5" />
      {/* Centre hub */}
      <circle cx="130" cy="130" r="18" stroke="#94A3B8" strokeWidth="3" />
      <circle cx="130" cy="130" r="10" fill="#E52525" />
      <circle cx="130" cy="130" r="5" fill="#6B7280" />

      {/* 6 Spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const innerR = 20;
        const outerR = 70;
        const x1 = 130 + innerR * Math.cos(angle);
        const y1 = 130 + innerR * Math.sin(angle);
        const x2 = 130 + outerR * Math.cos(angle);
        const y2 = 130 + outerR * Math.sin(angle);
        // Side edges of spoke (width ~8px)
        const perpAngle = angle + Math.PI / 2;
        const halfW = 3.5;
        const lx1 = x1 + halfW * Math.cos(perpAngle);
        const ly1 = y1 + halfW * Math.sin(perpAngle);
        const lx2 = x2 + halfW * Math.cos(perpAngle);
        const ly2 = y2 + halfW * Math.sin(perpAngle);
        const rx1 = x1 - halfW * Math.cos(perpAngle);
        const ry1 = y1 - halfW * Math.sin(perpAngle);
        const rx2 = x2 - halfW * Math.cos(perpAngle);
        const ry2 = y2 - halfW * Math.sin(perpAngle);
        return (
          <polygon
            key={i}
            points={`${lx1},${ly1} ${lx2},${ly2} ${rx2},${ry2} ${rx1},${ry1}`}
            fill={i === 0 ? '#E52525' : '#E5E7EB'}
            stroke="#D1D5DB"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Bolt holes — 6 evenly spaced around hub */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180 + Math.PI / 6;
        const r = 34;
        const cx = 130 + r * Math.cos(angle);
        const cy = 130 + r * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={5} fill="#6B7280" stroke="#94A3B8" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={2} fill="#E5E7EB" />
          </g>
        );
      })}
    </svg>
  );
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const progressValue = useMotionValue(0);
  const leftPanelX = useMotionValue('0%');
  const rightPanelX = useMotionValue('0%');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const displayCount = useTransform(progressValue, (v) =>
    String(Math.round(v)).padStart(3, '0')
  );
  const barWidth = useTransform(progressValue, (v) => `${v}%`);

  useLayoutEffect(() => {
    const controls: { stop: () => void }[] = [];
    // A decorative deadline is independent of animation-frame/network readiness.
    // Keep all phases; do not await frame-driven promises that can stall in a
    // background or busy browser and prolong the covered-content interval.
    controls.push(motionAnimate(progressValue, 100, { duration: .65, ease: [0.16, 1, 0.3, 1] }));
    const split = window.setTimeout(() => {
      const left = motionAnimate(leftPanelX, '-100%', { duration: .35, ease: [0.76, 0, 0.24, 1] });
      const right = motionAnimate(rightPanelX, '100%', { duration: .35, ease: [0.76, 0, 0.24, 1] });
      controls.push(left, right);
    }, 650);
    const complete = window.setTimeout(() => {
      setVisible(false);
      onCompleteRef.current();
    }, 1000);
    return () => { clearTimeout(split); clearTimeout(complete); controls.forEach(control => control.stop()); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div
      data-public-intro role="group" aria-label={t('public_ui.intro_label')}
      className="public-site public-intro fixed inset-0 overflow-hidden flex"
      onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); onCompleteRef.current(); } }}
      style={{ zIndex: 99999, backgroundColor: '#FFFFFF' }}
    >
      <button type="button" className="public-intro-skip" onClick={() => onCompleteRef.current()}>{t('public_ui.skip_intro')}</button>
      <span className="sr-only" role="status">{t('public_ui.intro_label')}</span>
      {/* ══════════════════════════════════
          LEFT PANEL — Spinning Rim
      ══════════════════════════════════ */}
      <motion.div
        className="public-intro-rim relative flex items-center justify-center overflow-hidden"
        style={{
          width: '50%',
          backgroundColor: '#F8F9FB',
          x: leftPanelX,
        }}
      >
        {/* Subtle radial glow behind the rim */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,37,37,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Spinning rim */}
        <motion.div
          style={{ width: 'clamp(200px, 26vw, 300px)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <RimSVG />
        </motion.div>

        {/* Bottom-left label */}
        <div className="absolute bottom-8 left-8">
          <p className="font-mono text-[8px] tracking-[0.3em] text-[#94A3B8] uppercase">
            Industrial Grade
          </p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════
          VERTICAL DIVIDER LINE
      ══════════════════════════════════ */}
      <motion.div
        className="public-intro-divider absolute top-0 bottom-0 w-[1px]"
        style={{
          left: '50%',
          backgroundColor: '#ECECEC',
          zIndex: 10,
        }}
        initial={{ scaleY: 0, originY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.25, delay: 0, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ══════════════════════════════════
          RIGHT PANEL — Brand + Progress
      ══════════════════════════════════ */}
      <motion.div
        className="public-intro-brand relative flex flex-col justify-center overflow-hidden"
        style={{
          width: '50%',
          backgroundColor: '#FFFFFF',
          x: rightPanelX,
          paddingLeft: 'clamp(32px, 6vw, 80px)',
          paddingRight: 'clamp(32px, 6vw, 80px)',
        }}
      >
        {/* ── Brand Name ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] text-modina-red uppercase mb-4">
            {t('public_ui.intro_sequence')}
          </p>
          <p
            className="font-condensed uppercase leading-none"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#0F172A',
            }}
          >
            MODINA
          </p>
          <p
            className="font-condensed uppercase"
            style={{
              fontSize: 'clamp(14px, 2vw, 22px)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              marginTop: 4,
              color: '#6B7280',
            }}
          >
            RIM &amp; PARTS LTD.
          </p>
        </motion.div>

        {/* Red accent line under brand name */}
        <motion.div
          className="h-[1px] bg-modina-red mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 'clamp(60px, 8vw, 100px)' }}
        />

        {/* ── Large Counter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="mb-10"
        >
          <motion.span
            className="font-condensed tabular-nums select-none"
            style={{
              fontSize: 'clamp(64px, 11vw, 140px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#0F172A',
            }}
          >
            {displayCount}
          </motion.span>
          <span
            className="font-mono ml-2 align-bottom"
            style={{ fontSize: 'clamp(10px, 1.5vw, 16px)', letterSpacing: '0.2em', color: '#94A3B8' }}
          >
            / 100
          </span>
        </motion.div>

        {/* ── Progress Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#94A3B8]">
              Precision Components
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#94A3B8]">
              Jashore, Bangladesh
            </p>
          </div>
          {/* Track */}
          <div className="w-full h-[1px] bg-[#ECECEC] relative">
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ width: barWidth, backgroundColor: '#E52525' }}
            />
            {/* Glowing leading edge */}
            <motion.div
              className="absolute top-0 h-full w-3"
              style={{
                left: barWidth,
                background: 'linear-gradient(to right, #E52525, transparent)',
                opacity: 0.6,
                transform: 'translateX(-100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Bottom-right corner detail */}
        <div className="absolute bottom-8 right-8">
          <p className="font-mono text-[8px] tracking-[0.25em] text-[#94A3B8] uppercase">
            Est. 2010
          </p>
        </div>
      </motion.div>
    </div>
  );
}
