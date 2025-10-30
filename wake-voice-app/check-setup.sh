#!/bin/bash

# Wake Voice App - Setup Verification Script
# Run this to check if your environment is ready

echo "================================================"
echo "  Wake Voice App - Setup Verification"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Not found"
    echo "  Install from: https://nodejs.org/"
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found: v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} Not found"
fi

# Check Java
echo -n "Checking Java... "
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}✓${NC} Found: $JAVA_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Not found (required for Android builds)"
    echo "  Install: sudo apt-get install openjdk-17-jdk"
fi

# Check ANDROID_HOME
echo -n "Checking ANDROID_HOME... "
if [ -n "$ANDROID_HOME" ]; then
    echo -e "${GREEN}✓${NC} Set: $ANDROID_HOME"
    
    # Check if directory exists
    if [ -d "$ANDROID_HOME" ]; then
        echo -e "  ${GREEN}✓${NC} Directory exists"
    else
        echo -e "  ${RED}✗${NC} Directory does not exist!"
    fi
else
    echo -e "${RED}✗${NC} Not set"
    echo "  See ANDROID_SETUP.md for instructions"
fi

# Check adb
echo -n "Checking adb... "
if command -v adb &> /dev/null; then
    ADB_VERSION=$(adb --version | head -n 1)
    echo -e "${GREEN}✓${NC} Found: $ADB_VERSION"
    
    # Check for connected devices
    echo -n "Checking for devices... "
    DEVICES=$(adb devices | grep -v "List" | grep "device$" | wc -l)
    if [ "$DEVICES" -gt 0 ]; then
        echo -e "${GREEN}✓${NC} Found $DEVICES device(s)"
        adb devices | grep "device$"
    else
        echo -e "${YELLOW}⚠${NC} No devices connected"
        echo "  Start an emulator or connect a physical device"
    fi
else
    echo -e "${RED}✗${NC} Not found"
    echo "  Install Android SDK or run: sudo apt-get install android-tools-adb"
fi

# Check project dependencies
echo -n "Checking project dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${RED}✗${NC} Not installed"
    echo "  Run: npm install"
fi

# Check native projects
echo -n "Checking Android native project... "
if [ -d "android" ]; then
    echo -e "${GREEN}✓${NC} Generated"
else
    echo -e "${RED}✗${NC} Not found"
    echo "  Run: npx expo prebuild"
fi

echo -n "Checking iOS native project... "
if [ -d "ios" ]; then
    echo -e "${GREEN}✓${NC} Generated"
else
    echo -e "${YELLOW}⚠${NC} Not found (only needed for iOS builds)"
fi

# Summary
echo ""
echo "================================================"
echo "  Summary"
echo "================================================"

READY=true

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗${NC} Node.js is required"
    READY=false
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗${NC} npm is required"
    READY=false
fi

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${YELLOW}⚠${NC} ANDROID_HOME not set - see ANDROID_SETUP.md"
    READY=false
fi

if ! command -v adb &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} adb not found - see ANDROID_SETUP.md"
    READY=false
fi

if [ ! -d "node_modules" ]; then
    echo -e "${RED}✗${NC} Dependencies not installed - run: npm install"
    READY=false
fi

if [ "$READY" = true ]; then
    echo ""
    echo -e "${GREEN}✓ Your environment is ready!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Start an emulator or connect a device"
    echo "  2. Run: npx expo run:android"
else
    echo ""
    echo -e "${YELLOW}⚠ Setup incomplete${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review the issues above"
    echo "  2. See ANDROID_SETUP.md for Android SDK setup"
    echo "  3. Run this script again to verify"
fi

echo ""
echo "================================================"

