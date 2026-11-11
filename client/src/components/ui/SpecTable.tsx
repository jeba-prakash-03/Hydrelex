import React from 'react';
import { TechnicalEyebrow } from './TechnicalEyebrow';
import { Surface } from './Surface';

export interface SystemSpecItem {
  id: string;
  name: string;
  application: string;
  drive: string;
  scope: string;
  status: string;
}

const defaultSpecs: SystemSpecItem[] = [
  {
    id: 'SYS-01',
    name: 'Passenger Elevators',
    application: 'Commercial & Multi-Storey Residential Buildings',
    drive: 'Traction / Gearless VVVF',
    scope: 'Enclosed RCC or steel structural shafts',
    status: 'Engineered to Site Requirements',
  },
  {
    id: 'SYS-02',
    name: 'Goods / Freight Lifts',
    application: 'Industrial Facilities, Warehouses & Manufacturing Hubs',
    drive: 'Heavy Traction / Electro-Hydraulic',
    scope: 'Reinforced car sling for pallet trucks & heavy cargo',
    status: 'Custom Payload Fabrication',
  },
  {
    id: 'SYS-03',
    name: 'Heavy Hydraulic Platforms',
    application: 'Automotive Workshops, Docks & Factory Transfer',
    drive: 'Direct / Indirect Hydraulic Ram Piston',
    scope: 'Shallow pit and zero overhead machine room conditions',
    status: 'Bespoke Engineering',
  },
  {
    id: 'SYS-04',
    name: 'Industrial Lifting Systems',
    application: 'Scissor Lift Platforms, Dock Levelers & Material Hoists',
    drive: 'Dual Hydraulic Pantograph Mechanism',
    scope: 'Floor-to-mezzanine cargo handling',
    status: 'In-House Fabrication',
  },
  {
    id: 'SYS-05',
    name: 'Custom Panoramic Lifts',
    application: 'Executive Atriums, Showrooms & Architectural Residences',
    drive: 'Traction / Hydraulic with Glass Capsule Frame',
    scope: 'Custom circular or polygonal glass enclosures',
    status: 'Architectural Adaptation',
  },
  {
    id: 'SYS-06',
    name: 'Inverter Modernization',
    application: 'Existing Aging Elevator Installations',
    drive: 'Microprocessor Controller & Frequency Inverter',
    scope: 'Retrofit to existing guide rails & car framework',
    status: 'Lifecycle Upgrade',
  },
];

interface SpecTableProps {
  className?: string;
  themeMode?: 'dark' | 'light';
}

export const SpecTable: React.FC<SpecTableProps> = ({
  className = '',
  themeMode = 'dark',
}) => {
  const isDark = themeMode === 'dark';

  return (
    <Surface tone={isDark ? 'dark' : 'sand'} as="div" className={`w-full overflow-hidden rounded-sm p-6 sm:p-8 border border-[var(--border)] ${className}`}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <TechnicalEyebrow variant="auto">
            ENGINEERING SPECIFICATION MATRIX
          </TechnicalEyebrow>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-surface-heading">
            System Comparison & Civil Scope
          </h3>
        </div>
        <span className="font-mono text-xs text-surface-muted">
          *Parameters engineered strictly per individual site survey
        </span>
      </div>

      {/* Responsive Architectural Matrix Table */}
      <div className="w-full overflow-x-auto border border-[var(--border)] rounded-sm shadow-elevated-card">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr
              className={`border-b border-[var(--border)] text-[11px] font-sans tracking-[0.14em] uppercase font-bold ${
                isDark ? 'bg-teal-900 text-amber-300' : 'bg-white text-ink-900'
              }`}
            >
              <th className="py-4 px-5">System Code</th>
              <th className="py-4 px-5">Equipment Category</th>
              <th className="py-4 px-5">Primary Application</th>
              <th className="py-4 px-5">Drive Topology</th>
              <th className="py-4 px-5">Civil Structural Scope</th>
              <th className="py-4 px-5 text-right">Engineering Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-xs font-sans">
            {defaultSpecs.map((spec) => (
              <tr
                key={spec.id}
                className={`transition-colors duration-150 ${
                  isDark ? 'hover:bg-ink-800 bg-ink-900' : 'hover:bg-white/60 bg-ivory-50'
                }`}
              >
                <td className="py-4 px-5 font-mono text-[11px] text-surface-accent font-bold whitespace-nowrap">
                  {spec.id}
                </td>
                <td className="py-4 px-5 font-heading text-sm font-bold text-surface-heading whitespace-nowrap">
                  {spec.name}
                </td>
                <td className="py-4 px-5 font-normal text-surface-muted">
                  {spec.application}
                </td>
                <td className="py-4 px-5 font-mono text-[11px] text-surface-fg whitespace-nowrap">
                  {spec.drive}
                </td>
                <td className="py-4 px-5 font-normal text-surface-muted">
                  {spec.scope}
                </td>
                <td className="py-4 px-5 text-right font-mono text-[11px] text-surface-accent whitespace-nowrap font-bold">
                  {spec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  );
};

