// Global State Management
const state = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    group: JSON.parse(localStorage.getItem('group') || 'null')
};

export async function getState() {
    // Try to hydrate from Tauri store if empty
    if (!state.token) {
        try {
            const { getFromStore } = await import('./tauri_integration.js');
            const token = await getFromStore('token');
            if (token) {
                state.token = token;
                state.user = await getFromStore('user');
                state.group = await getFromStore('group');
                // Sync back to localStorage for consistency
                localStorage.setItem('token', token);
                if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
                if (state.group) localStorage.setItem('group', JSON.stringify(state.group));
            }
        } catch (e) {
            console.warn('Failed to hydrate from Tauri store', e);
        }
    }
    return state;
}

export function updateState(key, value) {
    state[key] = value;
    if (value === null) {
        localStorage.removeItem(key);
        // Also clear from Tauri store if available
        import('./tauri_integration.js').then(ti => ti.setInStore(key, null));
    } else {
        const valToStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valToStore);
        // Sync to Tauri store
        import('./tauri_integration.js').then(ti => ti.setInStore(key, value));
    }
}
