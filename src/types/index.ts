export type ScreenTab =
  | 'f1-paddock-telemetriya'
  | 'rekordlar-zali'
  | '3d-giperkarlar-kolleksiyasi'
  | 'muhandislik-taqqoslash';

export interface CarSpecs {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  location: string;
  year?: number;
  category: 'f1' | 'giperkar' | 'track' | 'record' | 'bespoke';
  engineType: 'v12' | 'w16' | 'v8tt' | 'f1hybrid' | 'electric';
  engineDesc: string;
  powerHp: number;
  powerDesc: string;
  topSpeedKmh: number;
  accel0100: number;
  accel0200?: number;
  weightKg: number;
  powerToWeight?: number;
  downforce250Kg: number;
  lateralG: number;
  priceUsdMillion: number;
  image: string;
  badge?: string;
  subBadge?: string;
  desc: string;
  aeroEfficiency?: string;
  rpmLimit?: string;
  soundType: 'v12' | 'w16' | 'f1hybrid' | 'v8tt' | 'electric';
  lapTimeSilverstone?: string;
  lapTimeMonza?: string;
  braking200_0m?: number;
}

export interface TelemetryPoint {
  distance: number;
  locationName: string;
  speedRB20: number;
  speedSF24: number;
  speedChiron: number;
  speedValkyrie: number;
  throttle: number;
  brake: number;
  gear: number;
  gForce: number;
}

export interface SpeedMilestone {
  speed: number;
  title: string;
  badge: string;
  desc: string;
  cd: string;
  recordHolder: string;
}
