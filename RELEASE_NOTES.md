# RoomOS v2.6.0 Release Notes

**"The Critical Patch Update"**

This release addresses critical bugs that were causing app crashes and improves the overall user experience with better UI spacing and external link handling.

---

## 🐛 Critical Bug Fixes

### **Fixed: App Crashes on Profile, Transactions, and Analytics Pages**
- **Issue**: The app was crashing with error "Cannot read properties of undefined (reading 'id')" when navigating to Profile, Transactions, or Expense Analytics pages.
- **Root Cause**: After implementing Tauri native storage integration in v2.4.0, the `getState()` function was converted to async to support hydration from persistent storage. However, three UI modules (`profile.js`, `transactions.js`, and `expense-analytics.js`) were still calling `getState()` synchronously without awaiting the Promise, resulting in `undefined` user data.
- **Fix**: Updated all three modules to properly `await getState()` before accessing user properties. This ensures the state is fully loaded from Tauri's persistent store before the UI attempts to render user-specific data.

### **Fixed: Update Download Button Opens Inside App**
- **Issue**: When clicking "Download Now" on the update notification popup, the download link would load inside the app's webview instead of opening in the device's external browser.
- **Root Cause**: The standard `window.open()` method doesn't work as expected in Tauri/mobile contexts.
- **Fix**: Implemented Tauri's `@tauri-apps/plugin-opener` to properly open URLs in the system's default browser. Added fallback to `window.open()` for web environments.

### **Fixed: Notification Panel Overlap on Android**
- **Issue**: The app header was covering the Android notification panel/status bar, making header buttons (refresh, chat, theme toggle) unusable.
- **Root Cause**: No safe area insets were configured to account for device notches and status bars.
- **Fix**: 
  - Added `viewport-fit=cover` to the viewport meta tag
  - Implemented CSS safe area insets: `padding-top: max(var(--space-md), env(safe-area-inset-top))`
  - The header now dynamically adjusts its top padding based on the device's safe area, ensuring buttons remain accessible

### **Fixed: Update Popup Scrolling Issue**
- **Issue**: On devices with long release notes, the update popup would get stuck with no way to scroll, making buttons inaccessible.
- **Fix**: 
  - Reduced popup padding from `var(--space-xl)` to `var(--space-lg)`
  - Added `max-height: 90vh` and `overflow-y: auto` to enable scrolling when content exceeds screen height

---

## 🎨 UI/UX Improvements

- **Custom App Icon**: The app now displays your custom icon across all Android launchers and app switchers
- **Better Spacing**: Improved overall spacing and padding throughout the app for a cleaner look

---

## 📱 Android

- **Package ID**: `com.homesyncos.roomos`
- **Version Code**: Properly incremented to ensure smooth updates from v2.4.0
- **Signed Release**: `roomos-v2.6.0-release.apk` (35MB)
- **Update Behavior**: This version will update your existing RoomOS installation instead of installing as a separate app

---

## 🔧 Technical Details

- **State Management**: All UI modules now properly handle async state hydration from Tauri's persistent storage
- **External Links**: Implemented platform-aware URL opening with Tauri opener plugin
- **Safe Areas**: Full support for device notches, status bars, and navigation gestures on modern Android devices

---

*Creator: Sumit Srivastava | Company: HomeSyncOS*
