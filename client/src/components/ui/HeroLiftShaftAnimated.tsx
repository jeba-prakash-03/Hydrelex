import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const HeroLiftShaftAnimated: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  // Cabin floor positions (Y offset within the 800px shaft viewBox)
  // Floor G: 560, Floor 1: 440, Floor 2: 320, Floor 3: 200, Floor 4: 90
  const [currentFloor, setCurrentFloor] = useState<string>('G');

  useEffect(() => {
    // Sequence cycle for digital floor indicator
    const floorSequence = ['G', '1', '2', '3', '4', '3', '2', '1', 'G'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % floorSequence.length;
      setCurrentFloor(floorSequence[idx]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* 1. Soft Copper Ember Glow behind the lift shaft */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 45%, rgba(232, 120, 46, 0.22) 0%, rgba(232, 120, 46, 0.05) 50%, transparent 80%)',
        }}
      />

      {/* 2. Digital Floor Indicator HUD at Top-Right */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30 bg-ink-950/90 border border-copper-500/80 p-3 sm:p-4 rounded-sm shadow-[0_0_20px_rgba(232,120,46,0.3)] flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-copper-500 animate-pulse shadow-[0_0_8px_#E8782E]" />
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel-300">
            FLOOR LEVEL
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-copper-500 leading-none mt-0.5">
            0{currentFloor}
          </div>
        </div>
        <div className="border-l border-graphite-700 pl-3 font-mono text-[10px] text-steel-300/80">
          <div>VELOCITY: <span className="text-copper-400">1.75 m/s</span></div>
          <div>STATUS: <span className="text-emerald-400">ACTIVE</span></div>
        </div>
      </div>

      {/* 3. The Structural Lift Shaft SVG */}
      <svg
        viewBox="0 0 540 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[820px] object-contain"
      >
        <defs>
          {/* Copper Glow Filter */}
          <filter id="copperGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Cabin Door Light Beam Gradient */}
          <linearGradient id="doorLightBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8782E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF934A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E8782E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Structural Shaft Tower Columns */}
        <line x1="80" y1="30" x2="80" y2="760" stroke="#C9CDD2" strokeWidth="2" strokeDasharray="10 5" />
        <line x1="440" y1="30" x2="440" y2="760" stroke="#C9CDD2" strokeWidth="2" strokeDasharray="10 5" />

        {/* Guide Rails (Machined Steel T-Profile) */}
        <line x1="130" y1="30" x2="130" y2="760" stroke="#E9EBEE" strokeWidth="2.5" />
        <line x1="390" y1="30" x2="390" y2="760" stroke="#E9EBEE" strokeWidth="2.5" />
        {/* Counterweight Rail */}
        <line x1="415" y1="30" x2="415" y2="760" stroke="#E8782E" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Floor Slabs with Floor Labels (G, 1, 2, 3, 4) */}
        {[
          { y: 120, label: '04' },
          { y: 250, label: '03' },
          { y: 380, label: '02' },
          { y: 510, label: '01' },
          { y: 640, label: '0G' },
        ].map((f) => (
          <g key={f.label}>
            {/* Horizontal Floor Beam */}
            <line x1="50" y1={f.y} x2="470" y2={f.y} stroke="#26262A" strokeWidth="2" />
            {/* Level Tick & Scale Indicator */}
            <line x1="60" y1={f.y - 4} x2="60" y2={f.y + 4} stroke="#E8782E" strokeWidth="2" />
            <circle cx="60" cy={f.y} r="2" fill="#E8782E" />
            <text
              x="25"
              y={f.y + 4}
              fill="#E8782E"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {f.label}
            </text>
            <text
              x="455"
              y={f.y + 4}
              fill="#C9CDD2"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.6"
            >
              +{f.y}m
            </text>
          </g>
        ))}

        {/* Overhead Gearless Traction Machine Sheave at Top */}
        <g>
          <circle cx="260" cy="55" r="38" stroke="#E8782E" strokeWidth="2.5" />
          <circle cx="260" cy="55" r="14" stroke="#C9CDD2" strokeWidth="2" fill="#141416" />
          <circle cx="415" cy="65" r="18" stroke="#E8782E" strokeWidth="2" />
          {/* Suspension Wire Ropes */}
          <line x1="222" y1="55" x2="222" y2="700" stroke="#C9CDD2" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="298" y1="55" x2="298" y2="700" stroke="#C9CDD2" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="415" y1="65" x2="415" y2="700" stroke="#E8782E" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>

        {/* Inversely Moving Counterweight Frame */}
        <motion.g
          animate={{
            y: [120, 240, 360, 480, 580, 480, 360, 240, 120],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
          }}
        >
          <rect x="403" y="0" width="24" height="110" stroke="#E8782E" strokeWidth="2" fill="#141416" />
          <line x1="403" y1="25" x2="427" y2="25" stroke="#C9CDD2" strokeWidth="1" />
          <line x1="403" y1="50" x2="427" y2="50" stroke="#C9CDD2" strokeWidth="1" />
          <line x1="403" y1="75" x2="427" y2="75" stroke="#C9CDD2" strokeWidth="1" />
        </motion.g>

        {/* SMOOTHLY TRAVELING ELEVATOR CABIN */}
        <motion.g
          animate={{
            // Smooth travel between Floor G (y=540) to Floor 4 (y=80) and back
            y: [540, 420, 300, 180, 80, 180, 300, 420, 540],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
          }}
        >
          {/* Soft Amber Glow behind the cabin */}
          <rect
            x="130"
            y="-10"
            width="260"
            height="160"
            fill="url(#doorLightBeam)"
            opacity="0.25"
            filter="url(#copperGlow)"
          />

          {/* Cabin Sling / Structural Crosshead Beam */}
          <rect x="150" y="0" width="220" height="140" stroke="#E8782E" strokeWidth="2.5" fill="#141416" />
          {/* Inner Architectural Wall Panels */}
          <rect x="165" y="15" width="190" height="110" stroke="#C9CDD2" strokeWidth="1.5" />
          <line x1="225" y1="15" x2="225" y2="125" stroke="#26262A" strokeWidth="1" />
          <line x1="295" y1="15" x2="295" y2="125" stroke="#26262A" strokeWidth="1" />

          {/* Glowing Center Glass Doors with Light Beams */}
          <rect
            x="240"
            y="20"
            width="40"
            height="105"
            stroke="#FF934A"
            strokeWidth="2"
            fill="rgba(232, 120, 46, 0.25)"
          />
          <line x1="260" y1="20" x2="260" y2="125" stroke="#FF934A" strokeWidth="1.5" />

          {/* Stainless Steel Handrail */}
          <line x1="175" y1="80" x2="345" y2="80" stroke="#E9EBEE" strokeWidth="2" />
          <circle cx="185" cy="80" r="3" fill="#E8782E" />
          <circle cx="335" cy="80" r="3" fill="#E8782E" />

          {/* Ceiling Spot Luminaires */}
          <circle cx="195" cy="20" r="3" fill="#FF934A" />
          <circle cx="260" cy="20" r="4" fill="#FF934A" filter="url(#copperGlow)" />
          <circle cx="325" cy="20" r="3" fill="#FF934A" />

          {/* Progressive Safety Gear Clamps at Bottom of Sling */}
          <polygon points="145,138 155,138 150,146" fill="#E8782E" stroke="#E8782E" />
          <polygon points="365,138 375,138 370,146" fill="#E8782E" stroke="#E8782E" />
        </motion.g>

        {/* Pit Buffer Springs at Bottom Foundation */}
        <g stroke="#E8782E" strokeWidth="2">
          <path d="M190 760 L200 745 L190 730 L200 715 L190 700" />
          <path d="M310 760 L320 745 L310 730 L320 715 L310 700" />
          <path d="M415 760 L425 745 L415 730 L425 715 L415 700" stroke="#C9CDD2" />
          <line x1="60" y1="760" x2="460" y2="760" stroke="#C9CDD2" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};
