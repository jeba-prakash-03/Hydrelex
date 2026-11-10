import React from 'react';
import { motion } from 'framer-motion';

export const BlueprintShaftView: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] bg-graphite-900 rounded-sm overflow-hidden border border-graphite-700 shadow-2xl flex items-center justify-center p-4 sm:p-8">
      {/* Blueprint grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#26262A" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>

      {/* Ambient Copper Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(232,120,46,0.3) 0%, transparent 60%)',
        }}
      />

      {/* Technical Header Callout */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-copper-500 animate-pulse" />
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-steel-300">
          FIG 1.0 // HOISTWAY STRUCTURAL CROSS-SECTION
        </span>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 font-mono text-[10px] text-copper-500 border border-copper-500/40 px-2 py-0.5 rounded-xs bg-ink-950/70">
        CAD REF: HYD-S700
      </div>

      {/* Main Vector Cross-Section SVG */}
      <svg
        viewBox="0 0 500 620"
        className="w-full h-full max-h-[560px] relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dimension Line Left (Shaft Height) */}
        <line x1="45" y1="50" x2="45" y2="570" stroke="#E8782E" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 41 55 L 45 45 L 49 55" stroke="#E8782E" strokeWidth="1.2" fill="none" />
        <path d="M 41 565 L 45 575 L 49 565" stroke="#E8782E" strokeWidth="1.2" fill="none" />
        <text
          x="-310"
          y="35"
          transform="rotate(-90)"
          fill="#C9CDD2"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          OVERALL TRAVEL HOISTWAY HEIGHT // 12,000 mm
        </text>

        {/* Outer Hoistway Concrete Walls */}
        <rect x="75" y="45" width="350" height="530" stroke="#26262A" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="70" y1="45" x2="80" y2="45" stroke="#C9CDD2" strokeWidth="2" />
        <line x1="70" y1="575" x2="80" y2="575" stroke="#C9CDD2" strokeWidth="2" />
        <line x1="420" y1="45" x2="430" y2="45" stroke="#C9CDD2" strokeWidth="2" />
        <line x1="420" y1="575" x2="430" y2="575" stroke="#C9CDD2" strokeWidth="2" />

        {/* Floor Level Lines */}
        {/* Floor 3 */}
        <line x1="75" y1="120" x2="425" y2="120" stroke="#26262A" strokeWidth="1" strokeDasharray="2 3" />
        <text x="360" y="114" fill="#C9CDD2" fontSize="9" fontFamily="monospace">
          LVL 03 [+9.00m]
        </text>

        {/* Floor 2 */}
        <line x1="75" y1="240" x2="425" y2="240" stroke="#26262A" strokeWidth="1" strokeDasharray="2 3" />
        <text x="360" y="234" fill="#C9CDD2" fontSize="9" fontFamily="monospace">
          LVL 02 [+6.00m]
        </text>

        {/* Floor 1 */}
        <line x1="75" y1="360" x2="425" y2="360" stroke="#26262A" strokeWidth="1" strokeDasharray="2 3" />
        <text x="360" y="354" fill="#C9CDD2" fontSize="9" fontFamily="monospace">
          LVL 01 [+3.00m]
        </text>

        {/* Floor G */}
        <line x1="75" y1="480" x2="425" y2="480" stroke="#E8782E" strokeWidth="1.5" />
        <text x="360" y="474" fill="#E8782E" fontSize="9" fontFamily="monospace" fontWeight="bold">
          DATUM G [±0.00m]
        </text>

        {/* Guide Rails (Heavy Steel Vertical Lines) */}
        <line x1="165" y1="55" x2="165" y2="560" stroke="#C9CDD2" strokeWidth="2" />
        <line x1="335" y1="55" x2="335" y2="560" stroke="#C9CDD2" strokeWidth="2" />

        {/* Top Machine Room / Sheave Beam */}
        <rect x="180" y="55" width="140" height="20" fill="#141416" stroke="#C9CDD2" strokeWidth="1.5" />
        <circle cx="230" cy="65" r="14" stroke="#E8782E" strokeWidth="2" fill="#0A0A0B" />
        <circle cx="270" cy="65" r="10" stroke="#C9CDD2" strokeWidth="1.5" fill="#0A0A0B" />

        {/* Suspension Cables */}
        <line x1="225" y1="79" x2="225" y2="250" stroke="#C9CDD2" strokeWidth="1.2" />
        <line x1="235" y1="79" x2="235" y2="250" stroke="#C9CDD2" strokeWidth="1.2" />
        <line x1="270" y1="75" x2="270" y2="380" stroke="#C9CDD2" strokeWidth="1.2" />

        {/* Counterweight Structure on Right Guide Rail */}
        <rect x="345" y="380" width="30" height="90" fill="#141416" stroke="#E8782E" strokeWidth="1.5" />
        <line x1="345" y1="400" x2="375" y2="400" stroke="#E8782E" strokeWidth="1" />
        <line x1="345" y1="420" x2="375" y2="420" stroke="#E8782E" strokeWidth="1" />
        <line x1="345" y1="440" x2="375" y2="440" stroke="#E8782E" strokeWidth="1" />
        <text x="382" y="430" fill="#C9CDD2" fontSize="8" fontFamily="monospace">
          CW 1:1
        </text>

        {/* Animated Traveling Cabin between floors */}
        <motion.g
          animate={{
            y: [0, -110, -110, -220, -220, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.45, 0.7, 0.85, 1],
          }}
        >
          {/* Cabin Sling (Outer structural frame) */}
          <rect
            x="175"
            y="250"
            width="150"
            height="130"
            fill="#0A0A0B"
            stroke="#C9CDD2"
            strokeWidth="2"
            rx="2"
          />

          {/* Cabin Interior Wall */}
          <rect
            x="185"
            y="258"
            width="130"
            height="114"
            fill="#141416"
            stroke="#26262A"
            strokeWidth="1"
          />

          {/* Center Bi-parting Doors with Copper Glow */}
          <line x1="250" y1="258" x2="250" y2="372" stroke="#E8782E" strokeWidth="2" />
          <rect x="246" y="295" width="8" height="30" fill="#E8782E" opacity="0.8" rx="1" />

          {/* Safety Guide Shoes */}
          <rect x="163" y="260" width="12" height="18" fill="#E8782E" />
          <rect x="163" y="352" width="12" height="18" fill="#E8782E" />
          <rect x="325" y="260" width="12" height="18" fill="#E8782E" />
          <rect x="325" y="352" width="12" height="18" fill="#E8782E" />

          {/* Cabin Ceiling Light */}
          <line x1="205" y1="262" x2="295" y2="262" stroke="#FF934A" strokeWidth="2.5" />

          {/* Cabin Measurement Callout */}
          <text x="210" y="325" fill="#E9EBEE" fontSize="9" fontFamily="monospace" fontWeight="bold">
            CABIN ENCLOSURE
          </text>
          <text x="216" y="338" fill="#E8782E" fontSize="8" fontFamily="monospace">
            SAFETY GEAR LOCK
          </text>
        </motion.g>

        {/* Pit Buffer Springs at Bottom */}
        <g stroke="#E8782E" strokeWidth="2" fill="none">
          <path d="M 215 570 L 220 550 L 210 540 L 220 530 L 215 520" />
          <line x1="205" y1="520" x2="225" y2="520" stroke="#C9CDD2" strokeWidth="2" />
          <line x1="205" y1="570" x2="225" y2="570" stroke="#C9CDD2" strokeWidth="3" />

          <path d="M 285 570 L 290 550 L 280 540 L 290 530 L 285 520" />
          <line x1="275" y1="520" x2="295" y2="520" stroke="#C9CDD2" strokeWidth="2" />
          <line x1="275" y1="570" x2="295" y2="570" stroke="#C9CDD2" strokeWidth="3" />
        </g>
        <text x="210" y="595" fill="#C9CDD2" fontSize="9" fontFamily="monospace">
          OIL BUFFER PIT // 1,600 mm
        </text>

        {/* Technical Callout Arrows */}
        <path d="M 163 268 L 120 268 L 105 285" stroke="#E8782E" strokeWidth="1" fill="none" />
        <text x="90" y="300" fill="#FF934A" fontSize="8" fontFamily="monospace">
          GUIDE ROLLER
        </text>
      </svg>

      {/* Bottom Architectural Operations Stamp */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-graphite-700/80 bg-ink-950/80 px-4 py-2 rounded-xs">
        <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.12em] text-steel-300">
          ENGINEERING FACILITY: SRIPERUMBUDUR HUB
        </div>
        <div className="text-[10px] font-mono text-copper-400">
          MEVALLURKUPPAM // TN-602015
        </div>
      </div>
    </div>
  );
};
