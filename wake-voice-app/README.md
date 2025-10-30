# Wake-Voice-App

## What it does
Listens for wake phrase `hey thworks`. After detection, captures one spoken command and shows the recognized text.

## Requirements
- Node.js (v16+ recommended)
- npm
- Expo CLI (`npm install -g expo-cli`) or use `npx`
- Android Studio (for emulator) OR physical device
- Java JDK & Android SDK configured

## Setup (exact commands)

1. **Clone repo** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd wake-voice-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Prebuild to generate native projects** (required for react-native-voice):
   ```bash
   npx expo prebuild
   ```

4. **(iOS only) Install pods**:
   ```bash
   cd ios
   npx pod-install
   cd ..
   ```

5. **Run on Android emulator or device**:
   ```bash
   npx expo run:android
   ```
   - Make sure an emulator is running (Android Studio → AVD Manager) or connect a device with USB debugging.

6. **Hot reload**:
   - After native build, JS-only changes are fast; otherwise run `npx expo run:android` again.

## Permissions
- **Android**: RECORD_AUDIO is requested in `app.json` prebuild.
- **iOS**: `NSMicrophoneUsageDescription` in `app.json`.

## How it works

1. App starts and continuously listens for speech using `@react-native-voice/voice`
2. When the wake phrase "hey thworks" is detected in the partial results, the app transitions to "Awake" state
3. User then speaks a command
4. The command is recognized and displayed in the UI
5. After showing the result, the app returns to listening mode

## UI States

- **Idle**: Not listening
- **Listening**: Actively listening for wake phrase or command
- **Awake**: Wake phrase detected, waiting for command (5-second window)
- **Processing**: Converting speech to text
- **Result**: Displaying recognized text
- **Error**: Error occurred (check logs)

## Notes
- If speech recognition fails, grant microphone permission in device settings.
- The wake phrase detection is case-insensitive and uses simple string matching.
- On some emulators, microphone input may need to be enabled in system settings.

## Testing

Run the included test:
```bash
npm test
```

## Troubleshooting

- **Voice errors on Android emulator**: Ensure microphone is available. Some older emulators don't route microphone audio. Use a physical device if you see persistent STT failures.
- **App crashes at startup after prebuild**: Check native logs in Android Studio logcat; typically missing permission or mismatch in Android SDK versions.
- **No speech recognition**: Make sure you've granted RECORD_AUDIO permission when prompted.

