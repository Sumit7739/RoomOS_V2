// Tauri integration module for Store and Notification
// This file is imported by the frontend when running inside a Tauri environment.

// Helper to detect Tauri runtime
export async function checkTauriEnvironment() {
    return !!(window && window.__TAURI__);
}

let store = null;

// Initialize Tauri Store (only when in Tauri)
export async function initTauriStore() {
    if (!(await checkTauriEnvironment())) {
        console.log('Not in Tauri – skipping Store init');
        return false;
    }
    try {
        const { Store } = await import('@tauri-apps/plugin-store');
        store = new Store('roomos_store.bin');
        await store.load();
        console.log('✅ Tauri Store initialized');
        return true;
    } catch (e) {
        console.log('Store init skipped (browser mode)');
        return false;
    }
}

export async function saveToStore(key, value) {
    if (!store) return;
    try {
        await store.set(key, value);
        await store.save();
        console.log(`Saved ${key} to Tauri Store`);
    } catch (e) {
        console.error('Failed to save to Store', e);
    }
}

export async function getFromStore(key) {
    if (!store) return null;
    try {
        const val = await store.get(key);
        return val;
    } catch (e) {
        console.error('Failed to get from Store', e);
        return null;
    }
}

export async function removeFromStore(key) {
    if (!store) return;
    try {
        await store.delete(key);
        await store.save();
        console.log(`Removed ${key} from Tauri Store`);
    } catch (e) {
        console.error('Failed to remove from Store', e);
    }
}

// Clear entire store (debug utility)
export async function clearStore() {
    if (!store) return;
    try {
        await store.clear();
        await store.save();
        console.log('✅ Tauri Store cleared');
    } catch (e) {
        console.error('Failed to clear Store', e);
    }
}

// Notification handling
export async function initNotifications() {
    if (!(await checkTauriEnvironment())) {
        console.log('Not in Tauri – skipping notifications init');
        return false;
    }
    try {
        const { isPermissionGranted, requestPermission } = await import('@tauri-apps/plugin-notification');
        let granted = await isPermissionGranted();
        if (!granted) {
            const perm = await requestPermission();
            granted = perm === 'granted';
        }
        console.log(granted ? '✅ Notification permission granted' : '❌ Notification permission denied');
        return granted;
    } catch (e) {
        console.log('Notifications init skipped (browser mode)');
        return false;
    }
}

export async function sendNotification(title, body) {
    if (!(await checkTauriEnvironment())) return;
    try {
        const { Notification } = await import('@tauri-apps/plugin-notification');
        await Notification.send({ title, body });
    } catch (e) {
        console.error('Failed to send notification', e);
    }
}

// Export a simple init that runs both store and notifications
export async function initTauri() {
    await initTauriStore();
    await initNotifications();
}
