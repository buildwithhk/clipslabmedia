/**
 * ClipsLab Media — Live Video & Configuration Sync Script
 * 
 * Fetches current live video projects and settings from https://clipslabmedia.com
 * and updates local code:
 *   1. public/api/videos.json
 *   2. src/data/projects.ts
 *   3. public/api/admin_config.php
 * 
 * Run manually: npm run sync-videos
 * Runs automatically during CI/CD build before bundling dist/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const LIVE_VIDEOS_URL = process.env.LIVE_VIDEOS_URL || 'https://clipslabmedia.com/api/videos.php';
const LIVE_AUTH_URL = process.env.LIVE_AUTH_URL || 'https://clipslabmedia.com/api/auth.php';

const videosJsonPath = path.join(rootDir, 'public', 'api', 'videos.json');
const projectsTsPath = path.join(rootDir, 'src', 'data', 'projects.ts');
const adminConfigPhpPath = path.join(rootDir, 'public', 'api', 'admin_config.php');

async function fetchWithTimeout(url, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ClipsLab-SyncScript/1.0' }
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function syncVideos() {
  console.log(`[sync-live] Fetching live videos from ${LIVE_VIDEOS_URL}...`);
  try {
    const res = await fetchWithTimeout(LIVE_VIDEOS_URL);
    if (!res.ok) {
      console.warn(`[sync-live] Server returned HTTP ${res.status}. Keeping existing local files.`);
      return false;
    }

    const data = await res.json();
    if (!data || data.status !== 'success' || !Array.isArray(data.projects)) {
      console.warn('[sync-live] Response did not contain valid projects list. Keeping existing local files.');
      return false;
    }

    // 1. Update public/api/videos.json
    const formattedJson = JSON.stringify(data, null, 2) + '\n';
    fs.writeFileSync(videosJsonPath, formattedJson, 'utf-8');
    console.log(`[sync-live] Updated ${path.relative(rootDir, videosJsonPath)} (${data.projects.length} projects).`);

    // 2. Generate and update src/data/projects.ts
    const tsContent = `import { ProjectItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = ${JSON.stringify(data.projects, null, 2)};

export const PROJECTS_DATA = INITIAL_PROJECTS;
`;
    fs.writeFileSync(projectsTsPath, tsContent, 'utf-8');
    console.log(`[sync-live] Updated ${path.relative(rootDir, projectsTsPath)} with live projects.`);

    return true;
  } catch (err) {
    console.warn(`[sync-live] Could not reach live videos endpoint: ${err.message}. Keeping local files.`);
    return false;
  }
}

async function syncAdminConfig() {
  console.log(`[sync-live] Checking live admin credentials from ${LIVE_AUTH_URL}...`);
  try {
    const res = await fetchWithTimeout(LIVE_AUTH_URL);
    if (!res.ok) return false;

    const data = await res.json();
    if (!data || data.status !== 'success' || !data.userId || !data.password) {
      return false;
    }

    const safeUserId = String(data.userId).replace(/['\\]/g, '');
    const safePassword = String(data.password).replace(/['\\]/g, '');
    const safeUpdatedAt = String(data.updatedAt || new Date().toISOString()).replace(/['\\]/g, '');

    const phpContent = `<?php
if (!defined('AUTH_INCLUDED')) {
    http_response_code(403);
    exit('Access Denied');
}

return [
    'userId' => '${safeUserId}',
    'password' => '${safePassword}',
    'updatedAt' => '${safeUpdatedAt}'
];
`;
    fs.writeFileSync(adminConfigPhpPath, phpContent, 'utf-8');
    console.log(`[sync-live] Preserved live admin credentials in ${path.relative(rootDir, adminConfigPhpPath)}.`);
    return true;
  } catch (err) {
    console.warn(`[sync-live] Could not fetch live auth: ${err.message}.`);
    return false;
  }
}

async function main() {
  console.log('--- ClipsLab Media: Live Data Synchronization ---');
  await syncVideos();
  await syncAdminConfig();
  console.log('--- Sync check finished cleanly ---');
}

main().catch((err) => {
  console.error('[sync-live] Unexpected error:', err);
  process.exit(0); // Never fail the build on sync failure
});
