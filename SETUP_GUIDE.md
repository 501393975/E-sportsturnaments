# 🚀 Installation & Setup Guide

## Option 1: Install Node.js (Recommended)

### Download Node.js
1. Visit: https://nodejs.org/
2. Download **LTS version** (v20 or latest)
3. Run installer and follow prompts
4. Restart PowerShell/Command Prompt

### Verify Installation
```powershell
node --version
npm --version
```

### Then Install Project
```powershell
cd "c:\Users\mahin\OneDrive\Desktop\E-sporst"
npm install
npm start
```

---

## Option 2: Use Online React Sandbox (No Installation)

### CodeSandbox
1. Visit: https://codesandbox.io
2. Create new React project
3. Upload your project files
4. Run instantly in browser

### Stackblitz
1. Visit: https://stackblitz.com
2. Create React project
3. Upload files
4. Development server runs automatically

---

## Option 3: Use VS Code with Live Server

If you want a quick preview without npm:

1. Install "Live Server" extension in VS Code
2. Open `public/index.html`
3. Right-click → "Open with Live Server"

⚠️ Note: This won't work fully without npm because React needs to be bundled.

---

## Recommended: Install Node.js

### Step-by-Step
1. **Download**: nodejs.org/en/download
2. **Choose**: LTS version for Windows (64-bit recommended)
3. **Install**: Double-click installer
4. **Next → Next → Install**
5. **Restart terminal**

### In PowerShell
```powershell
cd "c:\Users\mahin\OneDrive\Desktop\E-sporst"
npm install          # Install dependencies (~1-2 minutes)
npm start            # Start dev server
```

Browser will open at: `http://localhost:3000` ✅

---

## Requirements Checklist

- [ ] Node.js installed (v14+)
- [ ] npm available in terminal
- [ ] Project folder: `c:\Users\mahin\OneDrive\Desktop\E-sporst`
- [ ] package.json exists with dependencies
- [ ] Run `npm install` successfully
- [ ] Run `npm start` to launch

---

## Troubleshooting

### "npm: command not found"
→ Node.js not installed or PATH not set
→ **Solution**: Restart terminal after installing Node.js

### Install stuck or slow
→ Run: `npm cache clean --force`
→ Then: `npm install` again

### Port 3000 already in use
→ Run: `npm start -- --port 3001`

### "React version mismatch"
→ Delete `node_modules` folder
→ Run: `npm install` again

---

## Once Running

1. **Dashboard** - See tournament overview
2. **Tournaments** → **Create Tournament** - Add test data
3. **Add Teams** - Create 2-3 test teams
4. **Add Players** - Add players to teams
5. **Admin Dashboard** → **Record Match** - Log kills
6. **Leaderboard** - See kill rankings! 🏆

---

## Quick Test (After npm start)

### 1. Create Tournament (1 min)
```
Name: "Test Tournament"
Start: 2026-04-01
End: 2026-04-30
Max Teams: 4
```

### 2. Add Team (1 min)
```
Team Name: "Warriors"
Tag: "WAR"
```

### 3. Add Players (2 min)
```
Player 1: "Killer" (Assaulter)
Player 2: "Support" (Support)
Player 3: "Sniper" (Sniper)
```

### 4. Record Match (2 min)
```
Admin Dashboard → Record Match
Select tournament & teams
Add player kills:
- Killer: 20 kills
- Support: 10 kills
- Sniper: 15 kills
```

### 5. Check Leaderboard (1 min)
```
Leaderboard → Global
See "Killer" ranked #1 with 20 kills! 🥇
```

**Total: ~7 minutes to test everything**

---

## Next Action

**Install Node.js first** → Then follow "[Once Running](#once-running)" section

Need help? Let me know! 🔥
