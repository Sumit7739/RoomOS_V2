# RoomOS v3.1.5 Release Notes

**"The Icon & Layout Fix Update"**

This release fixes the custom app icon display issue and resolves critical layout problems on Android devices where the header and navigation bar were overlapping with system UI elements.

---

## 🎨 Visual & Layout Fixes

### **Fixed: Custom App Icon Not Displaying**

- **Issue**: The app was showing the default Tauri icon instead of the custom RoomOS icon in the Android launcher.
- **Root Cause**: Android launcher icons were not properly generated from the source icon file, and existing icons were not in the required RGBA format.
- **Fix**:
  - Generated all Android launcher icon densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) from `src/icon.png`
  - Converted all icons to RGBA format for Tauri compatibility
  - Icons now display correctly in launcher, app switcher, and settings

### **Fixed: Header Overlapping Android Status Bar**

- **Issue**: The app header was positioned behind the Android status bar, making header buttons (refresh, chat, theme toggle) difficult or impossible to tap.
- **Root Cause**: Previous safe area implementation using CSS `env()` variables was not working reliably on all Android devices.
- **Fix**:
  - Implemented body-level safe area padding approach
  - Added JavaScript-based safe area detection with fallback values (24px top, 48px bottom)
  - Enabled edge-to-edge display mode in Android themes
  - Made status bar and navigation bar transparent for seamless integration

### **Fixed: Bottom Navigation Overlapping Android Nav Bar**

- **Issue**: The bottom navigation dock was positioned behind Android's navigation buttons/gestures, making it hard to access navigation items.
- **Root Cause**: No proper safe area handling for bottom navigation bar.
- **Fix**:
  - Applied safe area padding to body element, creating a "safe viewport"
  - Bottom navigation now sits comfortably above Android navigation controls
  - Works with both gesture navigation and traditional button navigation

---

## 🔧 Technical Improvements

### **Safe Area Handling**

- **Body-Level Padding**: Added safe area insets directly to `<body>` element for consistent spacing
- **JavaScript Detection**: Implemented `initSafeAreas()` function that:
  - Detects Android/Tauri environment
  - Applies fallback values when CSS `env()` not supported
  - Automatically adjusts on orientation changes
- **CSS Variables**:
  - `--safe-area-top`: Status bar height
  - `--safe-area-bottom`: Navigation bar height
  - `--safe-area-left/right`: Edge insets

### **Android Theme Updates**

- Enabled `windowLayoutInDisplayCutoutMode` for notch/cutout support
- Transparent status bar and navigation bar
- Disabled navigation/status bar contrast enforcement
- Full edge-to-edge display support

### **HTML/CSS Updates**

- Added `viewport-fit=cover` to viewport meta tag
- Simplified element positioning (no complex calculations needed)
- Improved compatibility across different Android versions and devices

---

## 📱 Android

- **Package ID**: `com.homesyncos.roomos`
- **Version**: 3.1.5
- **APK Size**: 39 MB
- **Signed Release**: `RoomOS-v3.1.5.apk`
- **Update Behavior**: Seamlessly updates from v3.1.4 (same package ID)

---

## ✅ Compatibility

- ✓ Works with gesture navigation
- ✓ Works with button navigation
- ✓ Supports devices with display cutouts (notches)
- ✓ Compatible with Android 7.0+ (API 24+)
- ✓ Tested on various screen sizes and orientations

---

## 📝 Files Modified

- `src/icon.png` - Converted and resized for all Android densities
- `src/index.html` - Added viewport-fit=cover
- `src/css/style.css` - Added body-level safe area padding
- `src/js/app.js` - Added safe area detection and fallback logic
- Android theme files - Enabled edge-to-edge display
- All launcher icon files in `mipmap-*` directories

---

_Release Date: December 7, 2025_  
_Creator: Sumit Srivastava | Company: HomeSyncOS_

---

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

_Creator: Sumit Srivastava | Company: HomeSyncOS_
