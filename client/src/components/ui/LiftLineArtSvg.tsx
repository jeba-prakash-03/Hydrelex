import React from 'react';

export type LiftType =
  | 'shaft-cross-section'
  | 'passenger'
  | 'freight'
  | 'hydraulic'
  | 'scissor'
  | 'panoramic'
  | 'inverter';

interface LiftLineArtSvgProps {
  type: LiftType;
  className?: string;
  strokeColor?: string;
}

export const LiftLineArtSvg: React.FC<LiftLineArtSvgProps> = ({
  type,
  className = 'w-full h-full',
  strokeColor = '#B08D57',
}) => {
  const silverColor = '#B8BBBE';
  const faintColor = 'rgba(184, 187, 190, 0.25)';

  switch (type) {
    case 'shaft-cross-section':
      return (
        <svg
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Shaft Walls */}
          <line x1="50" y1="20" x2="50" y2="580" stroke={silverColor} strokeDasharray="6 4" />
          <line x1="350" y1="20" x2="350" y2="580" stroke={silverColor} strokeDasharray="6 4" />

          {/* Pit Base & Overhead Slabs */}
          <line x1="30" y1="580" x2="370" y2="580" stroke={silverColor} strokeWidth="1.5" />
          <line x1="30" y1="20" x2="370" y2="20" stroke={silverColor} strokeWidth="1.5" />

          {/* Machine Room Sheave & Deflector */}
          <circle cx="200" cy="70" r="32" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="200" cy="70" r="10" stroke={strokeColor} />
          <circle cx="300" cy="85" r="18" stroke={strokeColor} />

          {/* Guide Rails */}
          <line x1="90" y1="30" x2="90" y2="560" stroke={silverColor} strokeWidth="1.2" />
          <line x1="290" y1="30" x2="290" y2="560" stroke={silverColor} strokeWidth="1.2" />

          {/* Suspension Ropes */}
          <line x1="168" y1="70" x2="168" y2="210" stroke={strokeColor} strokeDasharray="2 2" />
          <line x1="232" y1="70" x2="232" y2="210" stroke={strokeColor} strokeDasharray="2 2" />
          <line x1="300" y1="85" x2="300" y2="340" stroke={silverColor} strokeDasharray="2 2" />

          {/* Elevator Cabin (Car Sling & Frame) */}
          <rect x="110" y="210" width="160" height="200" stroke={strokeColor} strokeWidth="1.5" fill="rgba(28, 28, 30, 0.4)" />
          {/* Inner cabin door & ceiling */}
          <rect x="125" y="235" width="130" height="165" stroke={silverColor} />
          <line x1="190" y1="235" x2="190" y2="400" stroke={silverColor} strokeDasharray="4 3" />
          {/* Handrail */}
          <line x1="135" y1="340" x2="245" y2="340" stroke={strokeColor} strokeWidth="1.2" />
          {/* Ceiling Spot Luminaires */}
          <circle cx="160" cy="245" r="3" stroke={strokeColor} fill={strokeColor} />
          <circle cx="220" cy="245" r="3" stroke={strokeColor} fill={strokeColor} />

          {/* Counterweight Frame */}
          <rect x="285" y="340" width="30" height="120" stroke={silverColor} strokeWidth="1.2" fill="rgba(58, 58, 61, 0.5)" />
          <line x1="285" y1="365" x2="315" y2="365" stroke={silverColor} />
          <line x1="285" y1="390" x2="315" y2="390" stroke={silverColor} />
          <line x1="285" y1="415" x2="315" y2="415" stroke={silverColor} />
          <line x1="285" y1="440" x2="315" y2="440" stroke={silverColor} />

          {/* Pit Buffer Springs */}
          <path d="M150 580 L160 565 L150 550 L160 535 L150 520 L160 505" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M220 580 L230 565 L220 550 L230 535 L220 520 L230 505" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M295 580 L305 565 L295 550 L305 535 L295 520 L305 505" stroke={silverColor} strokeWidth="1.2" />

          {/* Floor Level Coordinate Markers */}
          <line x1="30" y1="160" x2="70" y2="160" stroke={strokeColor} />
          <text x="15" y="164" fill={strokeColor} fontSize="8" fontFamily="monospace">L3</text>
          <line x1="30" y1="320" x2="70" y2="320" stroke={strokeColor} />
          <text x="15" y="324" fill={strokeColor} fontSize="8" fontFamily="monospace">L2</text>
          <line x1="30" y1="480" x2="70" y2="480" stroke={strokeColor} />
          <text x="15" y="484" fill={strokeColor} fontSize="8" fontFamily="monospace">L1</text>

          {/* Vertical Plumb Line Indicator */}
          <line x1="200" y1="110" x2="200" y2="570" stroke={faintColor} strokeDasharray="3 6" />
        </svg>
      );

    case 'passenger':
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Passenger Cabin Isometric / Perspective Frontal Frame */}
          <rect x="60" y="50" width="280" height="300" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="90" y="75" width="220" height="260" stroke={silverColor} strokeWidth="1" />
          {/* Center opening doors */}
          <line x1="200" y1="75" x2="200" y2="335" stroke={silverColor} strokeDasharray="3 3" />
          {/* Architectural Wall Paneling */}
          <line x1="145" y1="75" x2="145" y2="335" stroke={faintColor} />
          <line x1="255" y1="75" x2="255" y2="335" stroke={faintColor} />
          {/* Continuous Handrail */}
          <line x1="100" y1="230" x2="300" y2="230" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="115" cy="230" r="3" fill={strokeColor} />
          <circle cx="285" cy="230" r="3" fill={strokeColor} />
          {/* Operating Panel (COP) */}
          <rect x="280" y="140" width="18" height="120" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="289" cy="155" r="2" fill={strokeColor} />
          <circle cx="289" cy="170" r="2" fill={strokeColor} />
          <circle cx="289" cy="185" r="2" fill={strokeColor} />
          <circle cx="289" cy="200" r="2" fill={strokeColor} />
          {/* Architectural Ceiling Lighting Array */}
          <line x1="110" y1="95" x2="290" y2="95" stroke={strokeColor} strokeDasharray="16 8" strokeWidth="1.5" />
          <line x1="110" y1="110" x2="290" y2="110" stroke={strokeColor} strokeDasharray="16 8" strokeWidth="1.5" />
          {/* Subtle Technical Indicators */}
          <text x="70" y="42" fill={silverColor} fontSize="9" fontFamily="monospace">PASSENGER CABIN PROFILE</text>
        </svg>
      );

    case 'freight':
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Heavy Goods / Freight Structural Chassis */}
          <rect x="50" y="60" width="300" height="280" stroke={strokeColor} strokeWidth="2" />
          {/* Structural Heavy Uprights */}
          <line x1="90" y1="60" x2="90" y2="340" stroke={silverColor} strokeWidth="1.5" />
          <line x1="310" y1="60" x2="310" y2="340" stroke={silverColor} strokeWidth="1.5" />
          {/* Heavy Diagonal Bracing */}
          <line x1="90" y1="60" x2="310" y2="200" stroke={faintColor} />
          <line x1="90" y1="200" x2="310" y2="60" stroke={faintColor} />
          <line x1="90" y1="200" x2="310" y2="340" stroke={faintColor} />
          <line x1="90" y1="340" x2="310" y2="200" stroke={faintColor} />
          {/* Heavy Base Platform with Reinforced Forklift Sill */}
          <rect x="40" y="335" width="320" height="20" stroke={strokeColor} strokeWidth="1.5" fill="rgba(28, 28, 30, 0.6)" />
          {/* Diamond Plate Floor Texture Cue */}
          <line x1="60" y1="345" x2="340" y2="345" stroke={silverColor} strokeDasharray="4 4" />
          {/* Collapsible Heavy Mesh Gate */}
          <path d="M100 120 L130 180 L100 240 L130 300" stroke={silverColor} strokeWidth="1.2" />
          <path d="M130 120 L100 180 L130 240 L100 300" stroke={silverColor} strokeWidth="1.2" />
          <path d="M270 120 L300 180 L270 240 L300 300" stroke={silverColor} strokeWidth="1.2" />
          <path d="M300 120 L270 180 L300 240 L270 300" stroke={silverColor} strokeWidth="1.2" />
          {/* Overhead Heavy Crosshead Beam */}
          <rect x="70" y="45" width="260" height="18" stroke={strokeColor} strokeWidth="1.5" />
          <text x="60" y="35" fill={silverColor} fontSize="9" fontFamily="monospace">HEAVY INDUSTRIAL FREIGHT CHASSIS</text>
        </svg>
      );

    case 'hydraulic':
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hydraulic Cylinder & Heavy Piston Ram */}
          {/* Ground Pit Foundation */}
          <line x1="50" y1="360" x2="350" y2="360" stroke={silverColor} strokeWidth="1.5" />
          {/* Cylinder Barrel */}
          <rect x="175" y="180" width="50" height="180" stroke={strokeColor} strokeWidth="2" fill="rgba(28, 28, 30, 0.4)" />
          {/* Piston Rod (Chrome Plated) */}
          <rect x="185" y="80" width="30" height="110" stroke={silverColor} strokeWidth="1.5" />
          {/* Upper Head Mounting Flange */}
          <rect x="160" y="70" width="80" height="15" stroke={strokeColor} strokeWidth="1.5" />
          {/* Lifting Platform Bed */}
          <rect x="70" y="55" width="260" height="16" stroke={strokeColor} strokeWidth="1.5" fill="rgba(58, 58, 61, 0.5)" />
          {/* Hydraulic Fluid Reservoir & Pump Unit */}
          <rect x="70" y="270" width="70" height="85" stroke={silverColor} strokeWidth="1.2" />
          <circle cx="105" cy="300" r="16" stroke={strokeColor} />
          {/* Fluid High-Pressure Lines */}
          <path d="M140 310 H175" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Velocity Fuse / Rupture Burst Valve */}
          <polygon points="175,305 185,310 175,315" fill={strokeColor} stroke={strokeColor} />
          {/* Twin Telescopic Stage Cues */}
          <line x1="175" y1="210" x2="225" y2="210" stroke={silverColor} />
          <line x1="175" y1="250" x2="225" y2="250" stroke={silverColor} />
          <text x="60" y="38" fill={silverColor} fontSize="9" fontFamily="monospace">ELECTRO-HYDRAULIC RAM SYSTEM</text>
        </svg>
      );

    case 'scissor':
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Base Frame */}
          <rect x="40" y="330" width="320" height="18" stroke={silverColor} strokeWidth="1.5" />
          {/* Top Platform Bed */}
          <rect x="40" y="100" width="320" height="20" stroke={strokeColor} strokeWidth="2" fill="rgba(28, 28, 30, 0.6)" />
          {/* Lower / Upper Scissor Linkage Pins */}
          <circle cx="70" cy="330" r="5" stroke={strokeColor} fill={strokeColor} />
          <circle cx="330" cy="330" r="5" stroke={silverColor} />
          <circle cx="70" cy="120" r="5" stroke={strokeColor} fill={strokeColor} />
          <circle cx="330" cy="120" r="5" stroke={silverColor} />
          {/* Scissor Pantograph Arms */}
          <line x1="70" y1="330" x2="330" y2="120" stroke={strokeColor} strokeWidth="2" />
          <line x1="330" y1="330" x2="70" y2="120" stroke={strokeColor} strokeWidth="2" />
          {/* Center Pivot Bearing Pin */}
          <circle cx="200" cy="225" r="8" stroke={strokeColor} strokeWidth="2" fill="rgba(14, 14, 15, 0.8)" />
          {/* Dual Actuating Hydraulic Rams */}
          <line x1="100" y1="330" x2="200" y2="225" stroke={silverColor} strokeWidth="2.5" />
          <line x1="105" y1="330" x2="160" y2="270" stroke={strokeColor} strokeWidth="4" />
          {/* Perimeter Safety Toe Guards */}
          <line x1="40" y1="120" x2="40" y2="135" stroke={silverColor} />
          <line x1="360" y1="120" x2="360" y2="135" stroke={silverColor} />
          <text x="50" y="80" fill={silverColor} fontSize="9" fontFamily="monospace">HEAVY PANTOGRAPH SCISSOR PLATFORM</text>
        </svg>
      );

    case 'panoramic':
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Observation Glass Elevator Capsule */}
          {/* Upper Glass Dome Curve */}
          <path d="M100 130 C100 65 300 65 300 130" stroke={strokeColor} strokeWidth="2" />
          {/* Lower Glass Bowl Curve */}
          <path d="M100 270 C100 335 300 335 300 270" stroke={strokeColor} strokeWidth="2" fill="rgba(28, 28, 30, 0.4)" />
          {/* Vertical Glass Segment Stiles */}
          <line x1="100" y1="130" x2="100" y2="270" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="300" y1="130" x2="300" y2="270" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="150" y1="110" x2="150" y2="290" stroke={silverColor} strokeDasharray="6 3" />
          <line x1="200" y1="100" x2="200" y2="300" stroke={silverColor} strokeDasharray="6 3" />
          <line x1="250" y1="110" x2="250" y2="290" stroke={silverColor} strokeDasharray="6 3" />
          {/* Architectural Observation Railing */}
          <path d="M110 230 C110 200 290 200 290 230" stroke={strokeColor} strokeWidth="1.5" />
          {/* Vertical Architectural Guide Columns */}
          <line x1="70" y1="30" x2="70" y2="370" stroke={silverColor} strokeWidth="1.2" />
          <line x1="330" y1="30" x2="330" y2="370" stroke={silverColor} strokeWidth="1.2" />
          {/* Hoisting Cable Array */}
          <line x1="185" y1="20" x2="185" y2="70" stroke={strokeColor} />
          <line x1="215" y1="20" x2="215" y2="70" stroke={strokeColor} />
          <text x="60" y="25" fill={silverColor} fontSize="9" fontFamily="monospace">ARCHITECTURAL PANORAMIC CAPSULE</text>
        </svg>
      );

    case 'inverter':
    default:
      return (
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* VVVF Modernization Drive & Permanent Magnet Gearless Motor */}
          {/* Permanent Magnet Traction Machine */}
          <circle cx="200" cy="150" r="65" stroke={strokeColor} strokeWidth="2" fill="rgba(28, 28, 30, 0.4)" />
          <circle cx="200" cy="150" r="30" stroke={silverColor} strokeWidth="1.2" />
          <circle cx="200" cy="150" r="8" stroke={strokeColor} fill={strokeColor} />
          {/* Machine Brake Shoe Arms */}
          <rect x="115" y="130" width="16" height="40" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="269" y="130" width="16" height="40" stroke={strokeColor} strokeWidth="1.5" />
          {/* VVVF Electronic Controller Enclosure */}
          <rect x="100" y="240" width="200" height="120" stroke={silverColor} strokeWidth="1.5" fill="rgba(28, 28, 30, 0.5)" />
          {/* Heat Sink Fins & Sine Wave Display */}
          <path d="M120 280 Q135 260 150 280 T180 280 T210 280" stroke={strokeColor} strokeWidth="1.5" />
          <rect x="230" y="260" width="50" height="35" stroke={strokeColor} strokeWidth="1" />
          <line x1="235" y1="270" x2="275" y2="270" stroke={silverColor} />
          <line x1="235" y1="280" x2="265" y2="280" stroke={silverColor} />
          {/* Cable Interconnect Harness */}
          <line x1="200" y1="215" x2="200" y2="240" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3" />
          <text x="60" y="45" fill={silverColor} fontSize="9" fontFamily="monospace">VVVF INVERTER & GEARLESS TRACTION</text>
        </svg>
      );
  }
};

