// Mock react-native-voice
jest.mock('@react-native-voice/voice', () => ({
  onSpeechStart: jest.fn(),
  onSpeechPartialResults: jest.fn(),
  onSpeechResults: jest.fn(),
  onSpeechError: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(),
  removeAllListeners: jest.fn(),
}));

// Suppress console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

