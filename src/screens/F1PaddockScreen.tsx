import React, { useState, useEffect } from 'react';
import { exportTelemetryCSV } from '../utils/csvExport';

type TelemetryMode = 'qualifying' | 'race' | 'wet';

interface CarPaddockData {
  id: string;
  title: string;
  chassis: string;
  topSpeed: string;
  downforce: string;
  gForce: string;
  iceRpm: string;
  boostBar: string;
  image: string;
  desc: string;
  power: string;
  accel0100: string;
  accel0200: string;
  weight: string;
  engine: string;
}

const PADDOCK_CARS: Record<string, CarPaddockData> = {
  rb20: {
    id: 'rb20',
    title: 'RED BULL RACING RB20',
    chassis: 'CHASSIS #04',
    topSpeed: '362.8 KM/H',
    downforce: '1,480 kg',
    gForce: '5.85 G',
    iceRpm: '14,820 RPM',
    boostBar: '3.85 BAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAphuK6zbtVvdM6PboIxFwZdcMz9Pjhq9KL4Bul2P3irgmi_FjNFGAnnBJ0l9tKKWJ0LQo1aYcrYWIc6iE170sUcra0c6_Mnjg_KyNbyalbMXby5vXziRU8TWXN9jsR4wVAqAwNZqP7Bnp8hR8BTbBpSNNSvUS6SwVlMT14e9egdvjf-JVQdHMc5ucGTCtpsLdrlLZehiHULhYANQ3rhHumQpFIGK5Z5RnL25dsyUl_wkdArAVHJ3k0QQ',
    desc: 'Havo qabul qiluvchi vertikal shark-inlet va agressiv underfloor tunnel arxitekturasi.',
    power: '1035 HP (Ot kuchi)',
    accel0100: '2.08 soniya',
    accel0200: '4.25 soniya',
    weight: '798 kg (minimal limit)',
    engine: 'HONDA RBPT',
  },
  sf24: {
    id: 'sf24',
    title: 'SCUDERIA FERRARI SF-24',
    chassis: 'CHASSIS #01',
    topSpeed: '359.4 KM/H',
    downforce: '1,440 kg',
    gForce: '5.72 G',
    iceRpm: '14,750 RPM',
    boostBar: '3.80 BAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf51PeFt5SBUUY2M39bN8PjR1B7JcqWqXYRrs8f_bOJ6V4dPm6-6KSTpul0vw2p0BHWnCO4PCayuUN-O1ysbV84M1F-917xMprDEYeSnZOtfmtrhVx7mzi3e1SIYyy38NMP9eaD7QN_tB51C-0Rcu8StoyvzJKOtbEuLYVF8dI6Lt-dUJTrxx361s8Z7EnXbkXkOy2nWKk3E5vBJaO4Peo5agXNyK6InywlEJYWN68JysJ67vPGJyyFQ',
    desc: "Qisqartirilgan shassi burun tuzilishi, past tezlikdagi o'ta sezgir boshqaruv barqarorligi.",
    power: '1030 HP (Ot kuchi)',
    accel0100: '2.10 soniya',
    accel0200: '4.30 soniya',
    weight: '798 kg',
    engine: '066/12 V6',
  },
  mcl38: {
    id: 'mcl38',
    title: 'MCLAREN FORMULA 1 MCL38',
    chassis: 'CHASSIS #03',
    topSpeed: '361.2 KM/H',
    downforce: '1,465 kg',
    gForce: '5.80 G',
    iceRpm: '14,800 RPM',
    boostBar: '3.82 BAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyElh9nrBg1qUeZdmWaxK5XZYPYQ_JMRoZOBPgo9BjJOwYtX_eSc8FySCdD--FW73bHfaBZvIy6ibkC27Pj6kLMr4mdWux7nm_KAQyXuX9Ld7xQeH4uIbTcSeFQqy1z8RV-OpKkWWsPLSQ1nCtHgyySRD7U0DsGqSSbhFpMRZAKq0A-pvwtmX9Yu9hEBmhcvx_-xMukPsig0uZPU3K0S57FJBPfcyt9yjsI5o3N2OWqvoxA8ki_FFfxA',
    desc: "O'rta va yuqori tezlikdagi burilishlarda shinalar haroratini mukammal saqlash qobiliyati.",
    power: '1028 HP (Ot kuchi)',
    accel0100: '2.09 soniya',
    accel0200: '4.28 soniya',
    weight: '798 kg',
    engine: 'MERCEDES M15',
  },
  w15: {
    id: 'w15',
    title: 'MERCEDES-AMG F1 W15 E-PERFORMANCE',
    chassis: 'CHASSIS #02',
    topSpeed: '358.9 KM/H',
    downforce: '1,430 kg',
    gForce: '5.68 G',
    iceRpm: '14,710 RPM',
    boostBar: '3.78 BAR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEYJ9Syg5PHA9nntm6LwUw-75D-muEEDpb2Igm2tRV944nqamkX3KI4gCTtsF48zR3keFZRWGpLzdKAOp1F7rqdBZO3HOTlEMxW0dRuCHsbokqIRqAYKPuJehnBRWJymEhP3u8f-FaFFXPC-1eGBDtkKLborG-TH7Za81V6cin1FkICX04Q8ccUtul89DwIkb9ZIv7-j7fPTrJjrUIF51wZtR25-kIpkYlGRcBhM79P5_4_5TeLgVJFw',
    desc: "Yangi pushrod orqa osma (suspension) geometriyasi va to'g'ri chiziqli aero barqarorlik.",
    power: '1025 HP (Ot kuchi)',
    accel0100: '2.12 soniya',
    accel0200: '4.36 soniya',
    weight: '798 kg',
    engine: 'M15 E-PERF',
  },
};

