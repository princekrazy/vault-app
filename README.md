#  Vault App

A personal offline-first **vault management and transaction ledger app** built with React, Vite, and IndexedDB.  
Designed to run as a **Progressive Web App (PWA)** on iPad, Android, and desktop — no backend required.

---

##  Features

### Ledger System
- View all transactions in one place
- Real-time balance calculation
- Tracks deposits and withdrawals separately
- Each transaction includes:
  - Name
  - Amount
  - Note
  - Date

---

###  Deposit &  Withdrawal
- Add financial entries instantly
- Smart name suggestions (autocomplete)
- Lightweight and fast forms

---

###  Filtering System
- Search by name (case-insensitive)
- Search by note (case-insensitive)
- Filter by:
  - Minimum amount
  - Maximum amount
  - Date range
- Filters apply to:
  - UI
  - Export (Excel/PDF)

---

###  Edit Transactions
- Edit any transaction anytime
- Fix mistakes without deleting entries
- Updates reflected instantly in ledger

---

### Export System
- Export filtered data to:
  - Excel (.xlsx with styling)
  - PDF (table format)
- Includes:
  - Headers (styled)
  - Clean structured rows

---

###  Progressive Web App (PWA)
- Install on iPad, iPhone, Android, and desktop
- Works offline using IndexedDB
- Fullscreen “native app” experience
- No App Store / Play Store required

---

##  Tech Stack

-  React
-  Vite
-  IndexedDB (Dexie)
-  XLSX / XLSX-style
-  jsPDF + autoTable
-  vite-plugin-pwa
-  GitHub Pages (hosting)

---

##  Storage

All data is stored locally using **IndexedDB**:
- No backend
- No cloud required
- Fully offline-first

---

##  Deployment

The app is deployed using GitHub Pages.

### Live App:

https://princekrazy.github.io/vault-app/


---

##  Development Setup

### 1. Clone repo

git clone https://github.com/princekrazy/vault-app.git
cd vault-app
2. Install dependencies
npm install
3. Run locally
npm run dev
 Build & Deploy
Build production version
npm run build
Deploy to GitHub Pages
npm run deploy
 Install as App (PWA)
iPad / iPhone
Open in Safari
Tap Share button
Select Add to Home Screen
Android
Open in Chrome
Tap “Install App” prompt
⚙️ Project Structure
src/
 ├── pages/
 │    ├── Ledger.jsx
 │    ├── Deposit.jsx
 │    ├── Withdraw.jsx
 │
 ├── db/
 │    └── transactions.js
 │
 ├── utils/
 │    ├── exportExcel.js
 │    ├── exportPDF.js
 │
 ├── App.jsx
 └── main.jsx
 Privacy
All data stays on your device
No tracking
No external database
Fully offline capable

 Author

Built by Prince Krazy
