import React, { useState, useEffect } from 'react';
import { ALL_CARS } from '../data/carsData';
import { ScreenTab } from '../types';

interface TelemetrySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (carId: string) => void;
  onNavigateTab: (tab: ScreenTab) => void;
}

export const TelemetrySearchModal: React.FC<TelemetrySearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCar,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by parent or opened
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCars = ALL_CARS.filter(
    (car) =>
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase()) ||
      car.engineDesc.toLowerCase().includes(query.toLowerCase()) ||
      car.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#1e1f25] border border-[#292a2f] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0d0e13] border-b border-[#292a2f]">
          <span className="material-symbols-outlined text-[#fabc4d]">search</span>
          <input
            autoFocus
            type="text"
            placeholder="Telemetriya, bolid, rekordchi yoki dvigatel qidiring (masalan, RB20, Chiron, Valkyrie)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#e3e1e9] placeholder-[#8b9199] outline-none font-space"
          />
          <kbd className="font-mono-telemetry text-[11px] bg-[#292a2f] text-[#c1c7cf] px-2 py-0.5 rounded border border-[#5f3e39]/50">
            ESC
          </kbd>
        </div>

        {/* Quick Nav Suggestions */}
        <div className="p-3 bg-[#1a1b21] border-b border-[#292a2f] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8b9199] font-mono-telemetry uppercase text-[10px] shrink-0">
            Tezkor o'tish:
          </span>
          <button
            onClick={() => {
              onNavigateTab('f1-paddock-telemetriya');
              onClose();
            }}
            className="px-2.5 py-1 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] rounded font-mono-telemetry shrink-0 transition-colors"
          >
            F1 Paddock
          </button>
          <button
            onClick={() => {
              onNavigateTab('rekordlar-zali');
              onClose();
            }}
            className="px-2.5 py-1 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] rounded font-mono-telemetry shrink-0 transition-colors"
          >
            Rekordlar Zali
          </button>
          <button
            onClick={() => {
              onNavigateTab('3d-giperkarlar-kolleksiyasi');
              onClose();
            }}
            className="px-2.5 py-1 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] rounded font-mono-telemetry shrink-0 transition-colors"
          >
            Giperkarlar
          </button>
          <button
            onClick={() => {
              onNavigateTab('muhandislik-taqqoslash');
              onClose();
            }}
            className="px-2.5 py-1 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] rounded font-mono-telemetry shrink-0 transition-colors"
          >
            Muhandislik Taqqoslash
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 flex flex-col gap-2">
          {filteredCars.length === 0 ? (
            <div className="py-8 text-center text-[#8b9199] font-mono-telemetry text-xs">
              Hech qanday telemetriya ma'lumoti topilmadi. Boshqa so'z bilan izlang.
            </div>
          ) : (
            filteredCars.map((car) => (
              <div
                key={car.id}
                onClick={() => {
                  onSelectCar(car.id);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-[#121318] hover:bg-[#292a2f] border border-transparent hover:border-[#5f3e39]/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-14 h-10 rounded object-cover border border-[#292a2f]"
                  />
                  <div>
                    <h4 className="font-chivo text-sm text-[#e3e1e9] font-bold group-hover:text-[#fabc4d] transition-colors">
                      {car.name}
                    </h4>
                    <p className="font-mono-telemetry text-[11px] text-[#8b9199]">
                      {car.engineDesc} • {car.powerHp} Ot Kuchi
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold block">
                    {car.topSpeedKmh} KM/H
                  </span>
                  <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">
                    {car.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
