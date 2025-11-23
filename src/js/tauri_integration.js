// Dummy Tauri integration for Shell App to prevent 404 errors
// This mimics the interface expected by app.js

export async function sendAppNotification(title, body) {
    console.log('Notification (Shell):', title, body);
    // In a real Flutter app, you might use a Platform Channel to show a notification
}

export async function getFromStore(key) {
    console.log('getFromStore (Shell):', key);
    return null;
}

export async function clearStore() {
    console.log('clearStore (Shell)');
}
