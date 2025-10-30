# Development Notes

## Design Choices

Architecture
- Expo + Prebuild: Chosen to keep Expo workflow while allowing native module `@react-native-voice/voice` for robust STT.
- Wake detection: Implemented by scanning live partial/full STT results for the wake phrase. This is simple and acceptable for the assessment.
- State management: Using local React state with hooks. Simple and sufficient for this use case.

 Wake Word Detection Approach
The wake word detection is implemented using a simple string matching approach:
- Listen continuously for speech input
- Check partial results for the wake phrase "hey thworks"
- When detected, transition to "Awake" state and prepare to capture the actual command
- After command is captured, display it and return to listening mode

Trade-offs:
-  Simple to implement and understand
-  No additional dependencies or cloud services required
-  Works with platform-native speech recognition
-  Susceptible to false positives (e.g., "they work" might trigger it)
-  Relies on robust speech recognition quality
-  Not as power-efficient as dedicated wake-word detection libraries
-  Requires continuous speech recognition to be running

Alternative Approaches Considered

1. Dedicated Wake Word Libraries:
   - More accurate and power-efficient
   - Requires additional native SDK integration
   - May require licensing
   - More complex setup
   - Better for production use

2. Cloud-based STT(e.g., Google Cloud Speech, AWS Transcribe):
   - More accurate recognition
   - Requires internet connection
   - Privacy concerns (audio sent to cloud)
   - Additional costs
   - Latency issues

3. On-device ML Models (e.g., TensorFlow Lite):
   - Custom wake word detection
   - Requires training and model integration
   - More complex implementation
   - Better accuracy and power efficiency

 Third-party Packages

 @react-native-voice/voice
- Purpose: Main STT engine, provides on-device recognition event callbacks
-  Well-maintained and widely used
  - Works with platform-native speech recognition (Google on Android, Apple on iOS)
  - No cloud dependencies
  - Good event-based API for partial and final results
- **Version**: ^2.1.6

 react-native-reanimated
- Purpose: Optional for better animations / UX
- Why chosen: 
  - Industry standard for React Native animations
  - Better performance than Animated API
  - Not strictly required but enhances UX
- **Version**: ^3.3.0

 Known Issues & Limitations

1. Emulator Microphone Support:
   - On some emulators or OS versions, microphone permissions may need enabling in system settings
   - Some older Android emulators don't properly route microphone audio
   - Recommendation: Use physical device for testing

2. Native Module Requirement:
   - Using `@react-native-voice/voice` requires prebuilding / native run
   - Cannot run purely as managed Expo with no native builds
   - Must use `npx expo run:android` instead of `expo start`

3. Wake Phrase False Positives:
   - Simple string matching can trigger on similar-sounding phrases
   - Could be improved with fuzzy matching or phonetic algorithms
   - For production, consider dedicated wake-word detection

4. Continuous Listening:
   - App needs to continuously run speech recognition
   - May impact battery life on real devices
   - Platform STT services may have timeouts that require restart logic

5. Platform Differences:
   - Android uses Google Speech Recognition (device-dependent)
   - iOS uses Apple's Speech framework
   - Behavior and accuracy may vary between platforms

## Future Improvements

1. Better Wake Word Detection:
   - Implement phonetic matching
   - Add confidence scoring
   - Support multiple wake phrases

2. Power Optimization:
   - Implement proper background handling
   - Add sleep/wake cycles to reduce battery drain
   - Consider dedicated wake-word library for production

3. Enhanced UX:
   - Add visual feedback animations
   - Implement haptic feedback
   - Add sound effects for state transitions

4. Error Handling:
   - Better error recovery
   - Offline mode detection
   - Permission request flow improvements

5.Testing:
   - Add more comprehensive unit tests
   - Add integration tests
   - Add E2E tests with Detox

## Development Timeline

- Project setup: ~30 minutes
- Core functionality implementation: ~4 hours
- UI/UX polish: ~1 hour
- Documentation: ~30 minutes
- Testing and debugging: ~2 hour

Total: ~8 hours (well within 24-hour constraint)

