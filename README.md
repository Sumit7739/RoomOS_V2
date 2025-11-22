# RoomOS 🏠✨

**The Operating System for Your Shared Living Space.**

Tired of sticky notes on the fridge? Arguing over who bought the toilet paper last? **RoomOS** is here to save your friendships (and your wallet). It's a sleek, offline-first application designed to manage everything about living together.

## 🚀 Features

*   **💸 Expense Tracking**: Split bills, log purchases, and settle debts without the math headaches. "Who owes who?" is now a solved problem.
*   **💬 House Chat**: A dedicated channel for house comms. Perfect for "Is the dishwasher clean?" or "Pizza tonight?"
*   **📊 Analytics**: See where your money goes. (Spoiler: It's probably takeout).
*   **📋 Rules & Roster**: Define house rules and keep track of who's doing what.
*   **🔌 Offline First**: Internet down? No problem. RoomOS works offline and syncs when you're back online.
*   **📱 Cross-Platform**: Runs on your desktop and your Android phone.

## 🛠️ Tech Stack

Built with love and some very cool tech:

*   **Frontend**: Vanilla JavaScript 🍦 (No frameworks, just raw power)
*   **Core**: [Tauri](https://tauri.app/) v2 🦀 (Rust-based, lightweight, secure)
*   **Mobile**: Android support via Tauri Mobile
*   **Styling**: Custom CSS (because we have taste)

## 🏃‍♂️ Getting Started

Want to run this yourself? Buckle up!

### Prerequisites

*   **Node.js** & **npm**
*   **Rust** & **Cargo** (for Tauri)
*   **Android Studio** (if you want to build for Android)

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/sumit7739/ROOMOS_V2.git
    cd ROOMOS_V2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run on Desktop:**
    ```bash
    npm run tauri dev
    ```

4.  **Run on Android:**
    ```bash
    npm run tauri android dev
    ```

## 🏗️ Building for Release

Ready to ship?

*   **Desktop:** `npm run tauri build`
*   **Android:** `npm run tauri android build --apk`

## 📂 Project Structure

*   `src/` - The web frontend (HTML, CSS, JS).
    *   `js/ui/` - Where the magic happens (Chat, Expenses, Dashboard logic).
    *   `js/store.js` - State management.
*   `src-tauri/` - The Rust backend and Tauri configuration.

## 🤝 Contributing

Found a bug? Want to add a "Chore Wheel of Destiny"? PRs are welcome! Just keep it clean and keep it fun.

---

*Built for roommates everywhere.*
