// Tauri Integration Module
// This module handles communication with the Tauri backend (Rust)
// It provides a unified interface for notifications, storage, and other native features.

// Import Tauri APIs (these will be available when running in Tauri context)
// Note: We use dynamic imports or check for window.__TAURI__ to avoid errors in standard web browsers

const isTauri = !!window.__TAURI__;

/**
 * Send a native notification
 * @param {string} title 
 * @param {string} body 
 */
export async function sendAppNotification(title, body) {
    if (!isTauri) {
        console.log('Notification (Web):', title, body);
        // Fallback to browser notification if available and permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body });
        }
        return;
    }

    try {
        // Dynamically import to avoid load-time errors in browser
        const { sendNotification } = await import('@tauri-apps/plugin-notification');

        // Request permission if not granted
        let permissionGranted = await isNotificationPermissionGranted();
        if (!permissionGranted) {
            const permission = await requestNotificationPermission();
            permissionGranted = permission === 'granted';
        }

        if (permissionGranted) {
            sendNotification({ title, body });
        }
    } catch (error) {
        console.error('Failed to send Tauri notification:', error);
    }
}

/**
 * Check if notification permission is granted
 */
async function isNotificationPermissionGranted() {
    if (!isTauri) return Notification.permission === 'granted';
    try {
        const { isPermissionGranted } = await import('@tauri-apps/plugin-notification');
        return await isPermissionGranted();
    } catch (e) {
        return false;
    }
}

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
    if (!isTauri) return await Notification.requestPermission();
    try {
        const { requestPermission } = await import('@tauri-apps/plugin-notification');
        return await requestPermission();
    } catch (e) {
        return 'denied';
    }
}

/**
 * Get value from persistent store
 * @param {string} key 
 */
export async function getFromStore(key) {
    if (!isTauri) {
        // Fallback to localStorage for web
        const val = localStorage.getItem(key);
        try {
            return JSON.parse(val);
        } catch {
            return val;
        }
    }

    try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = new Store('store.bin');
        return await store.get(key);
    } catch (error) {
        console.error('Tauri Store Get Error:', error);
        return null;
    }
}

/**
 * Set value in persistent store
 * @param {string} key 
 * @param {any} value 
 */
export async function setInStore(key, value) {
    if (!isTauri) {
        // Fallback to localStorage
        const valToStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valToStore);
        return;
    }

    try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = new Store('store.bin');
        await store.set(key, value);
        await store.save(); // Persist changes
    } catch (error) {
        console.error('Tauri Store Set Error:', error);
    }
}

/**
 * Clear the persistent store
 */
export async function clearStore() {
    if (!isTauri) {
        localStorage.clear();
        return;
    }

    try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = new Store('store.bin');
        await store.clear();
        await store.save();
    } catch (error) {
        console.error('Tauri Store Clear Error:', error);
    }
}
