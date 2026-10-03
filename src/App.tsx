/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ComparisonDock } from './components/ComparisonDock';
import { TelemetrySearchModal } from './components/TelemetrySearchModal';
import { WindTunnelSimulatorModal } from './components/WindTunnelSimulatorModal';

import { EngineeringCompareScreen } from './screens/EngineeringCompareScreen';
import { F1PaddockScreen } from './screens/F1PaddockScreen';
import { HallOfRecordsScreen } from './screens/HallOfRecordsScreen';
import { HypercarsCollectionScreen } from './screens/HypercarsCollectionScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('muhandislik-taqqoslash');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWindTunnelOpen, setIsWindTunnelOpen] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<string[]>([
    'Bugatti Bolide (1,850 OT)',
    'Porsche 919 Evo (1,160 OT)',
  ]);

  const handleAddToCompare = (carName: string) => {
    if (!compareList.includes(carName)) {
      if (compareList.length >= 4) {
        setCompareList([...compareList.slice(1), carName]);
      } else {
        setCompareList([...compareList, carName]);
      }
    }
  };

  const handleRemoveFromCompare = (carName: string) => {
    setCompareList(compareList.filter((c) => c !== carName));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleSelectCarTelemetry = (_carId: string) => {
    setCurrentTab('f1-paddock-telemetriya');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121318] text-[#e3e1e9]">
      {/* Fixed Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Screen Viewport */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'muhandislik-taqqoslash' && (
          <EngineeringCompareScreen onOpenWindTunnel={() => setIsWindTunnelOpen(true)} />
        )}
        {currentTab === 'f1-paddock-telemetriya' && <F1PaddockScreen />}
        {currentTab === 'rekordlar-zali' && (
          <HallOfRecordsScreen onOpenWindTunnel={() => setIsWindTunnelOpen(true)} />
        )}
        {currentTab === '3d-giperkarlar-kolleksiyasi' && (
          <HypercarsCollectionScreen
            onAddToCompare={handleAddToCompare}
            onSelectCarTelemetry={handleSelectCarTelemetry}
            onOpenWindTunnel={() => setIsWindTunnelOpen(true)}
          />
        )}
      </main>

      {/* Persistent Status Footer */}
      <Footer />

      {/* Persistent Compare Drawer */}
      <ComparisonDock
        compareList={compareList}
        onRemoveCar={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onNavigateToCompare={() => {
          setCurrentTab('muhandislik-taqqoslash');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentTab={currentTab}
      />

      {/* ⌘K Telemetry Search Modal */}
      <TelemetrySearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCar={handleSelectCarTelemetry}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3D Wind Tunnel CFD Simulator Modal */}
      <WindTunnelSimulatorModal
        isOpen={isWindTunnelOpen}
        onClose={() => setIsWindTunnelOpen(false)}
      />
    </div>
  );
}
