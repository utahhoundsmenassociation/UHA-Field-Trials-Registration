# UHA Field Trials — Sign-Up Form PWA

**Designed & Developed by April Thatcher**
Donated to the Utah Houndsmen Association · v6.9 · 2026

---

## What's in this folder

```
index.html        ← The full sign-up form (PWA-enabled)
manifest.json     ← PWA app identity (name, icons, colors)
sw.js             ← Service worker (offline caching)
icons/            ← App icons for all screen sizes
  icon-72x72.png
  icon-96x96.png
  icon-128x128.png
  icon-144x144.png
  icon-152x152.png
  icon-192x192.png
  icon-384x384.png
  icon-512x512.png
  apple-touch-icon.png
README.md         ← This file
```

---

## Deploy to GitHub Pages

1. Create a new GitHub repo — e.g. `UHA-Sign-Up-Form`  
   *(or add as a subfolder in the existing `UHA-Field-Trials-APP` repo)*

2. Push all files in this folder to the repo root (or subfolder).

3. Go to **Settings → Pages → Source → main branch / root** → Save.

4. Your form will be live at:
   ```
   https://utahhoundsmenassociation.github.io/UHA-Sign-Up-Form/
   ```

---

## Install as a PWA (iPad / iPhone)

1. Open the URL in **Safari**
2. Tap the **Share button** (box with arrow)
3. Tap **"Add to Home Screen"**
4. Name it **UHA Sign-Up** → tap **Add**

It will appear on the home screen with the UHA Registration logo and open full-screen with no browser chrome — just like a native app.

---

## Google Sheets sync

**Nothing changes.** The form still posts to the exact same Apps Script URL it always has. The PWA layer is purely about offline caching and home screen install — it doesn't touch the data flow at all.

```
iPad PWA → Google Apps Script → Google Sheet ← Main App pulls
```

The offline queue (entries saved when off WiFi, sent when reconnected) works the same as before.

---

## Updating the app

When you change `index.html`, bump the cache version in `sw.js`:

```js
// Line 3 of sw.js — change v1 to v2, v3, etc.
const CACHE_NAME = 'uha-signup-v1';
```

This forces all installed PWAs to fetch the new version on next load.

---

## Differences from the original iPad form

- ✅ Installable to home screen on any device (iPad, iPhone, Android, desktop Chrome)
- ✅ Full offline support — loads even with zero signal
- ✅ Custom UHA Registration app icon
- ✅ No browser chrome when installed (full-screen kiosk feel)
- ✅ All form logic, pricing, Google Sheets sync — **100% identical to original**
