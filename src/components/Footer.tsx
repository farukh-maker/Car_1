import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d0e13] text-[#c1c7cf] border-t border-[#1e1f25] py-6 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {/* Track Conditions */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1e1f25] rounded border border-[#292a2f] text-[#fabc4d]">
            <span className="material-symbols-outlined text-lg">speed</span>
          </div>
          <div>
            <p className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase tracking-wider">
              Track Conditions
            </p>
            <p className="font-mono-telemetry text-[13px] text-[#e3e1e9] font-semibold">
              SPA-FRANCORCHAMPS • 34.2°C TRACK / 21.8°C AIR
            </p>
          </div>
        </div>

        {/* Aero & Tunnel Telemetry */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1e1f25] rounded border border-[#292a2f] text-[#ff553d]">
            <span className="material-symbols-outlined text-lg">air</span>
          </div>
          <div>
            <p className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase tracking-wider">
              Aero & Tunnel Telemetry
            </p>
            <p className="font-mono-telemetry text-[13px] text-[#e3e1e9] font-semibold">
              TUNNEL RUN #849 • DOWNFORCE: 1420KG @ 250KM/H
            </p>
          </div>
        </div>

        {/* FIA Homologation */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1e1f25] rounded border border-[#292a2f] text-[#fabc4d]">
            <span className="material-symbols-outlined text-lg">verified</span>
          </div>
          <div>
            <p className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase tracking-wider">
              FIA Homologation
            </p>
            <p className="font-mono-telemetry text-[13px] text-[#e3e1e9] font-semibold">
              V-MAX CERTIFIED • 490.484 KM/H VERIFIED
            </p>
          </div>
        </div>

        {/* Accreditations */}
        <div className="flex items-center sm:justify-end gap-2.5 flex-wrap">
          <span className="font-mono-telemetry text-[11px] bg-[#1e1f25] border border-[#292a2f] px-3 py-1.5 rounded text-[#fabc4d] uppercase font-bold tracking-wider">
            FIA SPEED ACCREDITED
          </span>
          <span className="font-mono-telemetry text-[11px] bg-[#1e1f25] border border-[#292a2f] px-3 py-1.5 rounded text-[#8b9199] uppercase">
            © 2024 APEX SYSTEM
          </span>
        </div>
      </div>
    </footer>
  );
};
