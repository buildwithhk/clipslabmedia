# Google Sheet & Email Notification Setup

Your website forms (`ContactSection` and `ContactFormModal`) are wired to send submissions to a Google Apps Script Web App connected to your Google Sheet:

- **Google Sheet:** https://docs.google.com/spreadsheets/d/1R8ls_lMOL8c-EU45P5wN7Aa9WTI0pwomIarpZbYAtZA/edit

## 1. Add the Script to Your Google Sheet

1. Open your Google Sheet link above while signed into the Google account that owns/edits it.
2. In the top menu, click **Extensions → Apps Script**.
3. Delete any default `myFunction` code in `Code.gs`.
4. Copy the entire contents of `google-apps-script/Code.gs` from this project and paste it into the Apps Script editor.
5. Check line 16 of `Code.gs`:
   ```js
   const NOTIFICATION_EMAIL = 'contact@clipslabmedia.com';
   ```
   Update this to the exact email address where you want lead notifications delivered (you can also comma-separate multiple emails, e.g. `'contact@clipslabmedia.com, yourgmail@gmail.com'`).
6. Click **Save** (`Ctrl+S`).

## 2. Authorize & Test Once

1. In the Apps Script toolbar dropdown next to **Debug**, select **`testSetup`** and click **Run**.
2. Click **Review permissions** → choose your Google account → if Google shows *"Google hasn't verified this app"*, click **Advanced → Go to ... (unsafe)** → **Allow**.
3. Verify that:
   - A test row appeared in your Google Sheet.
   - A test notification email arrived in your inbox.
   *(You can delete the test row from the sheet afterward.)*

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Set:
   - **Description:** `ClipsLab Media Lead Intake`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).

## 4. Connect the URL to Your Website

1. Open the `.env` file in the root of this project and paste the URL:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Restart `npm run dev` (or run `npm run build` before deploying `dist/` to your hosting provider).
   - If you host on **Vercel / Netlify / Cloudflare Pages**, also add `VITE_GOOGLE_SCRIPT_URL` in your hosting provider's Environment Variables settings before deploying.