export const F1PaddockScreen: React.FC = () => {
  const [activeCarKey, setActiveCarKey] = useState<string>('rb20');
  const [telemetryMode, setTelemetryMode] = useState<TelemetryMode>('qualifying');
  const [drsActive, setDrsActive] = useState<boolean>(false);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  
  // Aero layer toggles
  const [layers, setLayers] = useState({
    groundEffect: true,
    drs: true,
    vortex: true,
    halo: true,
  });

  // Simulated live telemetry telemetry pulsing
  const [liveG, setLiveG] = useState<number>(5.85);
  const [throttlePct, setThrottlePct] = useState<number>(98);
  const [brakePct, setBrakePct] = useState<number>(0);
  const [gDotCoords, setGDotCoords] = useState<{ cx: number; cy: number }>({ cx: 72, cy: 38 });

  const activeCar = PADDOCK_CARS[activeCarKey] || PADDOCK_CARS.rb20;

  // React to mode changes
  const modeModifier = telemetryMode === 'qualifying' ? 1.0 : telemetryMode === 'race' ? 1.05 : 1.15;
  const currentDownforce = Math.round(parseInt(activeCar.downforce.replace(/[^0-9]/g, '')) * modeModifier);

  // Live G and Throttle simulation jitter
  useEffect(() => {
    const timer = setInterval(() => {
      const gOffset = (Math.random() - 0.5) * 0.15;
      setLiveG(+(parseFloat(activeCar.gForce) + gOffset).toFixed(2));
      
      const newCx = Math.min(85, Math.max(15, 50 + (Math.random() - 0.2) * 35));
      const newCy = Math.min(85, Math.max(15, 50 - (Math.random()) * 25));
      setGDotCoords({ cx: Math.round(newCx), cy: Math.round(newCy) });

      if (drsActive) {
        setThrottlePct(100);
        setBrakePct(0);
      } else {
        setThrottlePct(Math.floor(92 + Math.random() * 7));
      }
    }, 700);

    return () => clearInterval(timer);
  }, [activeCar, drsActive]);

  const handleExportCSV = () => {
    const data = [
      { Point: 'Prima Variante (T1)', Distance_M: 1200, Speed_RB20_Kmh: 355, Speed_SF24_Kmh: 351, Brake_M: 63, Lateral_G: 5.2 },
      { Point: 'Curva Grande (T3)', Distance_M: 2400, Speed_RB20_Kmh: 310, Speed_SF24_Kmh: 304, Brake_M: 0, Lateral_G: 3.8 },
      { Point: 'Variante della Roggia (T4)', Distance_M: 3200, Speed_RB20_Kmh: 335, Speed_SF24_Kmh: 330, Brake_M: 58, Lateral_G: 4.6 },
      { Point: 'Lesmo 1 (T6)', Distance_M: 3900, Speed_RB20_Kmh: 265, Speed_SF24_Kmh: 260, Brake_M: 25, Lateral_G: 4.2 },
      { Point: 'Lesmo 2 (T7)', Distance_M: 4200, Speed_RB20_Kmh: 260, Speed_SF24_Kmh: 254, Brake_M: 22, Lateral_G: 4.5 },
      { Point: 'Variante Ascari (T8-10)', Distance_M: 5200, Speed_RB20_Kmh: 240, Speed_SF24_Kmh: 235, Brake_M: 45, Lateral_G: 5.4 },
      { Point: 'Parabolica / Alboreto (T11)', Distance_M: 5793, Speed_RB20_Kmh: 275, Speed_SF24_Kmh: 268, Brake_M: 15, Lateral_G: 4.9 },
    ];
    exportTelemetryCSV(`f1_${activeCar.id}_monza_lap`, data);
  };

  return (
    <div className="flex flex-col w-full text-[#e3e1e9] select-none">
      {/* PADDOCK CONTROL STRIP */}
      <div className="w-full bg-[#0d0e13] px-4 sm:px-8 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-[#1e1f25] shadow-md">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1f25] border border-[#292a2f] rounded font-mono-telemetry text-xs">
            <span className="w-2 h-2 rounded-full bg-[#ff553d] animate-pulse"></span>
            <span className="text-[#ff553d] font-bold uppercase">FIA TELEMETRY SYNC: ONLINE</span>
            <span className="text-[#8b9199]">| 1000 Hz</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#fabc4d] font-mono-telemetry text-xs">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>SEKTOR 1-2-3: OPTIMAL (DELTA -0.184s)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono-telemetry text-xs text-[#8b9199]">REJIM:</span>
          <div className="flex items-center bg-[#292a2f] rounded p-0.5 border border-[#34343a]">
            {(['qualifying', 'race', 'wet'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTelemetryMode(mode)}
                className={`px-3 py-1 rounded font-mono-telemetry text-xs uppercase font-semibold transition-all ${
                  telemetryMode === mode
                    ? mode === 'qualifying'
                      ? 'bg-[#ff553d] text-[#670400]'
                      : mode === 'race'
                      ? 'bg-[#fabc4d] text-[#432c00]'
                      : 'bg-[#dde3eb] text-[#2b3137]'
                    : 'text-[#c1c7cf] hover:text-white'
                }`}
              >
                {mode === 'qualifying' ? 'QUALIFYING' : mode === 'race' ? 'RACE PACE' : 'WET SIM'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 bg-[#1e1f25] hover:bg-[#292a2f] border border-[#292a2f] text-[#fabc4d] rounded font-mono-telemetry text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            EXPORT .CSV
          </button>
        </div>
      </div>

      {/* MAIN HUD / VIEWPORT GRID */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8 max-w-7xl mx-auto">
        {/* HEADER SUB-NAV & BOLID SELECTOR */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#ff553d] font-mono-telemetry text-xs tracking-widest uppercase">
              <span className="material-symbols-outlined text-base">airline_stops</span>
              <span>AERODINAMIK LABORATORIYA • CFD POST-PROCESSOR</span>
            </div>
            <h1 className="font-chivo text-3xl sm:text-4xl lg:text-5xl font-black text-[#e3e1e9] tracking-tight uppercase leading-none">
              Formula 1 Aerodinamika va Telemetriya Markazi
            </h1>
            <p className="font-space text-sm sm:text-base text-[#c1c7cf] max-w-3xl">
              F1 2024-2025 avlod bolidlarining real vaqt telemetrik ko'rsatkichlari, Venturi tunnel bosim
              gradiyentlari, aero-elastik qanotlar tebranishi va 1000Hz pit-wall datchiklari ma'lumotlar bazasi.
            </p>
          </div>

          {/* BOLID SELECTION TABS */}
          <div className="flex items-center gap-1.5 bg-[#0d0e13] p-1.5 rounded-xl border border-[#292a2f] shadow-lg self-stretch lg:self-auto overflow-x-auto">
            {Object.keys(PADDOCK_CARS).map((carKey) => {
              const car = PADDOCK_CARS[carKey];
              const isActive = activeCarKey === carKey;
              return (
                <button
                  key={carKey}
                  onClick={() => setActiveCarKey(carKey)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-lg font-chivo text-xs uppercase font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#292a2f] text-white border border-[#5f3e39]/40 shadow-sm'
                      : 'text-[#8b9199] hover:text-[#e3e1e9]'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      carKey === 'rb20'
                        ? 'bg-[#fabc4d]'
                        : carKey === 'sf24'
                        ? 'bg-[#ff553d]'
                        : carKey === 'mcl38'
                        ? 'bg-amber-500'
                        : 'bg-emerald-400'
                    }`}
                  ></span>
                  <span>{car.title.replace('SCUDERIA ', '').replace('MCLAREN FORMULA 1 ', 'MCLAREN ')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D COCKPIT & ACTIVE SIMULATION MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 3D CAR CAD / AERO MAPPING VIEWPORT (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col bg-[#0d0e13] border border-[#292a2f] rounded-xl overflow-hidden shadow-2xl relative">
            {/* Viewport Top Status Bar */}
            <div className="p-4 bg-[#1a1b21] border-b border-[#292a2f] flex flex-wrap items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-3">
                <span className="font-chivo text-lg text-[#fabc4d] font-bold">{activeCar.title}</span>
                <span className="font-mono-telemetry text-xs px-2 py-0.5 rounded bg-[#34343a] text-[#c1c7cf] uppercase">
                  {activeCar.chassis}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono-telemetry text-xs">
                <span className="text-[#8b9199]">V-MAX KO'RSATKICH:</span>
                <span className="text-[#ff553d] font-bold text-sm">{activeCar.topSpeed}</span>
              </div>
            </div>

            {/* Interactive 3D Visual Stage */}
            <div className="relative w-full h-[440px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0e13] via-[#1a1b21] to-[#0d0e13]">
              {/* Background Grid Plane */}
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="telemetryGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c1c7cf" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#telemetryGrid)" />
              </svg>

              {/* Hero Bolid Imagery */}
              <div
                className="relative w-full h-full flex items-center justify-center p-4 transition-transform duration-300"
                style={{ transform: `rotate(${rotationDeg}deg) scale(1.02)` }}
              >
                <img
                  className="max-h-[350px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(255,85,61,0.25)]"
                  src={activeCar.image}
                  alt={activeCar.title}
                />

                {/* Real-time Dynamic Aero Streamlines */}
                {layers.vortex && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-300">
                    <svg className="w-full h-full absolute inset-0 text-[#ff553d] opacity-60" viewBox="0 0 800 450" fill="none">
                      <path
                        d="M 120 220 Q 280 180, 420 215 T 720 200"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        className="animate-pulse"
                      />
                      <path
                        d="M 140 240 Q 320 280, 460 250 T 700 245"
                        stroke="#fabc4d"
                        strokeWidth="1.8"
                        strokeDasharray="12 4"
                      />
                      <path
                        d="M 220 290 Q 380 340, 560 310 T 740 320"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                      />
                    </svg>
                  </div>
                )}

                {/* Hotspot 01: Front Wing */}
                <div className="absolute left-[18%] top-[56%] z-30 group/hotspot cursor-pointer">
                  <span className="flex h-4 w-4 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff553d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ff553d] text-[9px] font-bold text-[#670400] items-center justify-center">
                      01
                    </span>
                  </span>
                  <div className="absolute left-6 -top-4 w-48 p-2 rounded bg-[#292a2f]/95 backdrop-blur text-xs hidden group-hover/hotspot:block shadow-xl z-40 border border-[#5f3e39]/40">
                    <p className="font-chivo text-xs text-[#ff553d] font-bold uppercase">Front Wing Vortex (Y250)</p>
                    <p className="font-space text-[11px] text-[#c1c7cf]">35% oldi aerodinamik yuklanishni shakllantiradi.</p>
                  </div>
                </div>

                {/* Hotspot 02: Venturi Tunnel */}
                {layers.groundEffect && (
                  <div className="absolute left-[48%] top-[68%] z-30 group/hotspot cursor-pointer">
                    <span className="flex h-4 w-4 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fabc4d] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#fabc4d] text-[9px] font-bold text-[#432c00] items-center justify-center">
                        02
                      </span>
                    </span>
                    <div className="absolute left-6 -top-4 w-52 p-2 rounded bg-[#292a2f]/95 backdrop-blur text-xs hidden group-hover/hotspot:block shadow-xl z-40 border border-[#fabc4d]/40">
                      <p className="font-chivo text-xs text-[#fabc4d] font-bold uppercase">Ground Effect Venturi</p>
                      <p className="font-space text-[11px] text-[#c1c7cf]">Pastki tunnel orqali 1100 kg vakuum tortish kuchi (Suction force).</p>
                    </div>
                  </div>
                )}

                {/* Hotspot 03: DRS */}
                {layers.drs && (
                  <div className="absolute right-[20%] top-[34%] z-30 group/hotspot cursor-pointer">
                    <span className="flex h-4 w-4 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff553d] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ff553d] text-[9px] font-bold text-white items-center justify-center">
                        03
                      </span>
                    </span>
                    <div className="absolute right-6 -top-4 w-48 p-2 rounded bg-[#292a2f]/95 backdrop-blur text-xs hidden group-hover/hotspot:block shadow-xl z-40 border border-[#5f3e39]/40">
                      <p className="font-chivo text-xs text-[#ff553d] font-bold uppercase">DRS Gidravlik Qanot</p>
                      <p className="font-space text-[11px] text-[#c1c7cf]">Qarshilikni 22% ga qisqartirib, +20 km/h beradi.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Telemetry HUD floating on canvas */}
              <div className="absolute top-4 left-4 bg-[#34343a]/80 backdrop-blur-md p-3 rounded-lg flex flex-col gap-1 pointer-events-none shadow-lg border border-[#292a2f]">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase tracking-wider">
                  DOWNFORCE @ 250 KM/H
                </span>
                <span className="font-mono-telemetry text-2xl font-bold text-[#ff553d] tracking-tight">
                  {currentDownforce.toLocaleString()} kg
                </span>
                <div className="w-full bg-[#1a1b21] h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#ff553d] h-full w-[84%] transition-all duration-300"></div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-[#34343a]/80 backdrop-blur-md p-3 rounded-lg flex items-center gap-4 pointer-events-none shadow-lg border border-[#292a2f]">
                <div>
                  <span className="font-mono-telemetry text-[10px] text-[#8b9199] block uppercase">
                    LATERAL G-LOAD
                  </span>
                  <span className="font-mono-telemetry text-sm font-bold text-[#fabc4d]">{liveG} G</span>
                </div>
                <div className="w-px h-8 bg-[#292a2f]"></div>
                <div>
                  <span className="font-mono-telemetry text-[10px] text-[#8b9199] block uppercase">
                    BRAKE REGEN
                  </span>
                  <span className="font-mono-telemetry text-sm font-bold text-[#e3e1e9]">120 kW (ERS-K)</span>
                </div>
              </div>

              {/* Viewport 3D Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                <button
                  onClick={() => setRotationDeg((prev) => prev + 15)}
                  className="w-8 h-8 rounded bg-[#292a2f]/90 hover:bg-[#34343a] text-white flex items-center justify-center transition-colors border border-[#34343a] cursor-pointer"
                  title="Aylantirish (+15°)"
                >
                  <span className="material-symbols-outlined text-base">rotate_right</span>
                </button>
                <button
                  onClick={() => setRotationDeg(0)}
                  className="w-8 h-8 rounded bg-[#292a2f]/90 hover:bg-[#34343a] text-white flex items-center justify-center transition-colors border border-[#34343a] cursor-pointer"
                  title="Asl holatiga qaytarish"
                >
                  <span className="material-symbols-outlined text-base">center_focus_strong</span>
                </button>
              </div>
            </div>

            {/* 3D Layer Switches & DRS Control Bar */}
            <div className="p-4 bg-[#1a1b21] border-t border-[#292a2f] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono-telemetry text-xs text-[#8b9199] uppercase">AERO QATLAMLAR:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.groundEffect}
                    onChange={(e) => setLayers({ ...layers, groundEffect: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#1e1f25] accent-[#ff553d]"
                  />
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9]">Ground Effect Venturi</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.drs}
                    onChange={(e) => setLayers({ ...layers, drs: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#1e1f25] accent-[#fabc4d]"
                  />
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9]">DRS Klapan</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.vortex}
                    onChange={(e) => setLayers({ ...layers, vortex: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#1e1f25] accent-[#ff553d]"
                  />
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9]">Vortices & Oqimlar</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.halo}
                    onChange={(e) => setLayers({ ...layers, halo: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#1e1f25] accent-[#ff553d]"
                  />
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9]">Titanium Halo Qafasi</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDrsActive(!drsActive)}
                  className={`px-4 py-1.5 rounded font-mono-telemetry text-xs uppercase font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    drsActive
                      ? 'bg-[#fabc4d]/20 border-[#fabc4d] text-[#fabc4d]'
                      : 'bg-[#292a2f] border-[#34343a] text-[#c1c7cf] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">open_in_full</span>
                  DRS: <span className={drsActive ? 'text-[#fabc4d]' : 'text-[#ff553d]'}>{drsActive ? 'OCHIQ (DRS ON)' : 'YOPILGAN'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* LIVE SENSORS & TIRE HEAT MAP (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* PIRELLI TIRE THERMAL MATRIX */}
            <div className="bg-[#0d0e13] border border-[#292a2f] p-5 rounded-xl flex flex-col gap-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fabc4d] text-base">donut_large</span>
                  <span className="font-chivo text-sm text-[#e3e1e9] uppercase font-bold">
                    Shina Harorati & Bosimi
                  </span>
                </div>
                <span className="font-mono-telemetry text-[11px] px-2 py-0.5 rounded bg-[#1e1f25] text-[#fabc4d] font-bold border border-[#292a2f]">
                  PIRELLI C3 MEDIUM
                </span>
              </div>

              {/* 4 Tires Visual Layout */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                {/* Front Left */}
                <div className="bg-[#1a1b21] p-3 rounded-lg flex flex-col gap-1 border border-[#292a2f]">
                  <div className="flex justify-between items-center text-xs font-mono-telemetry">
                    <span className="text-[#8b9199]">OLD CHAP (FL)</span>
                    <span className="text-[#ff553d] font-bold">104.2°C</span>
                  </div>
                  <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#fabc4d] to-[#ff553d] h-full w-[88%]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8b9199] font-mono-telemetry">
                    <span>Bosim: 23.5 PSI</span>
                    <span className="text-[#fabc4d]">Optimal</span>
                  </div>
                </div>

                {/* Front Right */}
                <div className="bg-[#1a1b21] p-3 rounded-lg flex flex-col gap-1 border border-[#292a2f]">
                  <div className="flex justify-between items-center text-xs font-mono-telemetry">
                    <span className="text-[#8b9199]">OLD O'NG (FR)</span>
                    <span className="text-[#ff553d] font-bold">106.8°C</span>
                  </div>
                  <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#fabc4d] to-[#ff553d] h-full w-[92%]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8b9199] font-mono-telemetry">
                    <span>Bosim: 23.8 PSI</span>
                    <span className="text-[#ff553d] font-bold">Issiq</span>
                  </div>
                </div>

                {/* Rear Left */}
                <div className="bg-[#1a1b21] p-3 rounded-lg flex flex-col gap-1 border border-[#292a2f]">
                  <div className="flex justify-between items-center text-xs font-mono-telemetry">
                    <span className="text-[#8b9199]">ORQA CHAP (RL)</span>
                    <span className="text-[#fabc4d] font-bold">98.4°C</span>
                  </div>
                  <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                    <div className="bg-[#fabc4d] h-full w-[76%]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8b9199] font-mono-telemetry">
                    <span>Bosim: 21.0 PSI</span>
                    <span className="text-[#fabc4d]">Optimal</span>
                  </div>
                </div>

                {/* Rear Right */}
                <div className="bg-[#1a1b21] p-3 rounded-lg flex flex-col gap-1 border border-[#292a2f]">
                  <div className="flex justify-between items-center text-xs font-mono-telemetry">
                    <span className="text-[#8b9199]">ORQA O'NG (RR)</span>
                    <span className="text-[#fabc4d] font-bold">99.1°C</span>
                  </div>
                  <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                    <div className="bg-[#fabc4d] h-full w-[78%]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8b9199] font-mono-telemetry">
                    <span>Bosim: 21.2 PSI</span>
                    <span className="text-[#fabc4d]">Optimal</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-[#1a1b21] rounded text-center border border-[#292a2f]">
                <span className="font-mono-telemetry text-xs text-[#8b9199]">
                  DEGRADATSIYA: <strong className="text-[#e3e1e9]">14.6% (12 aylanish o'tdi)</strong>
                </span>
              </div>
            </div>

            {/* G-FORCE VECTOR RADAR & PEDALS */}
            <div className="bg-[#0d0e13] border border-[#292a2f] p-5 rounded-xl flex flex-col gap-3 shadow-xl flex-grow justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ff553d] text-base">radar</span>
                  <span className="font-chivo text-sm text-[#e3e1e9] uppercase font-bold">
                    G-Yuklama & Pedallar
                  </span>
                </div>
                <span className="font-mono-telemetry text-xs text-[#8b9199]">PARABOLICA BURILISHI</span>
              </div>

              {/* Compass Radar */}
              <div className="flex items-center justify-around gap-4 py-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full text-[#34343a]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    {/* Animated dynamic dot */}
                    <circle
                      cx={gDotCoords.cx}
                      cy={gDotCoords.cy}
                      r="4.5"
                      fill="#ffb4a7"
                      className="animate-ping opacity-75"
                    />
                    <circle cx={gDotCoords.cx} cy={gDotCoords.cy} r="4" fill="#ff553d" />
                  </svg>
                  <div className="absolute font-mono-telemetry text-[9px] text-[#8b9199] top-1">N (Brake)</div>
                  <div className="absolute font-mono-telemetry text-[9px] text-[#8b9199] bottom-1">S (Accel)</div>
                </div>

                {/* Pedals Bars */}
                <div className="flex flex-col gap-2 flex-1 max-w-[160px]">
                  <div>
                    <div className="flex justify-between font-mono-telemetry text-[11px] mb-1">
                      <span className="text-[#8b9199]">THROTTLE (GAZ)</span>
                      <span className="text-[#fabc4d] font-bold">{throttlePct}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                      <div
                        className="bg-[#fabc4d] h-full transition-all duration-200"
                        style={{ width: `${throttlePct}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono-telemetry text-[11px] mb-1">
                      <span className="text-[#8b9199]">BRAKE (TORMOZ)</span>
                      <span className="text-[#ff553d] font-bold">{brakePct}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                      <div
                        className="bg-[#ff553d] h-full transition-all duration-200"
                        style={{ width: `${brakePct}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono-telemetry text-[11px] mb-1">
                      <span className="text-[#8b9199]">STEERING ANGLE</span>
                      <span className="text-[#e3e1e9] font-bold">+18.4° O'NG</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1e1f25] rounded-full overflow-hidden">
                      <div className="bg-[#e3e1e9] h-full w-[65%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-2 bg-[#1a1b21] rounded font-mono-telemetry border border-[#292a2f]">
                <span className="text-[#8b9199]">ICHKI MOTOR (ICE):</span>
                <span className="text-[#ff553d] font-bold">{activeCar.iceRpm}</span>
                <span className="text-[#8b9199]">TURBO:</span>
                <span className="text-[#fabc4d] font-bold">{activeCar.boostBar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE TELEMETRY GRAPHS SECTION */}
        <div className="w-full bg-[#0d0e13] border border-[#292a2f] p-6 rounded-xl shadow-2xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff553d] text-lg">show_chart</span>
                <h2 className="font-chivo text-2xl text-[#e3e1e9] uppercase font-bold tracking-tight">
                  Telemetriya Grafigi: Tezlik va Tormoz Izlanishi
                </h2>
              </div>
              <span className="font-space text-xs text-[#8b9199]">
                Monza Autodromo Nazionale • Aylanish masofasi: 5,793 metr • Telemetriya Delta Solishtiruvi
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap font-mono-telemetry text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 bg-[#ff553d]"></span>
                <span>RB20 (Verstappen)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 bg-[#fabc4d]"></span>
                <span>SF-24 (Leclerc)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 bg-[#8b9199] border-dashed border-b"></span>
                <span>GPS Benchmark</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative w-full h-64 bg-[#1a1b21] rounded-lg p-4 overflow-hidden flex flex-col justify-between border border-[#292a2f]">
            <div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between font-mono-telemetry text-[10px] text-[#8b9199] pointer-events-none">
              <span>380 km/h</span>
              <span>300 km/h</span>
              <span>200 km/h</span>
              <span>100 km/h</span>
              <span>0 km/h</span>
            </div>

            <svg className="w-full h-full pl-8 pb-4" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <line x1="0" x2="1000" y1="10" y2="10" stroke="#34343a" strokeWidth="0.5" />
              <line x1="0" x2="1000" y1="55" y2="55" stroke="#34343a" strokeWidth="0.5" />
              <line x1="0" x2="1000" y1="100" y2="100" stroke="#34343a" strokeWidth="0.5" />
              <line x1="0" x2="1000" y1="145" y2="145" stroke="#34343a" strokeWidth="0.5" />
              <line x1="0" x2="1000" y1="190" y2="190" stroke="#34343a" strokeWidth="0.5" />

              {/* Dividers */}
              <line x1="220" x2="220" y1="0" y2="200" stroke="#34343a" strokeDasharray="3 3" strokeWidth="0.5" />
              <line x1="450" x2="450" y1="0" y2="200" stroke="#34343a" strokeDasharray="3 3" strokeWidth="0.5" />
              <line x1="720" x2="720" y1="0" y2="200" stroke="#34343a" strokeDasharray="3 3" strokeWidth="0.5" />

              {/* RB20 Line */}
              <path
                d="M 0 45 L 80 18 L 180 20 L 220 170 L 260 160 L 320 60 L 450 165 L 500 50 L 680 25 L 720 155 L 780 140 L 880 30 L 1000 15"
                fill="none"
                stroke="#ff553d"
                strokeWidth="2.8"
              />

              {/* SF-24 Line */}
              <path
                d="M 0 52 L 80 25 L 180 28 L 220 165 L 260 155 L 320 68 L 450 172 L 500 58 L 680 32 L 720 160 L 780 148 L 880 38 L 1000 20"
                fill="none"
                stroke="#fabc4d"
                strokeDasharray="5 2"
                strokeWidth="2"
              />

              <circle cx="680" cy="25" r="5" fill="#ffb4a7" className="animate-pulse" />
            </svg>

            <div className="flex justify-between pl-8 font-mono-telemetry text-[10px] text-[#8b9199]">
              <span>0m (Start/Finish)</span>
              <span>1,200m (Prima Variante)</span>
              <span>2,400m (Curva Grande)</span>
              <span>3,900m (Lesmo 1-2)</span>
              <span>5,200m (Variante Ascari)</span>
              <span>5,793m (Parabolica)</span>
            </div>
          </div>

          {/* Telemetry Insights Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 bg-[#1e1f25] border border-[#292a2f] rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-xs text-[#8b9199]">TEZLIK CHO'QQISI (RETTIFILO)</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#e3e1e9]">362.4 KM/H</span>
              <span className="font-space text-xs text-[#fabc4d]">+3.8 km/h raqiblardan ustun</span>
            </div>
            <div className="p-4 bg-[#1e1f25] border border-[#292a2f] rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-xs text-[#8b9199]">TORMOZLANISH ZONASI (T1)</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#ff553d]">63 METR ICHIDA</span>
              <span className="font-space text-xs text-[#8b9199]">355 km/h dan 75 km/h gacha (1.9 soniyada)</span>
            </div>
            <div className="p-4 bg-[#1e1f25] border border-[#292a2f] rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-xs text-[#8b9199]">O'RTACHA AYLANISH TEZLIGI</span>
              <span className="font-mono-telemetry text-2xl font-bold text-[#fabc4d]">258.94 KM/H</span>
              <span className="font-space text-xs text-[#c1c7cf]">Pol-pozitsiya kutilmasi</span>
            </div>
          </div>
        </div>

        {/* TECHNICAL COMPARISON MATRIX (BOLIDLAR SOLISHTIRUVI) */}
        <div className="w-full bg-[#0d0e13] border border-[#292a2f] p-6 rounded-xl shadow-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="font-chivo text-2xl text-[#e3e1e9] uppercase font-bold tracking-tight">
                2024-2025 F1 Bolidlar Muhandislik Solishtiruv Doskasi
              </h2>
              <p className="font-space text-xs text-[#8b9199]">
                FIA texnik reglamenti va kuch agregatlari (Power Unit) parametri
              </p>
            </div>
            <span className="font-mono-telemetry text-xs text-[#fabc4d] bg-[#1e1f25] border border-[#292a2f] px-3 py-1.5 rounded">
              FIA HOMOLOGATION SPEC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {Object.keys(PADDOCK_CARS).map((carKey) => {
              const car = PADDOCK_CARS[carKey];
              const isSelected = activeCarKey === carKey;
              return (
                <div
                  key={carKey}
                  className={`bg-[#1a1b21] border p-4 rounded-xl flex flex-col justify-between hover:bg-[#292a2f] transition-all group ${
                    isSelected ? 'border-[#ff553d]' : 'border-[#292a2f]'
                  }`}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-start">
                      <span className="font-chivo text-sm text-[#fabc4d] font-bold">{car.title}</span>
                      <span className="font-mono-telemetry text-[11px] text-[#8b9199]">{car.engine}</span>
                    </div>
                    <p className="font-space text-xs text-[#c1c7cf] line-clamp-2">{car.desc}</p>
                  </div>

                  <div className="flex flex-col gap-1.5 my-4 font-mono-telemetry text-xs">
                    <div className="flex justify-between py-1 bg-[#0d0e13] px-2 rounded border border-[#292a2f]/60">
                      <span className="text-[#8b9199]">Kuch:</span>
                      <span className="text-[#e3e1e9] font-bold">{car.power}</span>
                    </div>
                    <div className="flex justify-between py-1 bg-[#0d0e13] px-2 rounded border border-[#292a2f]/60">
                      <span className="text-[#8b9199]">0-100 km/h:</span>
                      <span className="text-[#ff553d] font-bold">{car.accel0100}</span>
                    </div>
                    <div className="flex justify-between py-1 bg-[#0d0e13] px-2 rounded border border-[#292a2f]/60">
                      <span className="text-[#8b9199]">0-200 km/h:</span>
                      <span className="text-[#fabc4d] font-bold">{car.accel0200}</span>
                    </div>
                    <div className="flex justify-between py-1 bg-[#0d0e13] px-2 rounded border border-[#292a2f]/60">
                      <span className="text-[#8b9199]">Og'irlik:</span>
                      <span className="text-[#e3e1e9]">{car.weight}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCarKey(carKey)}
                    className="w-full py-2 rounded bg-[#292a2f] group-hover:bg-[#ff553d] group-hover:text-[#670400] text-[#e3e1e9] font-chivo text-xs uppercase tracking-wider font-bold transition-colors text-center cursor-pointer"
                  >
                    Telemetriyani yuklash
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* HALL OF SPEED & HISTORIC RECORDS WIDGET */}
        <div className="w-full bg-gradient-to-r from-[#0d0e13] via-[#1e1f25] to-[#0d0e13] border border-[#292a2f] p-6 rounded-xl shadow-2xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#fabc4d] text-2xl">trophy</span>
              <div>
                <h3 className="font-chivo text-xl text-[#e3e1e9] uppercase font-bold tracking-tight">
                  F1 Tarixidagi Mutlaq Rekordlar Arxivi
                </h3>
                <p className="font-space text-xs text-[#8b9199]">FIA rasmiy sertifikatlangan cho'qqi natijalari</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono-telemetry text-xs text-[#fabc4d] bg-[#34343a] px-3 py-1 rounded-full border border-[#292a2f]">
              <span className="w-2 h-2 rounded-full bg-[#fabc4d]"></span>
              <span>RASMIY FIA DATALINK</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Record 1 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-4 rounded-xl flex items-center gap-4 hover:border-[#ff553d]/50 transition-colors">
              <div className="p-3 bg-[#ff553d]/20 text-[#ff553d] rounded-lg">
                <span className="material-symbols-outlined text-3xl">timer</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">ENG TEZ PIT-STOP</span>
                <span className="font-chivo text-2xl text-[#ff553d] font-black">1.80 SONIYA</span>
                <span className="font-space text-xs text-[#e3e1e9]">McLaren F1 Team (Qatar GP 2023)</span>
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] mt-0.5">
                  Lando Norris bolidida 4 ta g'ildirak
                </span>
              </div>
            </div>

            {/* Record 2 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-4 rounded-xl flex items-center gap-4 hover:border-[#fabc4d]/50 transition-colors">
              <div className="p-3 bg-[#fabc4d]/20 text-[#fabc4d] rounded-lg">
                <span className="material-symbols-outlined text-3xl">speed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                  ENG YUQORI TEZLIK (V-MAX)
                </span>
                <span className="font-chivo text-2xl text-[#fabc4d] font-black">378.0 KM/H</span>
                <span className="font-space text-xs text-[#e3e1e9]">Valtteri Bottas (Williams FW37)</span>
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] mt-0.5">
                  Baku City Circuit • 2.2km to'g'ri yo'l
                </span>
              </div>
            </div>

            {/* Record 3 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-4 rounded-xl flex items-center gap-4 hover:border-[#dde3eb]/50 transition-colors">
              <div className="p-3 bg-[#ff553d]/20 text-[#ff553d] rounded-lg">
                <span className="material-symbols-outlined text-3xl">rotate_right</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                  ENG TEZ AYLANISH O'RTACHASI
                </span>
                <span className="font-chivo text-2xl text-[#e3e1e9] font-black">264.362 KM/H</span>
                <span className="font-space text-xs text-[#e3e1e9]">Lewis Hamilton (Mercedes W11)</span>
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] mt-0.5">
                  Monza 2020 • Tarixdagi eng tez F1 aylanasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
