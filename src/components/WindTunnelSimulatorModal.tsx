import React, { useState } from 'react';
import { ALL_CARS } from '../data/carsData';

interface WindTunnelSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WindTunnelSimulatorModal: React.FC<WindTunnelSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<'rb20' | 'chiron-300' | 'valkyrie-amr-pro'>('rb20');
  const [tunnelSpeedKmh, setTunnelSpeedKmh] = useState<number>(250);
  const [angleDeg, setAngleDeg] = useState<number>(8);
  const [drsActive, setDrsActive] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCar = ALL_CARS.find((c) => c.id === selectedCarId) || ALL_CARS[0];

  // Aerodynamic math based on velocity (v^2 rule)
  const baseDownforce250 = currentCar.downforce250Kg;
  const speedRatio = tunnelSpeedKmh / 250;
  const angleMultiplier = 1 + (angleDeg - 8) * 0.04;
  const drsMultiplier = drsActive ? 0.72 : 1.0;
  
  const liveDownforceKg = Math.round(baseDownforce250 * Math.pow(speedRatio, 2) * angleMultiplier * drsMultiplier);
  
  // Drag force in Newtons
  const baseDragCd = selectedCarId === 'rb20' ? 0.95 : selectedCarId === 'chiron-300' ? 0.36 : 0.65;
  const liveDragCd = (baseDragCd * (drsActive ? 0.78 : 1.0) * (1 + Math.abs(angleDeg - 8) * 0.03)).toFixed(3);
  const liftToDragRatio = (liveDownforceKg / (parseFloat(liveDragCd) * 1100)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#1a1b21] border border-[#292a2f] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0d0e13] border-b border-[#292a2f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-[#ff553d]/20 text-[#ff553d]">
              <span className="material-symbols-outlined text-xl">air</span>
            </span>
            <div>
              <h3 className="font-chivo text-lg text-[#e3e1e9] font-black uppercase tracking-tight">
                3D Shamol Tunneli & Aerodinamik Simulyator
              </h3>
              <p className="font-mono-telemetry text-xs text-[#fabc4d]">
                COMPUTATIONAL FLUID DYNAMICS (CFD) RUNTIME • 1000Hz SENSOR FEED
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Vehicle Selection & Quick Toggles */}
        <div className="px-6 py-3 bg-[#121318] border-b border-[#292a2f] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-telemetry text-xs text-[#8b9199] uppercase">Bolid:</span>
            {(['rb20', 'valkyrie-amr-pro', 'chiron-300'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setSelectedCarId(id)}
                className={`px-3 py-1 rounded text-xs font-mono-telemetry uppercase transition-all ${
                  selectedCarId === id
                    ? 'bg-[#ff553d] text-[#670400] font-bold shadow'
                    : 'bg-[#292a2f] text-[#c1c7cf] hover:text-white'
                }`}
              >
                {id === 'rb20' ? 'Red Bull RB20' : id === 'valkyrie-amr-pro' ? 'Valkyrie AMR' : 'Chiron SS 300+'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrsActive(!drsActive)}
              className={`px-3 py-1 rounded text-xs font-mono-telemetry uppercase transition-all flex items-center gap-1.5 ${
                drsActive
                  ? 'bg-[#fabc4d] text-[#432c00] font-bold shadow'
                  : 'bg-[#292a2f] text-[#c1c7cf] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">open_in_full</span>
              DRS: {drsActive ? 'OCHIQ (-22% DRAG)' : 'YOPILGAN'}
            </button>
          </div>
        </div>

        {/* Tunnel Visual Chamber */}
        <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#090a0f] via-[#121318] to-[#090a0f] flex items-center justify-center overflow-hidden border-b border-[#292a2f]">
          {/* Animated CFD Wind Streamlines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fabc4d" stopOpacity="0.2" />
                <stop offset="40%" stopColor="#ff553d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffb4a7" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Multiple dynamic aero lines */}
            {[60, 100, 140, 180, 220, 260].map((y, idx) => (
              <path
                key={idx}
                d={`M 0 ${y} Q ${250 + idx * 20} ${y - 30 + angleDeg * 2}, ${500 + idx * 10} ${y + 20} T 900 ${y - 10}`}
                fill="none"
                stroke="url(#streamGrad)"
                strokeWidth={idx % 2 === 0 ? '2.5' : '1.5'}
                strokeDasharray={`${8 + (tunnelSpeedKmh / 50)} ${4 + idx}`}
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Car Image with Angle Pitch */}
          <div
            className="relative z-10 transition-transform duration-300"
            style={{ transform: `rotate(${-angleDeg * 0.4}deg)` }}
          >
            <img
              src={currentCar.image}
              alt={currentCar.name}
              className="max-h-52 w-auto object-contain drop-shadow-[0_15px_30px_rgba(255,85,61,0.35)]"
            />
          </div>

          {/* Live Dynamic Telemetry Pins */}
          <div className="absolute top-3 left-3 bg-[#0d0e13]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#292a2f] font-mono-telemetry text-xs">
            <span className="text-[#8b9199] block text-[10px]">DOWNFORCE GENERATION</span>
            <span className="text-[#ff553d] font-bold text-base">{liveDownforceKg.toLocaleString()} KG</span>
          </div>

          <div className="absolute top-3 right-3 bg-[#0d0e13]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#292a2f] font-mono-telemetry text-xs text-right">
            <span className="text-[#8b9199] block text-[10px]">LIFT-TO-DRAG RATIO (L/D)</span>
            <span className="text-[#fabc4d] font-bold text-base">{liftToDragRatio} : 1</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-[#0d0e13]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#292a2f] font-mono-telemetry text-xs">
            <span className="text-[#8b9199] block text-[10px]">DRAG COEFFICIENT</span>
            <span className="text-[#e3e1e9] font-bold">{liveDragCd} Cd</span>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1b21]">
          {/* Speed Control Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-mono-telemetry text-xs">
              <span className="text-[#8b9199] uppercase">Shamol Tunneli Tezligi:</span>
              <span className="text-[#fabc4d] font-bold text-sm">{tunnelSpeedKmh} KM/H</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={tunnelSpeedKmh}
              onChange={(e) => setTunnelSpeedKmh(Number(e.target.value))}
              className="w-full h-2 bg-[#292a2f] rounded-lg appearance-none cursor-pointer accent-[#ff553d]"
            />
            <div className="flex justify-between font-mono-telemetry text-[10px] text-[#8b9199]">
              <span>100 km/h (Past tezlik)</span>
              <span>250 km/h (Etalon)</span>
              <span>500 km/h (V-Max)</span>
            </div>
          </div>

          {/* Wing Angle of Attack */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-mono-telemetry text-xs">
              <span className="text-[#8b9199] uppercase">Qanot Hujum Burchagi (Angle of Attack):</span>
              <span className="text-[#ff553d] font-bold text-sm">+{angleDeg}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={angleDeg}
              onChange={(e) => setAngleDeg(Number(e.target.value))}
              className="w-full h-2 bg-[#292a2f] rounded-lg appearance-none cursor-pointer accent-[#fabc4d]"
            />
            <div className="flex justify-between font-mono-telemetry text-[10px] text-[#8b9199]">
              <span>0° (Past qarshilik)</span>
              <span>8° (Optimal)</span>
              <span>20° (Ekstremal Downforce)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
