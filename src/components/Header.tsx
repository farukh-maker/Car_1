import React from 'react';
import { ScreenTab } from '../types';

interface HeaderProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenSearch }) => {
  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'f1-paddock-telemetriya', label: 'F1 Paddock & Telemetriya' },
    { id: 'rekordlar-zali', label: 'Rekordlar Zali (Hall of Records)' },
    { id: '3d-giperkarlar-kolleksiyasi', label: '3D Giperkarlar Kolleksiyasi' },
    { id: 'muhandislik-taqqoslash', label: 'Muhandislik Taqqoslash' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#121318]/90 backdrop-blur-xl border-b border-[#292a2f]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Live Pitwall Indicator */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectTab('f1-paddock-telemetriya')}
          >
            <img
              alt="Apex F1 & Speed Records Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAHFJM1TnnI07jnHAwfe85d_28ZqCWakoVjhtZ5rS-L_5sBIj_LhkTgRDigwAFfXjWljEtZaovBu3KVsPxnTMAeGz8tVMODXHcdtp6rFNPp1o-8Z08J23N7z9EeS21BGFT7hc9TUqEsOt2hX1pnb8ZStwAid1BM3ro49DQJuScWbJ9f3iIbUgj-jZHdapt0-Ts3jT0ptm2JTi3LqCDXzYiJwY_-sidFC0v4B69SZguxM6vE5SCdTBbFQ"
            />
            <div className="flex flex-col">
              <span className="font-chivo text-2xl font-black text-[#e3e1e9] tracking-tighter leading-none">
                APEX
              </span>
              <span className="font-mono-telemetry text-[10px] text-[#fabc4d] uppercase tracking-[0.2em]">
                Pantheon v4.8
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#0d0e13] border border-[#292a2f]/80 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ff553d] animate-pulse"></span>
            <span className="font-mono-telemetry text-[11px] font-medium text-[#e3e1e9] uppercase tracking-wider">
              LIVE PIT WALL • 1000Hz FEED
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0d0e13]/90 p-1.5 rounded-lg border border-[#292a2f]/60">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#292a2f] text-[#e3e1e9] shadow-sm border border-[#5f3e39]/30 text-white'
                    : 'text-[#c1c7cf] hover:bg-[#1e1f25] hover:text-[#e3e1e9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Profile */}
        <div className="flex items-center gap-4">
          {/* Telemetry Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 bg-[#1a1b21] hover:bg-[#292a2f] border border-[#292a2f] px-3.5 py-1.5 rounded-lg text-[#c1c7cf] hover:text-[#e3e1e9] transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#fabc4d] group-hover:scale-110 transition-transform">
              search
            </span>
            <span className="font-space text-xs hidden sm:inline">Telemetry Search</span>
            <kbd className="font-mono-telemetry text-[10px] bg-[#34343a] text-[#c1c7cf] px-1.5 py-0.5 rounded border border-[#5f3e39]/40">
              ⌘K
            </kbd>
          </button>

          {/* Engineer Profile */}
          <div className="flex items-center gap-3 pl-1">
            <div className="text-right hidden sm:flex flex-col">
              <span className="font-space text-xs text-[#e3e1e9] font-bold leading-tight">
                Race Engineer
              </span>
              <span className="font-mono-telemetry text-[10px] text-[#fabc4d] uppercase tracking-wider">
                Paddock Lead
              </span>
            </div>
            <div className="relative group cursor-pointer">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#fabc4d]/50 group-hover:border-[#fabc4d] transition-all shadow-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJI0DTNTcuTNo0MF0LOi1A0SNmGJZhet_yKCaIwqh3wO8GB2WI7mLjBq2WJXJ5WukNmHqciFiZTVpKv9-ktD5oh0HKAnQSUBJGMl45kSIiw9ur4MgOKP7WwM3bBjN6HQfUOs5tExbbzb1PvzauTPp0qUJwcQvNr3qGjbHABeFHMySVpmU70vyt1F1CMMTt8eF9xKDd-JHCnjtkmd6PvYM0fq1VAhgeEimKOVSrBCoZRbTuEWsH_la5kw"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#121318]"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-3 py-2 bg-[#0d0e13] border-t border-[#292a2f]/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
              currentTab === item.id
                ? 'bg-[#ff553d] text-[#670400]'
                : 'text-[#c1c7cf] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
