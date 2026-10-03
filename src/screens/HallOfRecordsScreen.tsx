import React, { useState } from 'react';
import { SPEED_MILESTONES } from '../data/carsData';
import { exportTelemetryCSV } from '../utils/csvExport';

interface HallOfRecordsScreenProps {
  onOpenWindTunnel: () => void;
}

export const HallOfRecordsScreen: React.FC<HallOfRecordsScreenProps> = ({ onOpenWindTunnel }) => {
  const [sliderSpeed, setSliderSpeed] = useState<number>(490);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [aeroSpeedMode, setAeroSpeedMode] = useState<300 | 450>(450);

  // Match slider speed to milestone
  const currentMilestone =
    SPEED_MILESTONES.find((m) => sliderSpeed <= m.speed) || SPEED_MILESTONES[SPEED_MILESTONES.length - 1];

  const handleDownloadGuinnessData = () => {
    const data: Record<string, string | number>[] = [
      { Run: 'A (Northbound)', Time_Sec: 18.42, Speed_Kmh: 492.05, Ambient_Temp_C: 21.2, Wind_Kmh: 2.1, Notes: 'Optimal Run' },
      { Run: 'B (Southbound)', Time_Sec: 18.51, Speed_Kmh: 488.92, Ambient_Temp_C: 21.4, Wind_Kmh: -1.8, Notes: 'Return Run' },
      { Run: 'Official Average', Time_Sec: 18.46, Speed_Kmh: 490.484, Ambient_Temp_C: 21.3, Wind_Kmh: 0.15, Notes: 'FIA Category A1 Verified' },
    ];
    exportTelemetryCSV('gwr_chiron_300_vmax_dual_run', data);
  };

  const handleOpenCertificate = () => {
    alert(
      "FIA & GUINNESS WORLD RECORD GUVOXNOMASI:\n\nSertifikat ID: #GWR-2023-APEX-490\nAvtomobil: Bugatti Chiron Super Sport 300+\nSinovchi: Andy Wallace\nPoligon: Ehra-Lessien (Germaniya)\nTasdiqlangan Cho'qqi Tezlik: 490.484 km/h (304.773 mph)\nHolati: Homologatsiyalangan va Tasdiqlangan"
    );
  };

  return (
    <div className="flex flex-col w-full text-[#e3e1e9]">
      {/* HERO BANNER / TITAN SPEED CHAMBER */}
      <section className="relative w-full overflow-hidden bg-[#0d0e13] px-4 sm:px-8 lg:px-12 py-10 border-b border-[#1e1f25]">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#ff553d]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-12 w-80 h-80 bg-[#fabc4d]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col gap-6">
          {/* Top HUD status row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#ff553d] animate-ping"></span>
              <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase tracking-widest font-bold">
                GUINNESS WORLD RECORDS™ // FIA V-MAX HOMOLOGATED
              </span>
              <span className="font-mono-telemetry text-[11px] text-[#8b9199] px-2 py-0.5 bg-[#1e1f25] border border-[#292a2f] rounded">
                GPS DUAL-RUN VERIFIED
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-telemetry text-xs text-[#8b9199]">
                STANDART: FIA CATEGORY A1 / OUTRIGHT LAND SPEED
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#292a2f] rounded text-[#fabc4d] font-mono-telemetry text-xs font-semibold border border-[#34343a]">
                <span className="material-symbols-outlined text-sm">lock_open</span>
                ARXIV NO: 009-APEX-APOGEE
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">
                  01 // ABSOLYUT CHEGARALAR
                </span>
                <div className="h-px flex-1 bg-[#292a2f]"></div>
              </div>
              <h1 className="font-chivo text-3xl sm:text-4xl lg:text-5xl font-black text-[#e3e1e9] tracking-tighter uppercase leading-tight">
                GINNESNING RASMIY REKORDCHI AVTOMOBILLARI VA ABSOLYUT CHEGARALAR
              </h1>
              <p className="font-space text-sm sm:text-base text-[#c1c7cf] max-w-3xl leading-relaxed">
                Insoniyat muhandisligining fizik qonunlar bilan to'qnashuvi. Aerodinamik qarshilik, tovush
                to'sig'i va 1600+ ot kuchi quvvati sinovdan o'tgan aerokosmik trassalar va muzey shon-sharaf
                sarhadi.
              </p>
            </div>

            {/* Quick aggregate metric */}
            <div className="lg:col-span-4 bg-[#1e1f25] border border-[#292a2f] p-5 rounded-xl shadow-xl flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                  Yer Ustidagi Mutloq Cho'qqi
                </span>
                <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">MACH 1.020</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-telemetry text-4xl font-black text-[#ff553d]">1,227.98</span>
                <span className="font-mono-telemetry text-sm text-[#e3e1e9] font-bold">KM/H</span>
              </div>
              <div className="h-2 w-full bg-[#0d0e13] rounded-full overflow-hidden border border-[#292a2f]">
                <div className="h-full bg-[#ff553d] rounded-full" style={{ width: '98.4%' }}></div>
              </div>
              <p className="font-space text-xs text-[#8b9199]">
                ThrustSSC tomonidan Qora Qoya sahrosida (Nevada, AQSh) qayd etilgan tovushdan tez dunyo
                rekordi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SPEED SPECTRUM (0 TO 1250+ KM/H) */}
      <section className="w-full bg-[#1a1b21] px-4 sm:px-8 lg:px-12 py-12 border-b border-[#1e1f25]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
                INTERAKTIV DIAGNOSTIKA
              </span>
              <h2 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
                TEZLIK SHKALASI: 0 DAN 1250+ KM/H GACHA
              </h2>
              <p className="font-space text-xs sm:text-sm text-[#c1c7cf]">
                Slayderni suring va har bir tezlik chegarasida insoniyat qanday to'siqlarni parchalab o'tganini
                kuzating.
              </p>
            </div>

            <div className="bg-[#292a2f] border border-[#34343a] px-4 py-2.5 rounded-lg flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">
                  Tanlangan Tezlik Nuqtasi
                </span>
                <span className="font-mono-telemetry text-xl font-bold text-[#fabc4d]">
                  {sliderSpeed.toFixed(2)} KM/H
                </span>
              </div>
              <span className="material-symbols-outlined text-[#fabc4d] text-3xl">electric_meter</span>
            </div>
          </div>

          {/* Spectrum slider chamber */}
          <div className="bg-[#121318] border border-[#292a2f] p-6 rounded-xl shadow-xl flex flex-col gap-6">
            <div className="relative w-full flex justify-between px-2 font-mono-telemetry text-xs text-[#8b9199]">
              <span className="flex flex-col items-start">
                <span className="text-[#e3e1e9] font-bold">0 km/h</span>
                <span>Start</span>
              </span>
              <span className="flex flex-col items-center">
                <span className="text-[#e3e1e9] font-bold">300 km/h</span>
                <span>Superkar Me'yori</span>
              </span>
              <span className="flex flex-col items-center">
                <span className="text-[#fabc4d] font-bold">400 km/h</span>
                <span>Giperkar Elitasi</span>
              </span>
              <span className="flex flex-col items-center">
                <span className="text-[#ff553d] font-bold">490.48 km/h</span>
                <span>300 mph To'sig'i</span>
              </span>
              <span className="flex flex-col items-end">
                <span className="text-[#ff553d] font-black">1227.98 km/h</span>
                <span className="text-[#ff553d]">Mach 1 (Tovush)</span>
              </span>
            </div>

            {/* Slider */}
            <div className="relative w-full py-1">
              <input
                type="range"
                min="0"
                max="1250"
                step="5"
                value={sliderSpeed}
                onChange={(e) => setSliderSpeed(Number(e.target.value))}
                className="w-full h-3 bg-[#292a2f] rounded-lg appearance-none cursor-pointer accent-[#ff553d]"
              />

              {/* Milestone Shortcut Buttons */}
              <div className="flex justify-between w-full mt-3 font-mono-telemetry text-[11px] text-[#8b9199] flex-wrap gap-2">
                <button onClick={() => setSliderSpeed(350)} className="hover:text-[#ff553d] cursor-pointer">
                  350 km/h • F1 Maksimumi
                </button>
                <button onClick={() => setSliderSpeed(412)} className="hover:text-[#fabc4d] cursor-pointer">
                  412 km/h • Rimac EV
                </button>
                <button onClick={() => setSliderSpeed(490)} className="hover:text-[#ff553d] cursor-pointer font-bold">
                  490.48 km/h • Chiron 300+
                </button>
                <button onClick={() => setSliderSpeed(508)} className="hover:text-[#fabc4d] cursor-pointer">
                  508.7 km/h • SSC Tuatara
                </button>
                <button onClick={() => setSliderSpeed(1228)} className="hover:text-[#ff553d] cursor-pointer font-bold">
                  1228 km/h • Mach 1 ThrustSSC
                </button>
              </div>
            </div>

            {/* Active milestone banner output */}
            <div className="bg-[#1e1f25] border border-[#292a2f] p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ff553d]/20 text-[#ff553d] rounded-lg border border-[#ff553d]/30">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                    {currentMilestone.badge}
                  </span>
                  <h3 className="font-chivo text-xl text-[#e3e1e9] font-bold">
                    {currentMilestone.title}
                  </h3>
                  <p className="font-space text-xs text-[#c1c7cf] mt-0.5">{currentMilestone.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2 bg-[#0d0e13] rounded border border-[#292a2f] text-right">
                  <p className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">AERODINAMIK DRAG (Cd)</p>
                  <p className="font-mono-telemetry text-sm text-[#e3e1e9] font-bold">{currentMilestone.cd}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & CATEGORIES ROW */}
      <section className="w-full bg-[#121318] px-4 sm:px-8 lg:px-12 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
              ARXIV VA FILTRLASH
            </span>
            <h2 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
              SHON-SHARAF ZALI: REKORDCHI MASHINALAR
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#0d0e13] p-1 rounded-lg border border-[#292a2f]">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'vmax', label: 'Maksimal Tezlik' },
              { id: 'accel', label: '0-100 & 0-400 Tezlanish' },
              { id: 'electric', label: 'Elektr Rekordlar' },
              { id: 'supersonic', label: 'Supersonic / Mach' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded font-mono-telemetry text-xs uppercase font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#ff553d] text-[#670400] font-bold shadow'
                    : 'text-[#8b9199] hover:text-[#e3e1e9] hover:bg-[#1a1b21]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECORD CARDS & 3D ATELIER TILES */}
      <section className="w-full bg-[#121318] px-4 sm:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CARD 1: BUGATTI CHIRON SUPER SPORT 300+ (FEATURED / HERO CARD) */}
          {(activeCategory === 'all' || activeCategory === 'vmax') && (
            <article className="lg:col-span-8 bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#fabc4d]/50 transition-all">
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCahByfSo_VL0azeOpz7cwbgEjdZdP_OMtameNshij9HSfokGA-DXqtpIssnSDCxtZIMpSiCUkBrbr9AEfRK-3UgDtAl1eXREedtYTodOlu_0PW53zxhq3BOU_Lz4NFGZ95s65AXDKAhLabKofoDOPKoV8eSch3teEC-XHeA7JOfv6ekrRGX_VQlbtemjeoDZYXBtiSdmTf4jCV5ZnYYR4l4qwlMcNBcc7ZhbNwMMNP5QiZvCmMFjH7ZA"
                  alt="Bugatti Chiron Super Sport 300+"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#fabc4d] text-[#432c00] font-mono-telemetry text-xs font-bold uppercase rounded shadow">
                    GINNES RASMIY REKORDI
                  </span>
                  <span className="px-3 py-1 bg-[#0d0e13]/90 text-[#e3e1e9] font-mono-telemetry text-xs uppercase rounded border border-[#292a2f]">
                    EHRA-LESSIEN // FIA DUAL GPS
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                      SERIYALI MASHINALAR TOJI
                    </span>
                    <h3 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase">
                      Bugatti Chiron SS 300+
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-telemetry text-xs text-[#8b9199]">ENG YUQORI TEZLIK</span>
                    <div className="font-mono-telemetry text-3xl font-black text-[#ff553d]">
                      490.48 <span className="text-xs text-[#e3e1e9] font-normal">KM/H</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <p className="font-space text-xs sm:text-sm text-[#c1c7cf] leading-relaxed">
                  Dunyodagi ilk 300 milya/soat to'sig'ini zabt etgan rasmiy seriyali giperkar. Aerodinamik
                  qarshilikni 0.36 Cd ga tushirish uchun "Longtail" (uzun dum) korpusi 25 sm ga uzaytirilgan va
                  maxsus Michelin Pilot Sport Cup 2 tirsaklaridan foydalanilgan.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0e13] p-4 rounded-lg border border-[#292a2f]">
                  <div className="flex flex-col">
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">DVIGATEL</span>
                    <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">8.0L W16 Quad-Turbo</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">QUVVAT</span>
                    <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">1,600 OT KUCHI</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">AYLANISH MOMENTI</span>
                    <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">1,600 Nm @ 2000rpm</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">AERO DUM UZUNLIGI</span>
                    <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">+25 CM LONGTAIL</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#fabc4d] text-lg">speed</span>
                    <span className="font-mono-telemetry text-xs text-[#8b9199]">
                      Sinov Haydovchisi: Endi Uolles (Andy Wallace)
                    </span>
                  </div>
                  <button
                    onClick={onOpenWindTunnel}
                    className="px-4 py-2 bg-[#ff553d] text-[#670400] font-chivo text-xs uppercase font-black rounded hover:bg-[#ffb4a7] transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    3D Telemetriya & Aerodinamika
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* CARD 2: KOENIGSEGG JESKO ABSOLUT */}
          {(activeCategory === 'all' || activeCategory === 'accel') && (
            <article className="lg:col-span-4 bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#fabc4d]/50 transition-all">
              <div className="relative w-full h-64 overflow-hidden bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2UkMg1mcs7fWu8KG6m7TjFn7_ksVrLIrVCdQqjiqNmsh4pxl129ykgKbBSsWsd9xaIBFmkSgmv3Ix3NRg2HNtGeF1KqXqAnO-dxZkPlHxvap355xCVUPrl2dIOnd0d453UwudAKjXz1i6Y9nwUDU-SuDcw2FwVKweESxj0nzdHcgSnB1ObkoHXsQjVoi-3DT35Bqzd7YIiHN6IaBRFepqXICR4a9UXIqhDo6x5c-yY7egx4auME5WXQ"
                  alt="Koenigsegg Jesko Absolut"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#fabc4d] text-[#432c00] font-mono-telemetry text-xs font-bold uppercase rounded shadow">
                    0-400-0 KM/H REKORD
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                    SHVETSIYA MUHANDISLIGI
                  </span>
                  <h3 className="font-chivo text-xl text-[#e3e1e9] font-black uppercase">
                    Koenigsegg Jesko Absolut
                  </h3>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono-telemetry text-xs text-[#8b9199]">0-400-0 KM/H VAQTI:</span>
                  <span className="font-mono-telemetry text-xl font-black text-[#fabc4d]">28.81 SONIYA</span>
                </div>
                <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                  Koenigsegg Regera va Jesko Absolut orqali erishilgan to'xtash va tezlanish kombinatsiyasi. 1600 ot kuchi
                  va 0.278 Cd bilan 530+ km/h hisoblangan.
                </p>

                <div className="bg-[#0d0e13] p-3 rounded flex justify-between border border-[#292a2f]">
                  <div>
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">TRANSMISSIYA</span>
                    <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">LST 9-bosqichli</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">AERODINAMIK CD</span>
                    <p className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">0.278 Cd</p>
                  </div>
                </div>

                <button
                  onClick={onOpenWindTunnel}
                  className="w-full py-2 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-mono-telemetry text-xs uppercase font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-[#34343a]"
                >
                  <span className="material-symbols-outlined text-sm text-[#fabc4d]">hub</span>
                  LST Transmissiya & Tormoz Tahlili
                </button>
              </div>
            </article>
          )}

          {/* CARD 3: THRUSTSSC // ANDY GREEN */}
          {(activeCategory === 'all' || activeCategory === 'supersonic') && (
            <article className="lg:col-span-5 bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#ff553d]/50 transition-all">
              <div className="relative w-full h-64 overflow-hidden bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqFPLagmJ-vdmFUQbyD-HKNvkDvSILZEeiodwwuoVydPrxZu-cFJaoDHnMT1_wIn9UcDrjJNbbOISAiKj0dQURALnYlxU84A8NLr3rPnlf14tGJvNuowZk7FlBO_lVbj1rkARcHuHDqR_Pv-57UdGKg2-Vb8DN3nH1818sFdJL0W4mvNAIC0g7_FRUZlzzzZacXE-KqTLQbDRON-cb4PpRJqSr17vrnuX0BpkbgOvVgn-BzTdN6DfUxw"
                  alt="ThrustSSC Supersonic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#ff553d] text-[#670400] font-mono-telemetry text-xs font-bold uppercase rounded shadow">
                    TOVUSH TO'SIG'I (MACH 1.02)
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold">
                    MUTLOQ YER USTIDAGI REKORD
                  </span>
                  <h3 className="font-chivo text-xl text-[#e3e1e9] font-black uppercase">
                    ThrustSSC // Andy Green
                  </h3>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono-telemetry text-xs text-[#8b9199]">MAKSIMAL TEZLIK:</span>
                  <span className="font-mono-telemetry text-xl font-black text-[#ff553d]">
                    1,227.98 KM/H
                  </span>
                </div>
                <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                  1997-yil 15-oktabrda Qora Qoya sahrosida erishilgan va Ginnes tomonidan tasdiqlangan
                  insoniyat tarixidagi birinchi va yagona tovush to'sig'ini (Supersonic) buzgan yer usti vositasi.
                </p>

                <div className="bg-[#0d0e13] p-3 rounded grid grid-cols-2 gap-2 border border-[#292a2f]">
                  <div>
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">MOTORLAR</span>
                    <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">2x Rolls-Royce Spey</p>
                  </div>
                  <div>
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">TORTISH KUCHI</span>
                    <p className="font-mono-telemetry text-xs text-[#ff553d] font-bold">110,000 HP (equiv)</p>
                  </div>
                </div>

                <button
                  onClick={onOpenWindTunnel}
                  className="w-full py-2 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-mono-telemetry text-xs uppercase font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-[#34343a]"
                >
                  <span className="material-symbols-outlined text-sm text-[#ff553d]">rocket_launch</span>
                  Tovush To'lqini Simulyatsiyasi
                </button>
              </div>
            </article>
          )}

          {/* CARD 4: RIMAC NEVERA EV */}
          {(activeCategory === 'all' || activeCategory === 'electric') && (
            <article className="lg:col-span-4 bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#fabc4d]/50 transition-all">
              <div className="relative w-full h-64 overflow-hidden bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzbQ3FKTSwatP28Xhlbhrbab9E3WGfKL9hV3TR387VeeeUuVVLwPT0uVzQY7m8xb-UlhtL3G6tzmEWp7slxVHuCAdGMfvDS2U7YPiEUp2llFIsPcJSmLap7veSHAbQuZkIdCS5E_Xarqrc4KCSqr0elFPffTMhjgARYNTcLaFrYDb8hnBXNigdPMMf3N6DnWhY0N61yZpIbuCUiROkljwsG4LKVRfBVfZqptwvP-r4cIjs8mpr3C_KIQ"
                  alt="Rimac Nevera EV"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#bd8718] text-[#3a2600] font-mono-telemetry text-xs font-bold uppercase rounded shadow">
                    ELEKTR MUTLOQ CHEMPIONI
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                    23 TA GINNES REKORDI BIR KUNDA
                  </span>
                  <h3 className="font-chivo text-xl text-[#e3e1e9] font-black uppercase">Rimac Nevera EV</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono-telemetry text-xs text-[#8b9199]">0-100 KM/H TEZLANISH:</span>
                  <span className="font-mono-telemetry text-xl font-black text-[#fabc4d]">1.81 SONIYA</span>
                </div>
                <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                  Maksimal tezligi 412 km/h. Shuningdek, orqaga (reverse gear) harakatlanishda dunyodagi eng tez mashina
                  rekordi (275.74 km/h) Ginnes kitobiga rasman kiritilgan.
                </p>

                <div className="bg-[#0d0e13] p-3 rounded grid grid-cols-2 gap-2 border border-[#292a2f]">
                  <div>
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">AKKUMULYATOR</span>
                    <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">120 kWh 800V</p>
                  </div>
                  <div>
                    <span className="font-mono-telemetry text-[10px] text-[#8b9199]">MOTORLAR</span>
                    <p className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">4 Mustaqil EV</p>
                  </div>
                </div>

                <button
                  onClick={onOpenWindTunnel}
                  className="w-full py-2 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-mono-telemetry text-xs uppercase font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-[#34343a]"
                >
                  <span className="material-symbols-outlined text-sm text-[#fabc4d]">bolt</span>
                  Tortuvchi Moment Taqsimoti
                </button>
              </div>
            </article>
          )}

          {/* CARD 5: HENNESSEY VENOM F5 & SSC TUATARA */}
          {(activeCategory === 'all' || activeCategory === 'vmax') && (
            <article className="lg:col-span-3 bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#fabc4d]/50 transition-all">
              <div className="relative w-full h-64 overflow-hidden bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGUCd55jzyTPAex1ldo34fEnou9vqdUR8l9wx7LmVlpzVCrlDrmiFtbYY-2rtPoK5Lr6N0K6B3pa2qjiEXjm2n2DrQif2txG9st34RWHPJT53EJfszR-UoIFjdB3RivB15By9dBhV4Rty-a1d9MtIuYvGhaI-ovWo-Fx_siMSIlavZxynGV_ng_us2p4xVYLAG0UweGc_C8Hv8oYpP3Z9rZgYlIQ9ikth307efa54Ds2L924QCgfgekA"
                  alt="Venom F5 vs Tuatara"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#34343a] text-[#e3e1e9] font-mono-telemetry text-xs font-bold uppercase rounded border border-[#292a2f]">
                    AERODINAMIKA DUELI
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                    AQSh CHEMPIONLARI
                  </span>
                  <h3 className="font-chivo text-xl text-[#e3e1e9] font-black uppercase">Venom F5 // Tuatara</h3>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono-telemetry text-xs text-[#8b9199]">SSC QAYD ETGAN:</span>
                  <span className="font-mono-telemetry text-base font-black text-[#ff553d]">508.7 KM/H*</span>
                </div>
                <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                  Hennessey Venom F5 ("Fury" 6.6L V8, 1817 ot kuchi) va SSC Tuatara o'rtasidagi 500+ km/h chegarasi
                  uchun kurash davom etmoqda.
                </p>

                <div className="bg-[#0d0e13] p-3 rounded border border-[#292a2f]">
                  <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">QARSHILIK KOEFFITSIYENTI</span>
                  <p className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                    SSC: 0.279 Cd // F5: 0.33 Cd
                  </p>
                </div>

                <button
                  onClick={onOpenWindTunnel}
                  className="w-full py-2 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-mono-telemetry text-xs uppercase font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-[#34343a]"
                >
                  <span className="material-symbols-outlined text-sm text-[#fabc4d]">compare_arrows</span>
                  Aero Taqqoslash
                </button>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* 3D X-RAY RENTGEN & AERODYNAMIC DOWNFORCE CHAMBER */}
      <section className="w-full bg-[#0d0e13] px-4 sm:px-8 lg:px-12 py-12 border-b border-[#1e1f25]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-[#fabc4d] rounded-full"></span>
                <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
                  3D X-RAY RENTGEN & AERODINAMIK TAQSIMOT
                </span>
              </div>
              <h2 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase tracking-tight">
                AERODINAMIK SIQISH KUCHI (DOWNFORCE) VA SHASSI BALANSI
              </h2>
              <p className="font-space text-xs sm:text-sm text-[#c1c7cf]">
                300 km/h va 450 km/h tezlikda avtomobil qanotlari, diffuzorlari va havo oqimlarining taqsimoti.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#1e1f25] p-1 rounded-lg border border-[#292a2f]">
              <button
                onClick={() => setAeroSpeedMode(300)}
                className={`px-4 py-1.5 rounded font-mono-telemetry text-xs uppercase font-bold transition-all ${
                  aeroSpeedMode === 300
                    ? 'bg-[#ff553d] text-[#670400] shadow'
                    : 'text-[#8b9199] hover:text-[#e3e1e9]'
                }`}
              >
                300 km/h
              </button>
              <button
                onClick={() => setAeroSpeedMode(450)}
                className={`px-4 py-1.5 rounded font-mono-telemetry text-xs uppercase font-bold transition-all ${
                  aeroSpeedMode === 450
                    ? 'bg-[#ff553d] text-[#670400] shadow'
                    : 'text-[#8b9199] hover:text-[#e3e1e9]'
                }`}
              >
                450 km/h (V-Max)
              </button>
            </div>
          </div>

          {/* Interactive 3D X-Ray Cockpit Frame */}
          <div className="relative bg-[#121318] border border-[#292a2f] rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left HUD Telemetry gauges */}
            <div className="lg:col-span-4 flex flex-col gap-4 z-10">
              <div className="bg-[#292a2f] p-4 rounded-lg flex flex-col gap-1 border border-[#34343a]">
                <div className="flex justify-between font-mono-telemetry text-xs">
                  <span className="text-[#8b9199]">OLD AKS DOWNFORCE</span>
                  <span className="text-[#ff553d] font-bold">
                    {aeroSpeedMode === 300 ? '220 KG' : '420 KG'}
                  </span>
                </div>
                <div className="w-full bg-[#0d0e13] h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#ff553d] transition-all duration-500"
                    style={{ width: aeroSpeedMode === 300 ? '22%' : '42%' }}
                  ></div>
                </div>
                <span className="font-space text-[11px] text-[#c1c7cf] mt-1">
                  Old splitter va g'ildirak orti turbulentlik chiqaruvchi ventilyatsiya kanallari.
                </span>
              </div>

              <div className="bg-[#292a2f] p-4 rounded-lg flex flex-col gap-1 border border-[#34343a]">
                <div className="flex justify-between font-mono-telemetry text-xs">
                  <span className="text-[#8b9199]">ORQA AKS DOWNFORCE</span>
                  <span className="text-[#fabc4d] font-bold">
                    {aeroSpeedMode === 300 ? '480 KG' : '840 KG'}
                  </span>
                </div>
                <div className="w-full bg-[#0d0e13] h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#fabc4d] transition-all duration-500"
                    style={{ width: aeroSpeedMode === 300 ? '48%' : '84%' }}
                  ></div>
                </div>
                <span className="font-space text-[11px] text-[#c1c7cf] mt-1">
                  Aktiv havo tormozi (Airbrake), Venturi tunnellari va massiv uglerod diffuzori.
                </span>
              </div>

              <div className="bg-[#292a2f] p-4 rounded-lg flex flex-col gap-1 border border-[#34343a]">
                <div className="flex justify-between font-mono-telemetry text-xs">
                  <span className="text-[#8b9199]">SHASSI BALANSI (FRONT:REAR)</span>
                  <span className="text-[#e3e1e9] font-bold">
                    {aeroSpeedMode === 300 ? '31% : 69%' : '34% : 66%'}
                  </span>
                </div>
                <p className="font-space text-[11px] text-[#c1c7cf] mt-1">
                  Yuqori tezlikda barqarorlikni ta'minlash uchun aero markaz orqaga surilgan.
                </p>
              </div>
            </div>

            {/* Center 3D X-Ray Canvas */}
            <div className="lg:col-span-8 relative flex flex-col items-center justify-center min-h-[350px]">
              <svg className="w-full h-80 max-h-96" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="windflow2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fabc4d" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#ffb4a7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff553d" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Ground Line */}
                <line x1="40" x2="860" y1="340" y2="340" stroke="#34343a" strokeDasharray="8 8" strokeWidth="2" />

                {/* Hypercar Silhouette Wireframe */}
                <path
                  d="M120 310 C140 270 200 240 280 230 C360 220 440 160 520 160 C640 160 720 220 780 270 L840 280 L840 310 L780 320 L730 320 C720 280 670 280 660 320 L320 320 C310 280 260 280 250 320 L130 320 Z"
                  fill="#1a1b21"
                  stroke="#ffb4a7"
                  strokeWidth="2.5"
                  opacity="0.9"
                />

                {/* Wheels */}
                <circle cx="285" cy="315" r="42" fill="#121318" stroke="#fabc4d" strokeWidth="3" />
                <circle cx="285" cy="315" r="24" stroke="#c1c7cf" strokeDasharray="4 4" strokeWidth="1.5" />
                <circle cx="695" cy="315" r="42" fill="#121318" stroke="#fabc4d" strokeWidth="3" />
                <circle cx="695" cy="315" r="24" stroke="#c1c7cf" strokeDasharray="4 4" strokeWidth="1.5" />

                {/* Engine block */}
                <rect x="520" y="230" width="110" height="50" rx="4" fill="#3a2600" stroke="#fabc4d" strokeWidth="1.5" />
                <text x="532" y="260" fill="#fabc4d" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
                  W16 // 1600 HP
                </text>

                {/* Dynamic Wind Tunnel Streamlines */}
                <path d="M40 140 C200 140 350 170 480 150 C620 130 760 170 860 210" stroke="url(#windflow2)" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 190 C180 190 280 220 400 210 C560 200 700 240 860 280" stroke="url(#windflow2)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M40 260 C150 260 200 250 270 250 C360 250 480 300 860 310" stroke="url(#windflow2)" strokeWidth="2" strokeLinecap="round" />

                {/* Vectors */}
                <path d="M210 190 L210 245 M203 235 L210 245 L217 235" stroke="#ff553d" strokeWidth="3" strokeLinecap="round" />
                <text x="175" y="180" fill="#ffb4a7" fontSize="11" fontFamily="JetBrains Mono">
                  {aeroSpeedMode === 300 ? '220 KG AERO' : '420 KG AERO'}
                </text>

                <path d="M760 140 L760 220 M753 210 L760 220 L767 210" stroke="#fabc4d" strokeWidth="4" strokeLinecap="round" />
                <text x="720" y="130" fill="#fabc4d" fontSize="11" fontFamily="JetBrains Mono">
                  {aeroSpeedMode === 300 ? '480 KG AIRBRAKE' : '840 KG AIRBRAKE'}
                </text>
              </svg>

              <div className="absolute top-2 left-2 bg-[#292a2f]/90 backdrop-blur px-3 py-1 rounded font-mono-telemetry text-xs text-[#8b9199] border border-[#34343a]">
                SIMULYATSIYA: COMPUTATIONAL FLUID DYNAMICS (CFD) RUN #904
              </div>
              <div className="absolute bottom-2 right-2 bg-[#292a2f]/90 backdrop-blur px-3 py-1 rounded font-mono-telemetry text-xs text-[#fabc4d] font-bold border border-[#34343a]">
                TOTAL DOWNFORCE: {aeroSpeedMode === 300 ? '700 KG @ 300 KM/H' : '1,260 KG @ 450 KM/H'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUINNESS OFFICIAL VERIFICATION & FIA JURY PROTOCOLS SECTION */}
      <section className="w-full bg-[#1e1f25] px-4 sm:px-8 lg:px-12 py-12 border-b border-[#292a2f]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
              HAKAMLAR KENGASHI & SERTIFIKATSIYA
            </span>
            <h2 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase">
              GINNES RASMIY PROTOKOLI VA FIA TEKSHIRUVI
            </h2>
            <p className="font-space text-xs sm:text-sm text-[#c1c7cf]">
              Tezlik rekordi shunchaki spidometr ko'rsatkichi emas. Ginnes Jahon Rekordlari va Xalqaro Avtomobil
              Federatsiyasi (FIA) tomonidan tan olinishi uchun quyidagi qat'iy standartlar bajarilishi shart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Criterion 1 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-6 rounded-xl flex flex-col gap-3 shadow-md">
              <div className="w-12 h-12 rounded bg-[#292a2f] flex items-center justify-center text-[#fabc4d]">
                <span className="material-symbols-outlined text-2xl">sync_alt</span>
              </div>
              <h3 className="font-chivo text-lg text-[#e3e1e9] font-bold">Ikki Tomonlama O'rtacha Qoida</h3>
              <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                Shamol va relyef ta'sirini butunlay yo'qotish uchun avtomobil 60 daqiqa ichida bir xil trassada
                ikkala yo'nalishda (Run A va Run B) harakatlanishi shart. Yakuniy rekord ikkala yugurishning matematik
                o'rtacha arifmetigi asosida belgilanadi.
              </p>
              <div className="mt-auto pt-4 font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                FIA Modda 24.2.1 Bo'yicha Majburiy
              </div>
            </div>

            {/* Criterion 2 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-6 rounded-xl flex flex-col gap-3 shadow-md">
              <div className="w-12 h-12 rounded bg-[#292a2f] flex items-center justify-center text-[#ff553d]">
                <span className="material-symbols-outlined text-2xl">satellite_alt</span>
              </div>
              <h3 className="font-chivo text-lg text-[#e3e1e9] font-bold">VBOX GPS Multi-Sputnik</h3>
              <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                Mustaqil Racelogic VBOX 100Hz telemetriya apparaturasi o'rnatiladi. U kamida 14 ta mustaqil harbiy
                sun'iy yo'ldosh signallarini qabul qilib, tezlikni soniyasiga 100 marta o'lchaydi. Xatolik darajasi: 0.1
                km/h dan kam.
              </p>
              <div className="mt-auto pt-4 font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                100Hz Differensial GPS Tekshiruvi
              </div>
            </div>

            {/* Criterion 3 */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-6 rounded-xl flex flex-col gap-3 shadow-md">
              <div className="w-12 h-12 rounded bg-[#292a2f] flex items-center justify-center text-[#fabc4d]">
                <span className="material-symbols-outlined text-2xl">approval</span>
              </div>
              <h3 className="font-chivo text-lg text-[#e3e1e9] font-bold">Homologatsiya & Shinalar</h3>
              <p className="font-space text-xs text-[#c1c7cf] leading-relaxed">
                Avtomobil oddiy yo'llar uchun ruxsat etilgan bo'lishi (Street-legal), yoqilg'i stansiyasidagi standart
                benzinda ishlashi va ommaviy sotuvdagi shinalar (Michelin Cup 2R kabi) bilan jihozlangan bo'lishi kerak.
              </p>
              <div className="mt-auto pt-4 font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">tire_repair</span>
                DOT / E-Mark Sertifikatli Shinalar
              </div>
            </div>
          </div>

          {/* Guinness Certificate Showcase Panel */}
          <div className="bg-[#0d0e13] border border-[#292a2f] p-6 rounded-xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#fabc4d] text-[#432c00] rounded-xl shrink-0">
                <span className="material-symbols-outlined text-4xl">military_tech</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase font-bold">
                  RASMIY HUJJATLASHTIRILGAN GUVOXNOMA
                </span>
                <h4 className="font-chivo text-xl text-[#e3e1e9] font-bold">
                  GWR CERTIFICATE ID: #GWR-2023-APEX-490
                </h4>
                <p className="font-space text-xs text-[#c1c7cf]">
                  Ehra-Lessien poligonida o'rnatilgan 490.484 km/h ko'rsatkichi rasmiy hakamlar va mustaqil TUV vakillari
                  tomonidan imzolangan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={handleOpenCertificate}
                className="px-4 py-2.5 bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] rounded font-mono-telemetry text-xs uppercase transition-colors border border-[#34343a] cursor-pointer"
              >
                FIA Bayonnomasini Ko'rish
              </button>
              <button
                onClick={handleDownloadGuinnessData}
                className="px-5 py-2.5 bg-[#ff553d] text-[#670400] rounded font-mono-telemetry text-xs uppercase font-bold hover:bg-[#ffb4a7] transition-all cursor-pointer shadow"
              >
                GPS Telemetriya CSV Fayllari
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK VENUES / HISTORICAL PROVING GROUNDS */}
      <section className="w-full bg-[#121318] px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
              DUNYONING REKORD POLIGONLARI
            </span>
            <h2 className="font-chivo text-2xl sm:text-3xl text-[#e3e1e9] font-black uppercase">
              TEZLIK CHEGARALARI SINDAN SHONLI TRASSALAR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Track 1: Ehra-Lessien */}
            <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden flex flex-col hover:border-[#ff553d]/40 transition-all">
              <div className="w-full h-48 bg-[#0d0e13] flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCahByfSo_VL0azeOpz7cwbgEjdZdP_OMtameNshij9HSfokGA-DXqtpIssnSDCxtZIMpSiCUkBrbr9AEfRK-3UgDtAl1eXREedtYTodOlu_0PW53zxhq3BOU_Lz4NFGZ95s65AXDKAhLabKofoDOPKoV8eSch3teEC-XHeA7JOfv6ekrRGX_VQlbtemjeoDZYXBtiSdmTf4jCV5ZnYYR4l4qwlMcNBcc7ZhbNwMMNP5QiZvCmMFjH7ZA"
                  alt="Ehra-Lessien"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] to-transparent"></div>
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <span className="font-mono-telemetry text-[11px] text-[#ff553d] uppercase font-bold">
                  GERMANIYA // MAXFIY POLIGON
                </span>
                <h4 className="font-chivo text-lg text-[#e3e1e9] font-bold">Ehra-Lessien (8.7 km to'g'ri yo'l)</h4>
                <p className="font-space text-xs text-[#c1c7cf]">
                  Yerning aylanish egri-bugriligi tufayli trassa boshidan oxiridagi ufq ko'rinmaydi. Bugatti Veyron va Chiron
                  rekordlari maskani.
                </p>
              </div>
            </div>

            {/* Track 2: Black Rock Desert */}
            <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden flex flex-col hover:border-[#ff553d]/40 transition-all">
              <div className="w-full h-48 bg-[#0d0e13] flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqFPLagmJ-vdmFUQbyD-HKNvkDvSILZEeiodwwuoVydPrxZu-cFJaoDHnMT1_wIn9UcDrjJNbbOISAiKj0dQURALnYlxU84A8NLr3rPnlf14tGJvNuowZk7FlBO_lVbj1rkARcHuHDqR_Pv-57UdGKg2-Vb8DN3nH1818sFdJL0W4mvNAIC0g7_FRUZlzzzZacXE-KqTLQbDRON-cb4PpRJqSr17vrnuX0BpkbgOvVgn-BzTdN6DfUxw"
                  alt="Black Rock Desert"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] to-transparent"></div>
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <span className="font-mono-telemetry text-[11px] text-[#ff553d] uppercase font-bold">
                  AQSH // TOVUSH TO'SIG'I VOHASI
                </span>
                <h4 className="font-chivo text-lg text-[#e3e1e9] font-bold">Black Rock Desert (Qora Qoya)</h4>
                <p className="font-space text-xs text-[#c1c7cf]">
                  Qurigan qattiq tuzli ko'l yuzasi. ThrustSSC tomonidan yer ustidagi ilk tovush tezligi (Mach 1.02) zabt
                  etilgan muqaddas hudud.
                </p>
              </div>
            </div>

            {/* Track 3: ATP Papenburg */}
            <div className="bg-[#1e1f25] border border-[#292a2f] rounded-xl overflow-hidden flex flex-col hover:border-[#fabc4d]/40 transition-all">
              <div className="w-full h-48 bg-[#0d0e13] flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzbQ3FKTSwatP28Xhlbhrbab9E3WGfKL9hV3TR387VeeeUuVVLwPT0uVzQY7m8xb-UlhtL3G6tzmEWp7slxVHuCAdGMfvDS2U7YPiEUp2llFIsPcJSmLap7veSHAbQuZkIdCS5E_Xarqrc4KCSqr0elFPffTMhjgARYNTcLaFrYDb8hnBXNigdPMMf3N6DnWhY0N61yZpIbuCUiROkljwsG4LKVRfBVfZqptwvP-r4cIjs8mpr3C_KIQ"
                  alt="ATP Papenburg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] to-transparent"></div>
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <span className="font-mono-telemetry text-[11px] text-[#fabc4d] uppercase font-bold">
                  GERMANIYA // OVAL TRASSA
                </span>
                <h4 className="font-chivo text-lg text-[#e3e1e9] font-bold">ATP Papenburg (4.0 km to'g'ri yo'l)</h4>
                <p className="font-space text-xs text-[#c1c7cf]">
                  Rimac Nevera bir sutkada 23 ta dunyo rekordini va 412 km/h tezlikni yangilagan yuqori darajadagi egilgan
                  oval trassa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
