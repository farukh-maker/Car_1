import React, { useState } from 'react';
import { exportTelemetryCSV } from '../utils/csvExport';
import { SILVERSTONE_TELEMETRY } from '../data/carsData';

interface EngineeringCompareScreenProps {
  onOpenWindTunnel: () => void;
}

export const EngineeringCompareScreen: React.FC<EngineeringCompareScreenProps> = ({
  onOpenWindTunnel,
}) => {
  const [activeHoverPoint, setActiveHoverPoint] = useState<number | null>(null);

  const handleDownloadCSV = () => {
    const csvRows = SILVERSTONE_TELEMETRY.map((point) => ({
      Track_Distance_M: point.distance,
      Corner_Sector: point.locationName,
      RB20_Speed_Kmh: point.speedRB20,
      Chiron300_Speed_Kmh: point.speedChiron,
      ValkyrieAMR_Speed_Kmh: point.speedValkyrie,
      RB20_Lateral_G: point.gForce,
      RB20_Throttle_Pct: point.throttle,
      RB20_Brake_Pct: point.brake,
    }));
    exportTelemetryCSV('silverstone_gp_comparative', csvRows);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Sub-Header / Telemetry Lab Status Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-3 bg-[#0d0e13] border-b border-[#1e1f25]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff553d] animate-ping"></span>
            <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase tracking-wider font-semibold">
              APEX LAB 03 // MUHANDISLIK TAQQOSLASH PROTOKOLI
            </span>
            <span className="px-2 py-0.5 rounded bg-[#292a2f] text-[#fabc4d] font-mono-telemetry text-[11px] font-bold">
              FIA TELEMETRY SPEC v2.4
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono-telemetry text-xs text-[#c1c7cf]">
              TRACK: <strong className="text-[#e3e1e9]">SILVERSTONE GP CIRCUIT (5.891 KM)</strong>
            </span>
            <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">
              SIMULATSIYA HOLATI: TAYYOR (100%)
            </span>
          </div>
        </div>
      </section>

      {/* Title & Mission Brief Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-10 pb-8 bg-[#121318] relative overflow-hidden">
        <div className="absolute -right-16 -top-20 w-96 h-96 rounded-full bg-[#ff553d]/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
              [ AERODINAMIKA • KINETIKA • V-MAX ]
            </span>
            <span className="text-[#c1c7cf]">·</span>
            <span className="font-mono-telemetry text-xs text-[#c1c7cf] uppercase">
              3 TOMONLAMA LABORATORIYA
            </span>
          </div>
          <h1 className="font-chivo text-4xl sm:text-5xl lg:text-6xl font-black text-[#e3e1e9] tracking-tighter uppercase mb-4 leading-none">
            F1 BOLIDI <span className="text-[#ff553d]">VS</span> REKORDCHI{' '}
            <span className="text-[#fabc4d]">VS</span> GIPERKAR
          </h1>
          <p className="font-space text-base sm:text-lg text-[#c1c7cf] max-w-4xl leading-relaxed">
            Dunyoning eng yuqori texnologik 3 xil poyga falsafasi to'qnashuvi: Yer effektli gibrid F1
            monokoki, 490 km/soatlik W16 kvad-turbo V-Max qiroli hamda Adrian Newey yaratgan qoidalardan
            ozod sof trek giperkari.
          </p>
        </div>
      </section>

      {/* 3 Selected Titans Grid */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 bg-[#1a1b21]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contender 1: F1 RB20 */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 relative flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#ff553d]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ff553d]"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-[#ff553d]/15 text-[#ff553d] border border-[#ff553d]/30 rounded font-mono-telemetry text-[11px] font-bold uppercase">
                  1. FIA Formula 1
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#c1c7cf] uppercase tracking-wider">
                  AERO & G-FORCE QIROLI
                </span>
              </div>
              <h3 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
                Red Bull RB20
              </h3>
              <p className="font-mono-telemetry text-xs text-[#fabc4d] mb-4">
                Oracle Red Bull Racing • 2024
              </p>

              <div className="w-full h-44 rounded-lg overflow-hidden mb-4 relative bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf51PeFt5SBUUY2M39bN8PjR1B7JcqWqXYRrs8f_bOJ6V4dPm6-6KSTpul0vw2p0BHWnCO4PCayuUN-O1ysbV84M1F-917xMprDEYeSnZOtfmtrhVx7mzi3e1SIYyy38NMP9eaD7QN_tB51C-0Rcu8StoyvzJKOtbEuLYVF8dI6Lt-dUJTrxx361s8Z7EnXbkXkOy2nWKk3E5vBJaO4Peo5agXNyK6InywlEJYWN68JysJ67vPGJyyFQ"
                  alt="Red Bull RB20 Formula 1"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0d0e13]/90 backdrop-blur font-mono-telemetry text-[10px] text-[#e3e1e9] border border-[#292a2f]">
                  MASS: 798 KG (FIA MIN)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f]">
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Dvigatel</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">
                    1.6L V6 Turbo Hybrid
                  </p>
                </div>
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Sof Quvvat</p>
                  <p className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                    ~1,020 Ot Kuchi
                  </p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Downforce @ 250</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">2,200 kg</p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Max G-Kuchlanish</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">+5.8G Lateral</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 bg-[#292a2f]/50 px-4 py-2.5 rounded border border-[#292a2f]">
              <span className="font-mono-telemetry text-xs text-[#c1c7cf] uppercase">Quvvat/Vazn:</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#ff553d]">1,278 ot/t</span>
            </div>
          </div>

          {/* Contender 2: Bugatti Chiron 300+ */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 relative flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#fabc4d]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#fabc4d]"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-[#fabc4d]/15 text-[#fabc4d] border border-[#fabc4d]/30 rounded font-mono-telemetry text-[11px] font-bold uppercase">
                  2. Ginnes Rekordchisi
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#c1c7cf] uppercase tracking-wider">
                  MUTLAQ V-MAX
                </span>
              </div>
              <h3 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
                Chiron SS 300+
              </h3>
              <p className="font-mono-telemetry text-xs text-[#fabc4d] mb-4">
                Bugatti Automobiles S.A.S • V-Max Edition
              </p>

              <div className="w-full h-44 rounded-lg overflow-hidden mb-4 relative bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSI9zTW8hHQe48IGkFo8b722QE5morZA9BUeOViJo3_hPzA9NtmRIVqBfPwm33_pmZlvBzxxycmYA8zHfCPpbCP74yn_LsPVVxr7j-p8_Q84S4iAQSwjXGZVZ2L6BnRdnAlHp-WXCfl0C26cIoIp1ZSVBvnS6qZbmn5FKSHc7FZLNGqyKxxF2By1M8Ba0zutn4qunNjQ2UanqJm0MHaSiIbvwbSUL3D4-MX0xWBICGVWOx42ISZC4IQw"
                  alt="Bugatti Chiron Super Sport 300+"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0d0e13]/90 backdrop-blur font-mono-telemetry text-[10px] text-[#e3e1e9] border border-[#292a2f]">
                  MASS: 1,978 KG
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f]">
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Dvigatel</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">
                    8.0L W16 Quad-Turbo
                  </p>
                </div>
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Sof Quvvat</p>
                  <p className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">1,600 Ot Kuchi</p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Maksimal Tezlik</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">490.48 km/h</p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Aylanish Momenti</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">1,600 Nm</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 bg-[#292a2f]/50 px-4 py-2.5 rounded border border-[#292a2f]">
              <span className="font-mono-telemetry text-xs text-[#c1c7cf] uppercase">Quvvat/Vazn:</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#fabc4d]">809 ot/t</span>
            </div>
          </div>

          {/* Contender 3: Valkyrie AMR Pro */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 relative flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#dde3eb]/50 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#dde3eb]"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-[#34343a] text-[#dde3eb] border border-[#5f3e39]/30 rounded font-mono-telemetry text-[11px] font-bold uppercase">
                  3. Track Hypercar
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#c1c7cf] uppercase tracking-wider">
                  NO-LIMIT TREK
                </span>
              </div>
              <h3 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
                Valkyrie AMR Pro
              </h3>
              <p className="font-mono-telemetry text-xs text-[#fabc4d] mb-4">
                Aston Martin / Red Bull Advanced Tech
              </p>

              <div className="w-full h-44 rounded-lg overflow-hidden mb-4 relative bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlVswzZqWMiaSxS0OZv0Pf1OU8lDMPSawRot28KYGPtROi4EC_1oYULsgDWqtx7VBKppsJJGvav7FIU48_E5amDW7hmFbGRuMVOHJzf7TMYV9R4WtR-Uj6AbujPA5CXEwIvF-jIbWlYocw1L5OmSnH5bRJH2sBZZWoQwQaLjmOagBF4rPJeUvqSVPvifKqtK84WKu7rV6VWbTZTg0eNpaCzNi2eme1dq5tNK08LLkxoH9-9rb0JWCP8w"
                  alt="Aston Martin Valkyrie AMR Pro"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0d0e13]/90 backdrop-blur font-mono-telemetry text-[10px] text-[#e3e1e9] border border-[#292a2f]">
                  MASS: 1,000 KG
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f]">
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Dvigatel</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">
                    6.5L V12 Cosworth NA
                  </p>
                </div>
                <div>
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Sof Quvvat</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">1,014 Ot Kuchi</p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Downforce @ 250</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">2,660 kg (Max)</p>
                </div>
                <div className="mt-1">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Maksimal Aylanish</p>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-semibold">11,000 RPM</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 bg-[#292a2f]/50 px-4 py-2.5 rounded border border-[#292a2f]">
              <span className="font-mono-telemetry text-xs text-[#c1c7cf] uppercase">Quvvat/Vazn:</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#e3e1e9]">1,014 ot/t</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Telemetry Overlays & Dynamic Track Comparison */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 bg-[#121318]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#ff553d] text-lg">
                stacked_line_chart
              </span>
              <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold tracking-wider">
                TELEMETRIYA OVERLAY TAQQOSLASH (SILVERSTONE LAP ANALYSIS)
              </span>
            </div>
            <h2 className="font-chivo text-3xl sm:text-4xl text-[#e3e1e9] font-black uppercase tracking-tight">
              Tezlik va Tormozlanish Profillari
            </h2>
            <p className="font-space text-sm sm:text-base text-[#c1c7cf] max-w-3xl">
              Bir xil trassa nuqtasi bo'ylab 3 mashinaning tezlanish, burilish cho'qqisi va tormoz zonalarining
              to'liq tahlili.
            </p>
          </div>

          {/* Chart Box */}
          <div className="bg-[#1a1b21] border border-[#292a2f] rounded-xl p-6 shadow-xl">
            {/* Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f]">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1.5 bg-[#ff553d] rounded-full"></span>
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    RED BULL RB20 (F1)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1.5 bg-[#fabc4d] rounded-full"></span>
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    BUGATTI CHIRON 300+
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1.5 bg-[#dde3eb] rounded-full"></span>
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    VALKYRIE AMR PRO
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-telemetry text-xs text-[#c1c7cf]">SEKTOR:</span>
                <span className="font-mono-telemetry text-xs text-[#ff553d] bg-[#ff553d]/10 border border-[#ff553d]/30 px-2 py-0.5 rounded font-bold">
                  MAGGOTTS - BECKETTS - CHAPEL
                </span>
              </div>
            </div>

            {/* SVG Chart Visualization */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[750px] w-full h-80 relative select-none">
                <svg className="w-full h-full" viewBox="0 0 900 240" preserveAspectRatio="none">
                  {/* Horizontals */}
                  <line x1="0" x2="900" y1="40" y2="40" stroke="#34343a" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" x2="900" y1="90" y2="90" stroke="#34343a" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" x2="900" y1="140" y2="140" stroke="#34343a" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" x2="900" y1="190" y2="190" stroke="#34343a" strokeDasharray="4 4" strokeWidth="1" />

                  {/* Verticals: Turn Markers */}
                  <line x1="180" x2="180" y1="0" y2="220" stroke="#292a2f" strokeWidth="1.5" />
                  <line x1="420" x2="420" y1="0" y2="220" stroke="#292a2f" strokeWidth="1.5" />
                  <line x1="680" x2="680" y1="0" y2="220" stroke="#292a2f" strokeWidth="1.5" />

                  {/* Speed Labels */}
                  <text x="12" y="35" fill="#8b9199" fontFamily="JetBrains Mono" fontSize="11">350 KM/H</text>
                  <text x="12" y="85" fill="#8b9199" fontFamily="JetBrains Mono" fontSize="11">280 KM/H</text>
                  <text x="12" y="135" fill="#8b9199" fontFamily="JetBrains Mono" fontSize="11">200 KM/H</text>
                  <text x="12" y="185" fill="#8b9199" fontFamily="JetBrains Mono" fontSize="11">120 KM/H</text>

                  {/* Curve 1: Red Bull RB20 */}
                  <path
                    d="M 0,70 Q 100,50 180,60 T 300,95 T 420,70 T 560,110 T 680,65 T 900,45"
                    fill="none"
                    stroke="#ff553d"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Curve 2: Bugatti Chiron 300+ */}
                  <path
                    d="M 0,25 Q 100,20 180,140 T 300,165 T 420,135 T 560,185 T 680,120 T 900,15"
                    fill="none"
                    stroke="#fabc4d"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                    strokeLinecap="round"
                  />

                  {/* Curve 3: Aston Martin Valkyrie AMR Pro */}
                  <path
                    d="M 0,65 Q 100,45 180,75 T 300,105 T 420,80 T 560,120 T 680,75 T 900,55"
                    fill="none"
                    stroke="#dde3eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Scrubber point */}
                  {activeHoverPoint !== null && (
                    <line
                      x1={activeHoverPoint}
                      x2={activeHoverPoint}
                      y1="0"
                      y2="220"
                      stroke="#ff553d"
                      strokeWidth="2"
                    />
                  )}

                  {/* Corner Annotations */}
                  <text x="185" y="215" fill="#fabc4d" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">
                    TURN 10 (COPSE)
                  </text>
                  <text x="425" y="215" fill="#fabc4d" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">
                    TURN 11-12 (BECKETTS)
                  </text>
                  <text x="685" y="215" fill="#fabc4d" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">
                    TURN 14 (CHAPEL EXIT)
                  </text>
                </svg>
              </div>
            </div>

            {/* Real-time comparison callouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 bg-[#1e1f25] p-4 rounded-lg border border-[#292a2f]">
              <div>
                <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold">
                  RB20 Copse tezligi:
                </span>
                <p className="font-mono-telemetry text-3xl font-black text-[#e3e1e9]">291 km/soat</p>
                <p className="font-space text-xs text-[#c1c7cf] mt-1">
                  To'liq gaz bosilgan holatda 5.2G lateral kuchlanish.
                </p>
              </div>
              <div>
                <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                  Bugatti Copse tezligi:
                </span>
                <p className="font-mono-telemetry text-3xl font-black text-[#e3e1e9]">194 km/soat</p>
                <p className="font-space text-xs text-[#c1c7cf] mt-1">
                  2 tonna inersiya va past aerodinamik bosim sabab erta tormoz.
                </p>
              </div>
              <div>
                <span className="font-mono-telemetry text-xs text-[#dde3eb] uppercase font-bold">
                  Valkyrie AMR Copse tezligi:
                </span>
                <p className="font-mono-telemetry text-3xl font-black text-[#e3e1e9]">278 km/soat</p>
                <p className="font-space text-xs text-[#c1c7cf] mt-1">
                  2,660 kg aerobosim hisobiga F1 bolidiga eng yaqin natija.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Engineering Metrics Matrix */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 bg-[#1a1b21]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#fabc4d] text-lg">tune</span>
              <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                METRIK MATRITSA VA TIZIMLI SIMULATSIYA
              </span>
            </div>
            <h3 className="font-chivo text-3xl sm:text-4xl text-[#e3e1e9] font-black uppercase tracking-tight">
              Chuqur Muhandislik Taqqoslash Matritsasi
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metrics Bars */}
            <div className="bg-[#1e1f25] p-6 rounded-xl border border-[#292a2f] shadow-lg flex flex-col gap-6">
              <h4 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold">
                Kinetik va Dinamik Ko'rsatkichlar
              </h4>

              {/* Metric 1: Braking 200 to 0 km/h */}
              <div className="bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold">
                    Tormozlanish Masofasi (200 - 0 km/soat)
                  </span>
                  <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                    Eng qisqa = G'olib
                  </span>
                </div>
                {/* F1 */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">RB20 (F1)</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#ff553d] h-full rounded transition-all duration-500" style={{ width: '38%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    48 m
                  </span>
                </div>
                {/* Valkyrie */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Valkyrie AMR</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#dde3eb] h-full rounded transition-all duration-500" style={{ width: '54%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    69 m
                  </span>
                </div>
                {/* Bugatti */}
                <div className="flex items-center gap-3">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Bugatti SS 300+</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#fabc4d] h-full rounded transition-all duration-500" style={{ width: '92%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    118 m
                  </span>
                </div>
              </div>

              {/* Metric 2: Downforce generated at 250 km/h */}
              <div className="bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold">
                    Aerodinamik Bosim Kuchi (250 km/soat tezlikda)
                  </span>
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">
                    AMR Pro qoidalarsiz peshqadam
                  </span>
                </div>
                {/* Valkyrie */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Valkyrie AMR</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#dde3eb] h-full rounded transition-all duration-500" style={{ width: '100%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    2,660 kg
                  </span>
                </div>
                {/* F1 */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">RB20 (F1)</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#ff553d] h-full rounded transition-all duration-500" style={{ width: '82%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    2,200 kg
                  </span>
                </div>
                {/* Bugatti */}
                <div className="flex items-center gap-3">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Bugatti SS 300+</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#fabc4d] h-full rounded transition-all duration-500" style={{ width: '18%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    450 kg
                  </span>
                </div>
              </div>

              {/* Metric 3: Lateral G */}
              <div className="bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold">
                    Maksimal Burilish G-Kuchlanishi (Lateral G)
                  </span>
                  <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                    FIA F1 Slik shinalari ustunligi
                  </span>
                </div>
                {/* F1 */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">RB20 (F1)</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#ff553d] h-full rounded transition-all duration-500" style={{ width: '98%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    5.8 G
                  </span>
                </div>
                {/* Valkyrie */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Valkyrie AMR</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#dde3eb] h-full rounded transition-all duration-500" style={{ width: '65%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    3.5 G
                  </span>
                </div>
                {/* Bugatti */}
                <div className="flex items-center gap-3">
                  <span className="w-28 font-mono-telemetry text-xs text-[#8b9199]">Bugatti SS 300+</span>
                  <div className="flex-1 bg-[#292a2f] rounded h-3.5 overflow-hidden">
                    <div className="bg-[#fabc4d] h-full rounded transition-all duration-500" style={{ width: '25%' }}></div>
                  </div>
                  <span className="w-16 text-right font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    1.4 G
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Lap Time Showdown on Iconic Tracks */}
            <div className="bg-[#1e1f25] p-6 rounded-xl border border-[#292a2f] shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold">
                    Trassa Aylanish Simulyatsiyasi
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-[#34343a] text-[#fabc4d] font-mono-telemetry text-xs font-bold">
                    DELTA TAHLIL
                  </span>
                </div>
                <p className="font-space text-sm text-[#c1c7cf] mb-4">
                  Silverstone va Autodromo Nazionale Monza bo'yicha hisoblangan to'liq aylanish vaqtlari.
                </p>

                {/* Track 1: Silverstone */}
                <div className="bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f] mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ff553d] text-base">timer</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        SILVERSTONE GP (5.891 KM)
                      </span>
                    </div>
                    <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                      AERODINAMIK USTUNLIK
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">1. Red Bull RB20 (F1)</span>
                      <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                        1:27.097 <span className="text-[#8b9199] font-normal text-[10px]">(ETALON)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">2. Valkyrie AMR Pro</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        1:33.400 <span className="text-[#fabc4d] font-normal text-[10px]">(+6.303s)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">3. Bugatti Chiron SS 300+</span>
                      <span className="font-mono-telemetry text-xs text-[#ffb4ab] font-bold">
                        2:04.120 <span className="text-[#ffb4ab] font-normal text-[10px]">(+37.023s)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Track 2: Monza */}
                <div className="bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#fabc4d] text-base">speed</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        MONZA "TEMPLE OF SPEED" (5.793 KM)
                      </span>
                    </div>
                    <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                      V-MAX ZONALARI
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">1. Red Bull RB20 (F1)</span>
                      <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                        1:20.150 <span className="text-[#8b9199] font-normal text-[10px]">(ETALON)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">2. Valkyrie AMR Pro</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        1:25.890 <span className="text-[#fabc4d] font-normal text-[10px]">(+5.740s)</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f25] border border-[#292a2f]">
                      <span className="font-space text-xs text-[#e3e1e9] font-bold">3. Bugatti Chiron SS 300+</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        1:48.550 <span className="text-[#ffb4ab] font-normal text-[10px]">(+28.400s)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#292a2f] rounded-lg mt-4 flex items-center gap-3 border border-[#34343a]">
                <span className="material-symbols-outlined text-[#fabc4d] shrink-0">info</span>
                <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                  Bugatti to'g'ri chiziqlarda 400+ km/soatga erishsa ham, F1 bolidining tormozlanish va
                  Prima Variante burilishidagi 5G sekinlashuviga bardosh bera olmaydi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aerodynamic & Technical Deep-Dive Bento Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 bg-[#121318]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Aero Efficiency (L/D Ratio) */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                  AERO EFFICIENCY
                </span>
                <span className="material-symbols-outlined text-[#fabc4d]">air</span>
              </div>
              <h4 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold mb-2">
                L/D Koeffitsiyenti (Lift-to-Drag)
              </h4>
              <p className="font-space text-xs text-[#c1c7cf] mb-4 leading-relaxed">
                Aerodinamik qarshilik va bosim nisbati. Qanchalik yuqori bo'lsa, mashina havoni shunchalik
                samarali yorib o'tib, yerga mahkam bosiladi.
              </p>
            </div>
            <div className="space-y-2 bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f]">
              <div className="flex justify-between items-center text-xs font-mono-telemetry">
                <span className="text-[#8b9199]">RB20 F1:</span>
                <span className="text-[#ff553d] font-bold">4.2 : 1 (Max Aero)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono-telemetry">
                <span className="text-[#8b9199]">Valkyrie AMR Pro:</span>
                <span className="text-[#e3e1e9] font-bold">3.8 : 1</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono-telemetry">
                <span className="text-[#8b9199]">Bugatti Chiron SS:</span>
                <span className="text-[#fabc4d] font-bold">0.85 : 1 (Top Speed Mode)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Thermal Management */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold">
                  THERMAL MANAGEMENT
                </span>
                <span className="material-symbols-outlined text-[#ff553d]">local_fire_department</span>
              </div>
              <h4 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold mb-2">
                Shina va Issiqlik Cheklovi
              </h4>
              <p className="font-space text-xs text-[#c1c7cf] mb-4 leading-relaxed">
                Bugattining Michelin Pilot Sport Cup 2 shinalari 490 km/soatda 5000G radial kuchlanishga
                duch keladi. F1 Pirelli Slik shinalari esa 130°C da yemirilish darajasi yuqori.
              </p>
            </div>
            <div className="bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f] flex flex-col gap-2 font-mono-telemetry text-xs">
              <div className="flex justify-between">
                <span className="text-[#8b9199]">Pirelli F1 Slik:</span>
                <span className="text-[#ff553d] font-bold">Optimum: 100°C - 115°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b9199]">Bugatti Michelin V-Max:</span>
                <span className="text-[#fabc4d] font-bold">Ruxsat etilgan limit: 12 daqiqa</span>
              </div>
            </div>
          </div>

          {/* Card 3: Downforce at Inverted Ceiling */}
          <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-telemetry text-xs text-[#dde3eb] uppercase font-bold">
                  THEORETICAL CEILING RUN
                </span>
                <span className="material-symbols-outlined text-[#e3e1e9]">screen_rotation</span>
              </div>
              <h4 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold mb-2">
                Shiftda Teskari Yurish Qobiliyati
              </h4>
              <p className="font-space text-xs text-[#c1c7cf] mb-4 leading-relaxed">
                Agar tunnel shiftida teskari yurilsa, mashina o'z vaznidan ko'p aerobosim hosil qilishi kerak.
              </p>
            </div>
            <div className="bg-[#0d0e13] p-3 rounded-lg border border-[#292a2f] space-y-1.5 font-mono-telemetry text-xs">
              <p className="text-[#ff553d] font-bold">✓ RB20 F1: 180 km/soatdan yuqorida mumkin</p>
              <p className="text-[#e3e1e9] font-bold">✓ Valkyrie AMR Pro: 195 km/soatdan yuqorida mumkin</p>
              <p className="text-[#ffb4ab] font-bold">✗ Chiron SS 300+: Mumkin emas (2 tonna vazn)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Race Engineer Technical Verdict */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 bg-[#0d0e13] relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-[#1a1b21] border border-[#292a2f] p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="flex items-center gap-4 mb-4">
                <img
                  className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-[#fabc4d]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhLnaXS8rC_k_QwVkEgvwCY_fdSywCYw9ApsSHsQIlAaMXkv_broiCFHXgep5oVv5E7So3RSTdSuQGxtID4w6ay5j5YaNXtCZKaPkBNuK0h-WwCMAqHqIBZTPSzVQRojDz_0NyMd2kYKaA5Wnm91dGOcuh7dLbIPaXGfEHaZIIPsO43grdsVqnJNm2YLHNnU04xxh2Qu1vIaqew1IHy8BKrndvKNJRACQup0Bh7YFKEE0DIOaF3tBCkw"
                  alt="Dr. Helmut V. Lead Race Engineer"
                />
                <div>
                  <h5 className="font-chivo text-xl text-[#e3e1e9] font-bold">Dr. Helmut V.</h5>
                  <p className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-semibold">
                    Bosh Aerodinamik va Poyga Muhandisi
                  </p>
                  <span className="inline-block mt-1 font-mono-telemetry text-[10px] text-[#ff553d] bg-[#ff553d]/10 border border-[#ff553d]/30 px-2 py-0.5 rounded font-bold">
                    FIA Homologated Engineer
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#0d0e13] rounded-lg border border-[#292a2f] w-full">
                <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">XULOSA IMZOSI:</p>
                <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                  APEX-ENG-VERDICT-9942
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#fabc4d] text-base">verified_user</span>
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
                    TEXNIK MUHANDISLIK XULOSASI
                  </span>
                </div>
                <h3 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase mb-4 leading-tight">
                  "Fizika qonunlarini aldab bo'lmaydi: Trassada Massa va Aerobosim Mutlaq Hukmron"
                </h3>
                <p className="font-space text-sm sm:text-base text-[#c1c7cf] mb-4 leading-relaxed">
                  Agar vazifa Yer yuzidagi tekis yo'lda to'g'ri chiziq bo'ylab 500 km/soatga intilish bo'lsa,{' '}
                  <strong className="text-[#fabc4d]">Bugatti Chiron Super Sport 300+</strong> termodinamika
                  va quvvat uzatish mo'jizasidir. Ammo poyga yo'lagi faqat to'g'ri chiziqdan iborat emas.
                </p>
                <p className="font-space text-sm sm:text-base text-[#c1c7cf] mb-6 leading-relaxed">
                  <strong className="text-[#ff553d]">Red Bull RB20</strong> aerodinamik venturi tunnellari,
                  o'ta past og'irlik markazi va 798 kg sof vazni evaziga burilishlarda Bugattidan 3 barobar
                  yuqori tezlik saqlab qoladi.{' '}
                  <strong className="text-[#dde3eb]">Aston Martin Valkyrie AMR Pro</strong> esa FIA
                  cheklovlarisiz F1 darajasidagi giperkar yaratish mumkinligini isbotlagan yagona yer vositasidir.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleDownloadCSV}
                  className="px-6 py-3 bg-[#ff553d] text-[#670400] rounded font-chivo text-sm uppercase font-black tracking-wider hover:bg-[#ffb4a7] transition-all shadow-[0_0_20px_rgba(255,85,61,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">sim_card_download</span>
                  To'liq Telemetriya CSV Yuklash
                </button>
                <button
                  onClick={onOpenWindTunnel}
                  className="px-6 py-3 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] border border-[#34343a] rounded font-mono-telemetry text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#fabc4d]">view_in_ar</span>
                  3D Shamol Tunneli Simulyatori
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
