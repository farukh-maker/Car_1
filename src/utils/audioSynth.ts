// Real-time engine sound synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playEngineRevSound(engineType: 'v12' | 'w16' | 'f1hybrid' | 'v8tt' | 'electric') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 2.6;

    // Master volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.15);
    masterGain.gain.exponentialRampToValueAtTime(0.2, now + 1.2);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    masterGain.connect(ctx.destination);

    if (engineType === 'v12') {
      // Screaming high RPM V12 (Cosworth / Ferrari)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + 1.0);
      filter.frequency.exponentialRampToValueAtTime(1200, now + duration);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(130, now);
      osc1.frequency.exponentialRampToValueAtTime(780, now + 1.1); // ~11,000 RPM
      osc1.frequency.exponentialRampToValueAtTime(220, now + duration);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(260, now);
      osc2.frequency.exponentialRampToValueAtTime(1560, now + 1.1);
      osc2.frequency.exponentialRampToValueAtTime(440, now + duration);

      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(65, now);
      osc3.frequency.exponentialRampToValueAtTime(390, now + 1.1);
      osc3.frequency.exponentialRampToValueAtTime(110, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);

    } else if (engineType === 'w16') {
      // Deep Quad-Turbo W16 rumble (Bugatti)
      const sub = ctx.createOscillator();
      const rumble = ctx.createOscillator();
      const mid = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(450, now + duration);

      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(280, now + 1.2);
      sub.frequency.exponentialRampToValueAtTime(75, now + duration);

      rumble.type = 'sawtooth';
      rumble.frequency.setValueAtTime(110, now);
      rumble.frequency.exponentialRampToValueAtTime(560, now + 1.2);
      rumble.frequency.exponentialRampToValueAtTime(150, now + duration);

      mid.type = 'triangle';
      mid.frequency.setValueAtTime(165, now);
      mid.frequency.exponentialRampToValueAtTime(840, now + 1.2);
      mid.frequency.exponentialRampToValueAtTime(220, now + duration);

      // Turbo spool hiss
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1500, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(4500, now + 1.2);
      noiseFilter.Q.value = 4.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 1.0);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start(now);
      whiteNoise.stop(now + duration);

      sub.connect(filter);
      rumble.connect(filter);
      mid.connect(filter);
      filter.connect(masterGain);

      sub.start(now);
      rumble.start(now);
      mid.start(now);
      sub.stop(now + duration);
      rumble.stop(now + duration);
      mid.stop(now + duration);

    } else if (engineType === 'electric') {
      // Rimac 4-Motor Inverter High Pitch Ultrasonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(350, now);
      osc1.frequency.exponentialRampToValueAtTime(3200, now + 1.4);
      osc1.frequency.exponentialRampToValueAtTime(600, now + duration);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(700, now);
      osc2.frequency.exponentialRampToValueAtTime(6400, now + 1.4);
      osc2.frequency.exponentialRampToValueAtTime(1200, now + duration);

      osc1.connect(masterGain);
      osc2.connect(masterGain);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

    } else {
      // F1 Hybrid / V8 Turbo
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const hybridWhine = ctx.createOscillator();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.exponentialRampToValueAtTime(660, now + 1.0);
      osc1.frequency.exponentialRampToValueAtTime(180, now + duration);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 1.0);
      osc2.frequency.exponentialRampToValueAtTime(360, now + duration);

      hybridWhine.type = 'sine';
      hybridWhine.frequency.setValueAtTime(1200, now);
      hybridWhine.frequency.exponentialRampToValueAtTime(4800, now + 1.0);
      hybridWhine.frequency.exponentialRampToValueAtTime(1500, now + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(5000, now + 1.0);
      filter.frequency.exponentialRampToValueAtTime(1400, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      hybridWhine.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      hybridWhine.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      hybridWhine.stop(now + duration);
    }
  } catch (err) {
    console.warn('Audio synthesis could not start:', err);
  }
}
