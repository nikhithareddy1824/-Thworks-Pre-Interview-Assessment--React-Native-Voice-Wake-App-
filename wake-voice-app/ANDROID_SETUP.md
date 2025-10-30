# Android SDK Setup Guide

## Issue
You're seeing this error:
```
Failed to resolve the Android SDK path. Default install location not found: /home/sreeraj/Android/sdk
Error: spawn adb ENOENT
```

This means the Android SDK is not installed or the `ANDROID_HOME` environment variable is not set.

## Solution Options

### Option 1: Install Android Studio (Recommended)

This is the easiest and most complete solution.

1. **Download Android Studio**:
   ```bash
   # Visit: https://developer.android.com/studio
   # Or download directly:
   wget https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2024.2.1.12/android-studio-2024.2.1.12-linux.tar.gz
   ```

2. **Extract and Install**:
   ```bash
   sudo tar -xzf android-studio-*-linux.tar.gz -C /opt/
   cd /opt/android-studio/bin
   ./studio.sh
   ```

3. **Follow the Setup Wizard**:
   - Choose "Standard" installation
   - This will install Android SDK, Android SDK Platform, and Android Virtual Device
   - Note the SDK location (usually `~/Android/Sdk`)

4. **Set Environment Variables**:
   Add these lines to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

5. **Apply the changes**:
   ```bash
   source ~/.bashrc  # or source ~/.zshrc
   ```

6. **Verify Installation**:
   ```bash
   echo $ANDROID_HOME
   adb --version
   ```

### Option 2: Install Android SDK Command Line Tools Only

If you don't want the full Android Studio:

1. **Download Command Line Tools**:
   ```bash
   mkdir -p ~/Android/Sdk
   cd ~/Android/Sdk
   wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
   unzip commandlinetools-linux-11076708_latest.zip
   mkdir -p cmdline-tools/latest
   mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
   ```

2. **Set Environment Variables**:
   Add to `~/.bashrc` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/emulator
   ```

3. **Apply changes**:
   ```bash
   source ~/.bashrc
   ```

4. **Install Required Packages**:
   ```bash
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   sdkmanager "system-images;android-34;google_apis;x86_64"
   sdkmanager "emulator"
   ```

5. **Accept Licenses**:
   ```bash
   sdkmanager --licenses
   ```

### Option 3: Use Physical Android Device (No SDK needed for running)

If you have a physical Android device, you can skip the SDK setup for running the app:

1. **Enable Developer Options on your phone**:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Install minimal platform tools**:
   ```bash
   sudo apt-get update
   sudo apt-get install android-tools-adb android-tools-fastboot
   ```

3. **Connect your device via USB**

4. **Verify connection**:
   ```bash
   adb devices
   ```
   You should see your device listed.

5. **Run the app**:
   ```bash
   npx expo run:android
   ```

## After Setup

Once you've completed one of the above options, try running:

```bash
cd ~/Documents/augment-projects/ThWorks/wake-voice-app
npx expo run:android
```

## Creating an Android Emulator (After SDK Installation)

If you installed Android Studio or SDK:

1. **Using Android Studio**:
   - Open Android Studio
   - Go to Tools → Device Manager
   - Click "Create Device"
   - Choose a device (e.g., Pixel 5)
   - Download a system image (e.g., Android 14 / API 34)
   - Finish setup

2. **Using Command Line**:
   ```bash
   # Create AVD
   avdmanager create avd -n Pixel5 -k "system-images;android-34;google_apis;x86_64" -d pixel_5
   
   # List AVDs
   avdmanager list avd
   
   # Start emulator
   emulator -avd Pixel5
   ```

## Troubleshooting

### "sdkmanager: command not found"
- Make sure you've sourced your `.bashrc` or `.zshrc`
- Verify `ANDROID_HOME` is set: `echo $ANDROID_HOME`

### "adb: command not found"
- Install platform-tools: `sdkmanager "platform-tools"`
- Or install via apt: `sudo apt-get install android-tools-adb`

### Emulator won't start
- Make sure virtualization is enabled in BIOS
- Install KVM: `sudo apt-get install qemu-kvm`
- Add user to kvm group: `sudo usermod -aG kvm $USER`
- Log out and log back in

### Build fails with "SDK location not found"
- Create `local.properties` in the `android/` folder:
  ```
  sdk.dir=/home/sreeraj/Android/Sdk
  ```

## Quick Check Script

Run this to verify your setup:

```bash
#!/bin/bash
echo "Checking Android SDK setup..."
echo "ANDROID_HOME: $ANDROID_HOME"
echo "ADB version:"
adb --version
echo "Java version:"
java -version
echo "Available devices:"
adb devices
```

## Recommended: Option 1 (Android Studio)

For the best development experience, I recommend **Option 1** (Android Studio) because:
- ✅ Complete IDE with visual tools
- ✅ Easy emulator management
- ✅ Automatic SDK updates
- ✅ Built-in debugging tools
- ✅ Easier for beginners

## Next Steps After Setup

1. Verify SDK is installed: `echo $ANDROID_HOME`
2. Check adb works: `adb devices`
3. Start an emulator or connect a device
4. Run the app: `npx expo run:android`

---

**Need help?** Check the main README.md or QUICKSTART.md for more information.

