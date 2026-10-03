import React, { useState } from 'react';
import { ALL_CARS } from '../data/carsData';
import { CarSpecs } from '../types';
import { playEngineRevSound } from '../utils/audioSynth';

interface HypercarsCollectionScreenProps {
  onAddToCompare: (carName: string) => void;
  onSelectCarTelemetry: (carId: string) => void;
  onOpenWindTunnel: () => void;
}

export const HypercarsCollectionScreen: React.FC<HypercarsCollectionScreenProps> = ({
  onAddToCompare,
  onSelectCarTelemetry,
  onOpenWindTunnel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEngine, setSelectedEngine] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(30);
  const [homologation, setHomologation] = useState<'all' | 'track' | 'road'>('all');
  const [audioToast, setAudioToast] = useState<{ show: boolean; title: string }>({ show: false, title: '' });
  const [addedCarName, setAddedCarName] = useState<string | null>(null);

  // Spotlight 3D Orbit state
  const [spotlightRotation, setSpotlightRotation] = useState<number>(0);
  const [showAeroLines, setShowAeroLines] = useState<boolean>(true);

  const handlePlaySound = (car: CarSpecs) => {
    playEngineRevSound(car.soundType);
    setAudioToast({
      show: true,
      title: `${car.name} (${car.engineDesc})`,
    });
    setTimeout(() => {
      setAudioToast({ show: false, title: '' });
    }, 3200);
  };

  const handleAddCompare = (carName: string) => {
    onAddToCompare(carName);
    setAddedCarName(carName);
    setTimeout(() => setAddedCarName(null), 1800);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEngine('all');
    setMaxPrice(30);
    setHomologation('all');
  };

  // Filter cars
  const filteredCars = ALL_CARS.filter((car) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === '' ||
      car.name.toLowerCase().includes(q) ||
      car.brand.toLowerCase().includes(q) ||
      car.engineDesc.toLowerCase().includes(q);

    const matchCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'giperkar' && car.category === 'giperkar') ||
      (selectedCategory === 'f1' && car.category === 'f1') ||
      (selectedCategory === 'track' && car.category === 'track') ||
      (selectedCategory === 'record' && car.category === 'record') ||
      (selectedCategory === 'bespoke' && car.category === 'bespoke');

    const matchEngine = selectedEngine === 'all' || car.engineType === selectedEngine;
    const matchPrice = car.priceUsdMillion <= maxPrice;

    return matchSearch && matchCategory && matchEngine && matchPrice;
  });

  return (
    <div className="flex flex-col w-full text-[#e3e1e9]">
      {/* Audio Rev Simulation Toast */}
      {audioToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-[#0d0e13]/95 backdrop-blur-xl border border-[#ff553d]/50 px-6 py-3.5 rounded-full shadow-[0_0_30px_rgba(255,85,61,0.35)] flex items-center gap-4 transition-all duration-300 animate-bounce">
          <div className="p-2 bg-[#ff553d] text-[#670400] rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-lg">graphic_eq</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-telemetry text-[11px] text-[#fabc4d] uppercase font-bold">
              APEX AUDIO REV • 96kHz TELEMETRIYA
            </span>
            <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
              {audioToast.title}
            </span>
          </div>
          <div className="flex items-center gap-1 h-6">
            <span className="w-1 bg-[#ff553d] rounded-full animate-bounce h-3"></span>
            <span className="w-1 bg-[#fabc4d] rounded-full animate-bounce h-5"></span>
            <span className="w-1 bg-[#ff553d] rounded-full animate-bounce h-2"></span>
            <span className="w-1 bg-[#fabc4d] rounded-full animate-bounce h-6"></span>
            <span className="w-1 bg-[#ff553d] rounded-full animate-bounce h-4"></span>
          </div>
        </div>
      )}

      {/* Paddock Telemetry Bar & Archive Header */}
      <div className="w-full bg-[#0d0e13] px-4 sm:px-8 lg:px-12 py-6 border-b border-[#1e1f25]">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff553d] animate-ping"></span>
              <span className="font-mono-telemetry text-xs text-[#fabc4d] uppercase tracking-widest font-bold">
                APEX ARCHIVE // REGISTRY V5.2
              </span>
              <span className="font-mono-telemetry text-[11px] text-[#8b9199] px-2 py-0.5 bg-[#1e1f25] border border-[#292a2f] rounded">
                FIA & HOMOLOGATED DB
              </span>
            </div>
            <div className="flex items-baseline gap-4 flex-wrap">
              <h1 className="font-chivo text-3xl sm:text-4xl lg:text-5xl font-black text-[#e3e1e9] tracking-tighter uppercase leading-none">
                3D GIPERKARLAR KOLLEKSIYASI
              </h1>
              <span className="font-mono-telemetry text-2xl font-bold text-[#ff553d]">248 AVTOMOBIL</span>
            </div>
            <p className="font-space text-sm sm:text-base text-[#c1c7cf] max-w-3xl">
              F1 bolidlari, jahon tezlik rekordchilari hamda dunyodagi eng noyob trek-prototiplarining interaktiv
              3D telemetriyasi, dvigatel akkustikasi va aerodinamik xaritalari.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#1a1b21] p-3 rounded-xl border border-[#292a2f]">
            <div className="flex flex-col px-3 py-1.5 bg-[#1e1f25] rounded border border-[#292a2f]">
              <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">O'rtacha Quvvat</span>
              <span className="font-mono-telemetry text-sm text-[#fabc4d] font-bold">1,280+ OT</span>
            </div>
            <div className="flex flex-col px-3 py-1.5 bg-[#1e1f25] rounded border border-[#292a2f]">
              <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Maksimal V-Max</span>
              <span className="font-mono-telemetry text-sm text-[#ff553d] font-bold">490.48 KM/S</span>
            </div>
            <div className="flex flex-col px-3 py-1.5 bg-[#1e1f25] rounded border border-[#292a2f] col-span-2 sm:col-span-1">
              <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Arxiv Qimmati</span>
              <span className="font-mono-telemetry text-sm text-[#e3e1e9] font-bold">$1.42B USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtration & Engine Specs Deck */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-4 bg-[#1a1b21] border-b border-[#1e1f25] shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Search & Category Pills */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <div className="flex items-center gap-3 bg-[#0d0e13] px-3.5 py-2.5 rounded-lg border border-[#292a2f]">
                <span className="material-symbols-outlined text-[#fabc4d] text-lg">search</span>
                <input
                  type="text"
                  placeholder="Model, brend yoki shassi kodi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-[#e3e1e9] placeholder-[#8b9199] w-full outline-none font-space"
                />
                <kbd className="font-mono-telemetry text-[10px] bg-[#292a2f] text-[#8b9199] px-1.5 py-0.5 rounded border border-[#34343a]">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="lg:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'Hammasi (248)', icon: 'dashboard' },
                { id: 'giperkar', label: 'Giperkarlar' },
                { id: 'f1', label: 'F1 Bolidlari' },
                { id: 'track', label: 'Trek Prototip' },
                { id: 'record', label: 'Ginnes Rekordchilari' },
                { id: 'bespoke', label: 'Bespoke / Ultra-Noyob' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded font-mono-telemetry text-xs uppercase font-bold tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#ff553d] text-[#670400] shadow'
                      : 'bg-[#1e1f25] text-[#8b9199] hover:text-[#e3e1e9] border border-[#292a2f]'
                  }`}
                >
                  {cat.icon && <span className="material-symbols-outlined text-sm">{cat.icon}</span>}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Technical Matrix Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
            {/* Engine Architecture Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono-telemetry text-xs text-[#8b9199] uppercase flex items-center justify-between">
                <span>Dvigatel Arxitekturasi</span>
                <span className="text-[#fabc4d] text-[10px]">V12 • W16 • HYBRID</span>
              </label>
              <select
                value={selectedEngine}
                onChange={(e) => setSelectedEngine(e.target.value)}
                className="bg-[#0d0e13] text-[#e3e1e9] border border-[#292a2f] font-mono-telemetry text-xs p-2.5 rounded-lg outline-none cursor-pointer"
              >
                <option value="all">Barcha Dvigatellar (Atmosfera, Turbo, Gibrid)</option>
                <option value="v12">V12 Atmosferali (Cosworth / Ferrari 6.5L)</option>
                <option value="w16">W16 8.0L Quad-Turbo (Bugatti Molsheim)</option>
                <option value="v8tt">V8 Twin-Turbo Flat-Plane (McLaren / Koenigsegg)</option>
                <option value="f1hybrid">F1 V6 1.6L Turbo-Hybrid (MGU-K / MGU-H)</option>
                <option value="electric">Sof Elektr 4-Motor (Rimac All-Wheel Torque)</option>
              </select>
            </div>

            {/* Price Range Filter Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono-telemetry text-xs text-[#8b9199] uppercase">
                <span>Narx Oralig'i:</span>
                <span className="text-[#fabc4d] font-bold">$1M - ${maxPrice}M</span>
              </div>
              <div className="flex items-center gap-3 py-1">
                <span className="font-mono-telemetry text-[11px] text-[#8b9199]">$1M</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#fabc4d] bg-[#292a2f] h-1.5 rounded cursor-pointer"
                />
                <span className="font-mono-telemetry text-[11px] text-[#fabc4d] font-bold">$30M</span>
              </div>
            </div>

            {/* Homologation Mode Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono-telemetry text-xs text-[#8b9199] uppercase flex items-center justify-between">
                <span>Homologatsiya Holati</span>
                <span className="text-[#ff553d] text-[10px]">FIA SPEC</span>
              </label>
              <div className="grid grid-cols-2 gap-1 bg-[#0d0e13] p-1 rounded-lg border border-[#292a2f]">
                <button
                  onClick={() => setHomologation('road')}
                  className={`px-2 py-1 rounded text-center font-mono-telemetry text-xs uppercase font-semibold transition-all ${
                    homologation === 'road'
                      ? 'bg-[#292a2f] text-[#e3e1e9]'
                      : 'text-[#8b9199] hover:text-[#e3e1e9]'
                  }`}
                >
                  Trek / Shosse
                </button>
                <button
                  onClick={() => setHomologation('track')}
                  className={`px-2 py-1 rounded text-center font-mono-telemetry text-xs uppercase font-semibold transition-all ${
                    homologation === 'track'
                      ? 'bg-[#292a2f] text-[#e3e1e9]'
                      : 'text-[#8b9199] hover:text-[#e3e1e9]'
                  }`}
                >
                  Musobaqa Faqat
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-center gap-3 pt-2 xl:pt-4">
              <button
                onClick={handleResetFilters}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#1e1f25] hover:bg-[#292a2f] border border-[#292a2f] font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span> Filtrlarni tiklash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-10 flex flex-col gap-10 max-w-7xl mx-auto">
        {/* Active Spotlight / Master 3D Hypercar Stage (Bugatti Bolide) */}
        <div className="relative w-full rounded-2xl bg-[#0d0e13] border border-[#292a2f] overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col xl:flex-row gap-8 items-center">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff553d]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#fabc4d]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* 3D Viewport Visual */}
          <div className="relative w-full xl:w-7/12 h-[380px] sm:h-[450px] bg-[#1a1b21] rounded-xl overflow-hidden flex flex-col justify-between p-4 group border border-[#292a2f]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAh2Httq2HNe9tQmwxafZUWlIYFhbCjHfJeuTN0yEU3wtFH64kAqDV1ChYl0D_SfqDGNdNrJdFPJGQXpx1bVHLhtJtHKwuxCmihWghUpU-1QbhC0Yz1vsKdNnet1cTZGyoNuTXgQSGAU9Z9rr9YqfIKX8oCvPyiBPkSyGXgMuYVBDywCuq8CLhbQL6GnQZdT6ZxGkmUpL1bE4xVluF8ZGXUiMD4ELfNF5qJsZYQFFD4e4bCQkgrVxtJyA')",
                transform: `rotate(${spotlightRotation}deg) scale(1.02)`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] via-[#0d0e13]/30 to-transparent"></div>

            {/* Simulated Aero Streamlines on 3D stage */}
            {showAeroLines && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 350">
                <path
                  d="M 50 140 Q 200 110, 350 130 T 580 120"
                  fill="none"
                  stroke="#ff553d"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
                <path
                  d="M 80 200 Q 240 230, 400 190 T 560 180"
                  fill="none"
                  stroke="#fabc4d"
                  strokeWidth="1.5"
                  strokeDasharray="10 3"
                />
              </svg>
            )}

            {/* Viewport Top Bar */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 bg-[#0d0e13]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#292a2f]">
                <span className="w-2 h-2 rounded-full bg-[#fabc4d] animate-pulse"></span>
                <span className="font-mono-telemetry text-xs text-[#e3e1e9] uppercase font-bold">
                  INTERAKTIV 3D CANVAS • 60 FPS
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSpotlightRotation((prev) => prev + 15)}
                  className="p-1.5 rounded bg-[#0d0e13]/90 backdrop-blur-md text-[#e3e1e9] hover:text-[#ff553d] transition-colors border border-[#292a2f] cursor-pointer"
                  title="360 Orbit"
                >
                  <span className="material-symbols-outlined text-base">360</span>
                </button>
                <button
                  onClick={() => setShowAeroLines(!showAeroLines)}
                  className="p-1.5 rounded bg-[#0d0e13]/90 backdrop-blur-md text-[#e3e1e9] hover:text-[#fabc4d] transition-colors border border-[#292a2f] cursor-pointer"
                  title="Aerodinamik oqim xaritasi"
                >
                  <span className="material-symbols-outlined text-base">air</span>
                </button>
                <button
                  onClick={onOpenWindTunnel}
                  className="p-1.5 rounded bg-[#0d0e13]/90 backdrop-blur-md text-[#e3e1e9] hover:text-[#ff553d] transition-colors border border-[#292a2f] cursor-pointer"
                  title="To'liq ekranga yoyish"
                >
                  <span className="material-symbols-outlined text-base">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Viewport Bottom Controls */}
            <div className="relative z-10 flex items-end justify-between flex-wrap gap-2">
              <div className="flex flex-col gap-1 bg-[#0d0e13]/90 backdrop-blur-md p-3 rounded max-w-xs border border-[#292a2f]">
                <span className="font-mono-telemetry text-[10px] text-[#fabc4d] uppercase font-bold">
                  Shassi Arxitekturasi
                </span>
                <p className="font-space text-xs text-[#e3e1e9]">
                  LMP1 darajasidagi monokok uglerod tolasi • Quruq og'irlik: 1,240 kg
                </p>
              </div>

              <button
                onClick={() => {
                  playEngineRevSound('w16');
                  setAudioToast({
                    show: true,
                    title: 'Bugatti Bolide (8.0L Quad-Turbo W16)',
                  });
                  setTimeout(() => setAudioToast({ show: false, title: '' }), 3200);
                }}
                className="px-4 py-2 bg-[#ff553d] text-[#670400] rounded font-mono-telemetry text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-lg hover:bg-[#ffb4a7] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
                <span>W16 8.0L Tovushini Tinglash</span>
              </button>
            </div>
          </div>

          {/* Spotlight Technical Dossier & Telemetry */}
          <div className="w-full xl:w-5/12 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-telemetry text-xs text-[#ff553d] uppercase font-bold bg-[#ff553d]/15 border border-[#ff553d]/30 px-3 py-1 rounded">
                TREK EKSTREMAL SPOTLIGHT
              </span>
              <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">
                REKORD: NURBURGRING 5:23.1
              </span>
            </div>

            <div>
              <h3 className="font-chivo text-3xl font-black text-[#e3e1e9] tracking-tight uppercase leading-none">
                BUGATTI BOLIDE TRACK-ONLY
              </h3>
              <p className="font-mono-telemetry text-xs text-[#fabc4d] pt-2 font-semibold">
                8.0L Quad-Turbocharged W16 • 1,850 OT • 1,850 NM
              </p>
            </div>

            <p className="font-space text-xs sm:text-sm text-[#c1c7cf] leading-relaxed">
              Ettalonsimon og'irlik-quvvat nisbatiga (0.67 kg/ot) ega mutlaq aerodinamik hayvon. 320 km/soat tezlikda
              3,000 kg dan ortiq vertikal bosim hosil qiluvchi faol qanotlar va titandan 3D bosilgan havo diffuzorlari.
            </p>

            {/* Metric Gauges Quad */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-[#1e1f25] border border-[#292a2f] p-3 rounded-lg flex flex-col">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">0-100 KM/S</span>
                <span className="font-mono-telemetry text-lg font-bold text-[#fabc4d]">2.17 sek</span>
              </div>
              <div className="bg-[#1e1f25] border border-[#292a2f] p-3 rounded-lg flex flex-col">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">0-300 KM/S</span>
                <span className="font-mono-telemetry text-lg font-bold text-[#ff553d]">7.37 sek</span>
              </div>
              <div className="bg-[#1e1f25] border border-[#292a2f] p-3 rounded-lg flex flex-col">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">V-MAX</span>
                <span className="font-mono-telemetry text-lg font-bold text-[#e3e1e9]">501 km/s</span>
              </div>
              <div className="bg-[#1e1f25] border border-[#292a2f] p-3 rounded-lg flex flex-col">
                <span className="font-mono-telemetry text-[10px] text-[#8b9199] uppercase">Narxi</span>
                <span className="font-mono-telemetry text-lg font-bold text-[#fabc4d]">$4.4M</span>
              </div>
            </div>

            {/* Telemetry Bar Graph */}
            <div className="bg-[#1a1b21] border border-[#292a2f] p-3 rounded-lg flex flex-col gap-1">
              <div className="flex items-center justify-between font-mono-telemetry text-xs">
                <span className="text-[#8b9199] uppercase">Aero Bosim & Quvvat Taqsimoti (SPA Raidillon)</span>
                <span className="text-[#ff553d] font-bold">2.8G YON BOSIM</span>
              </div>
              <div className="w-full h-8 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 32" preserveAspectRatio="none">
                  <path
                    d="M0,30 L30,28 L60,22 L90,25 L120,15 L150,18 L180,6 L210,10 L240,3 L270,8 L300,1"
                    fill="none"
                    stroke="#ff553d"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,32 L30,30 L60,26 L90,28 L120,20 L150,22 L180,12 L210,16 L240,8 L270,12 L300,4 L300,32 L0,32 Z"
                    fill="rgba(255,85,61,0.15)"
                  />
                </svg>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleAddCompare('Bugatti Bolide (1,850 OT)')}
                className="flex-1 py-2.5 px-4 rounded bg-[#1e1f25] hover:bg-[#292a2f] text-[#e3e1e9] font-mono-telemetry text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#292a2f] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-[#fabc4d]">compare_arrows</span>
                <span>
                  {addedCarName === 'Bugatti Bolide (1,850 OT)' ? "✓ Qo'shildi" : "Solishtirishga Qo'shish"}
                </span>
              </button>
              <button
                onClick={onOpenWindTunnel}
                className="py-2.5 px-4 rounded bg-[#ff553d] text-[#670400] font-mono-telemetry text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow hover:bg-[#ffb4a7] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">view_in_ar</span>
                <span>3D Studio Rejimiga O'tish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicles Showcase Grid */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fabc4d] text-2xl">garage</span>
              <h3 className="font-chivo text-2xl text-[#e3e1e9] uppercase font-bold tracking-tight">
                Katalogdagi Eng Mashhur Ekzemplyarlar
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono-telemetry text-xs text-[#8b9199]">Ko'rinish:</span>
              <button className="p-1 rounded bg-[#292a2f] text-[#e3e1e9] border border-[#34343a]">
                <span className="material-symbols-outlined text-sm">grid_view</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="flex flex-col bg-[#1a1b21] border border-[#292a2f] rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl hover:border-[#fabc4d]/50 transition-all duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#0d0e13]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-transparent to-transparent"></div>
                  {car.badge && (
                    <span className="absolute top-3 left-3 font-mono-telemetry text-[10px] px-2.5 py-0.5 rounded bg-[#0d0e13]/90 text-[#fabc4d] uppercase font-bold border border-[#292a2f]">
                      {car.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={() => onSelectCarTelemetry(car.id)}
                      className="p-1.5 rounded-full bg-[#0d0e13]/80 backdrop-blur text-white hover:text-[#ff553d] transition-colors border border-[#292a2f] cursor-pointer"
                      title="3D Ko'rik"
                    >
                      <span className="material-symbols-outlined text-base">3d_rotation</span>
                    </button>
                    <button
                      onClick={() => handlePlaySound(car)}
                      className="p-1.5 rounded-full bg-[#0d0e13]/80 backdrop-blur text-white hover:text-[#fabc4d] transition-colors border border-[#292a2f] cursor-pointer"
                      title="Dvigatel Ovozini Tinglash"
                    >
                      <span className="material-symbols-outlined text-base">volume_up</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-telemetry text-[11px] text-[#8b9199] uppercase">
                        {car.brand} • {car.location}
                      </span>
                      <span className="font-mono-telemetry text-[11px] text-[#ff553d] font-bold">
                        {car.subBadge || `${car.powerHp} OT`}
                      </span>
                    </div>
                    <h4 className="font-chivo text-xl text-[#e3e1e9] font-black tracking-tight mt-0.5">
                      {car.name}
                    </h4>
                    <p className="font-space text-xs text-[#c1c7cf] line-clamp-2 pt-1">{car.desc}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#0d0e13] p-2.5 rounded border border-[#292a2f]">
                    <div className="flex flex-col text-center">
                      <span className="font-mono-telemetry text-[10px] text-[#8b9199]">0-100</span>
                      <span className="font-mono-telemetry text-xs text-[#fabc4d] font-bold">
                        {car.accel0100}s
                      </span>
                    </div>
                    <div className="flex flex-col text-center">
                      <span className="font-mono-telemetry text-[10px] text-[#8b9199]">Quvvat</span>
                      <span className="font-mono-telemetry text-xs text-[#e3e1e9] font-bold">
                        {car.powerHp} OT
                      </span>
                    </div>
                    <div className="flex flex-col text-center">
                      <span className="font-mono-telemetry text-[10px] text-[#8b9199]">Narx</span>
                      <span className="font-mono-telemetry text-xs text-[#ff553d] font-bold">
                        ${car.priceUsdMillion}M
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAddCompare(`${car.name} (${car.powerHp} OT)`)}
                      className="flex-1 py-1.5 rounded bg-[#1e1f25] hover:bg-[#292a2f] text-[#e3e1e9] font-mono-telemetry text-xs uppercase font-semibold transition-colors border border-[#292a2f] cursor-pointer"
                    >
                      {addedCarName === `${car.name} (${car.powerHp} OT)` ? "✓ Qo'shildi" : "+ Solishtirish"}
                    </button>
                    <button
                      onClick={() => onSelectCarTelemetry(car.id)}
                      className="px-4 py-1.5 rounded bg-[#ff553d] text-[#670400] font-mono-telemetry text-xs uppercase font-bold shadow hover:bg-[#ffb4a7] transition-colors cursor-pointer"
                    >
                      Telemetriya
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Radar */}
          <div className="w-full flex flex-col items-center justify-center pt-8 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff553d] animate-ping"></span>
              <span className="font-mono-telemetry text-xs text-[#8b9199] uppercase tracking-widest">
                ARXIV STATUS: 248 TIKLANMOQDA • SAHIFA 1 / 28
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-9 h-9 rounded bg-[#1e1f25] border border-[#292a2f] flex items-center justify-center text-[#8b9199] hover:text-[#e3e1e9] transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-9 h-9 rounded bg-[#ff553d] text-[#670400] font-mono-telemetry text-xs font-bold">
                1
              </button>
              <button className="w-9 h-9 rounded bg-[#1e1f25] border border-[#292a2f] text-[#e3e1e9] hover:bg-[#292a2f] font-mono-telemetry text-xs">
                2
              </button>
              <button className="w-9 h-9 rounded bg-[#1e1f25] border border-[#292a2f] text-[#e3e1e9] hover:bg-[#292a2f] font-mono-telemetry text-xs">
                3
              </button>
              <span className="px-2 text-[#8b9199] font-mono-telemetry text-xs">...</span>
              <button className="w-9 h-9 rounded bg-[#1e1f25] border border-[#292a2f] text-[#e3e1e9] hover:bg-[#292a2f] font-mono-telemetry text-xs">
                28
              </button>
              <button className="w-9 h-9 rounded bg-[#1e1f25] border border-[#292a2f] flex items-center justify-center text-[#8b9199] hover:text-[#e3e1e9] transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
