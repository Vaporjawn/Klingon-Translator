import "@testing-library/jest-dom";
import { vi, beforeAll, afterAll } from "vitest";

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IntersectionObserver = class MockIntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = class MockResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  constructor(_cb: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock speechSynthesis for TTS features
Object.defineProperty(window, "speechSynthesis", {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn().mockReturnValue([]),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});

// Mock SpeechSynthesisUtterance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).SpeechSynthesisUtterance =
  class MockSpeechSynthesisUtterance {
    constructor(text?: string) {
      this.text = text || "";
    }
    text = "";
    lang = "";
    voice = null;
    volume = 1;
    rate = 1;
    pitch = 1;
    onstart = null;
    onend = null;
    onerror = null;
    onpause = null;
    onresume = null;
    onmark = null;
    onboundary = null;
  };

// Setup console overrides for tests
const originalError = console.error;
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is deprecated")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
