import React, { useState } from 'react';
import { ScreenTab } from '../types';

interface ComparisonDockProps {
  compareList: string[];
  onRemoveCar: (carName: string) => void;
  onClearCompare: () => void;
  onNavigateToCompare: () => void;
  currentTab: ScreenTab;
}

export const ComparisonDock: React.FC<ComparisonDockProps> = ({
  compareList,
  onClearCompare,
  onNavigateToCompare,
  currentTab,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If already on the comparison page and empty, we can keep it compact
  if (compareList.length === 0 && currentTab === 'muhandislik-taqqoslash') {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-4 sm:right-8 z-40 bg-[#0d0e13]/95 backdrop-blur-xl border border-[#292a2f] p-4 rounded-t-xl shadow-2xl transition-all duration-300 max-w-md w-full">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1e1f25]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fabc4d] text-base">
            compare_arrows
          </span>
          <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold">
            Tezkor Taqqoslash Savatchasi
          </span>
          <span className="font-mono-telemetry text-[11px] bg-[#ff553d] text-[#670400] px-1.5 py-0.2 rounded-full font-bold">
            {compareList.length}
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#8b9199] hover:text-[#e3e1e9] transition-colors p-1"
        >
          <span className="material-symbols-outlined text-base">
            {isCollapsed ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>

      {/* Slots Body */}
      {!isCollapsed && (
        <div className="flex flex-col gap-1.5 py-2.5">
          {compareList.length === 0 ? (
            <p className="font-mono-telemetry text-[11px] text-[#8b9199] py-2 text-center">
              Savatchada avtomobil yo'q. Kartalardan "+ Solishtirish" tugmasini bosing.
            </p>
          ) : (
            compareList.map((car, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-[#1a1b21] px-3 py-1.5 rounded border border-[#292a2f]/60"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx % 2 === 0 ? 'bg-[#fabc4d]' : 'bg-[#ff553d]'
                    }`}
                  ></span>
                  <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-medium truncate max-w-[200px]">
                    {car}
                  </span>
                </div>
                <span className="font-mono-telemetry text-[10px] text-[#fabc4d] font-bold uppercase">
                  TAYYOR
                </span>
              </div>
            ))
          )}

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1.5">
            <button
              onClick={onNavigateToCompare}
              className="flex-1 py-2 px-3 rounded bg-[#ff553d] text-[#670400] font-mono-telemetry text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow hover:bg-[#ffb4a7] transition-all"
            >
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>Telemetrik Taqqoslashga O'tish</span>
            </button>
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="p-2 rounded bg-[#1e1f25] hover:bg-[#292a2f] text-[#8b9199] hover:text-[#e3e1e9] transition-colors border border-[#292a2f]"
                title="Tozalash"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
