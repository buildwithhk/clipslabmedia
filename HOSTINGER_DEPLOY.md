# Deploying ClipsLab Media to Hostinger via GitHub

This project is pre-configured with a GitHub Actions workflow ([`.github/workflows/deploy-hostinger.yml`](.github/workflows/deploy-hostinger.yml)) that automatically builds your Vite + React website (`dist/`) whenever you push to `main` and publishes the ready-to-serve production files (including `.htaccess`) to a `deploy` branch.

This works on **all Hostinger Web Hosting plans** (Shared, Premium, Business, and Cloud), even plans that do not include server-side Node.js builds.

---

## Step 1: Push This Project to GitHub

1. Create a new repository on GitHub (for example `clipslabmedia-website` — **do not** initialize it with a README or `.gitignore`).
2. In this folder, link and push your `main` branch:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/clipslabmedia-website.git
   git push -u origin main
   ```
3. Open the **Actions** tab in your GitHub repository and wait ~30 seconds for **Build and Deploy to Hostinger Branch** to finish with a green checkmark. This creates the `deploy` branch containing your compiled `dist/` site.

---

## Step 2: Connect GitHub to Hostinger (hPanel)

1. Log in to **Hostinger hPanel** → **Websites** → click **Manage** on your domain (`clipslabmedia.com`).
2. Go to **Advanced → Git** in the left sidebar.
3. Under **Create a New Repository**:
   - **Repository:** Paste your GitHub repository URL (`https://github.com/YOUR_USERNAME/clipslabmedia-website.git`).
     - *(If your GitHub repo is private, copy the SSH key shown in Hostinger and add it under GitHub Repo → **Settings → Deploy keys**, or use a public/deploy-key setup.)*
   - **Branch:** `deploy`
   - **Install Path:** Leave empty (so it deploys directly to `public_html/`).
4. Click **Create**, then click **Deploy**.
   - *(Note: If Hostinger asks to clear `public_html` first—for example removing Hostinger's default `default.php`—confirm or delete `default.php` from File Manager so your `index.html` loads.)*

---

## Step 3: Enable Automatic Updates on Every Push

1. In Hostinger **Advanced → Git**, click **Auto Deployment** and copy the **Webhook URL** Hostinger gives you.
2. Open your GitHub repository → **Settings → Secrets and variables → Actions → New repository secret**:
   - **Name:** `HOSTINGER_WEBHOOK_URL`
   - **Secret:** Paste the Hostinger Webhook URL.

From now on, whenever you push changes to `main` on GitHub:
1. GitHub Actions automatically builds `npm run build` and updates the `deploy` branch.
2. GitHub Actions pings `HOSTINGER_WEBHOOK_URL` so Hostinger automatically pulls the latest build live!

---

## Optional: SSL & Domain Check

In Hostinger hPanel → **Security → SSL**, verify your SSL certificate is active and turn on **Force HTTPS**.
