<?php
/**
 * ClipsLab Media — Live Video Control API
 * Allows the Studio Video Control Dashboard to update Showreel and Portfolio videos live.
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Auth');
header('Content-Type: application/json; charset=utf-8');

// Respond to OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$userFile = __DIR__ . '/videos.user.json';
$dataFile = __DIR__ . '/videos.json';

// Seed userFile from dataFile if userFile doesn't exist yet to permanently preserve custom videos
if (!file_exists($userFile) && file_exists($dataFile)) {
    @copy($dataFile, $userFile);
}

// Active storage file to serve from: prefer userFile (which is ignored by Git and never wiped), otherwise dataFile
$activeReadFile = (file_exists($userFile) && filesize($userFile) > 10) ? $userFile : $dataFile;

// Handle GET: Return current live videos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($activeReadFile)) {
        $content = @file_get_contents($activeReadFile);
        if ($content !== false && strlen(trim($content)) > 0) {
            echo $content;
            exit;
        }
    }

    // Default response if not yet customized
    echo json_encode([
        'status' => 'empty',
        'showreelVideoUrl' => '',
        'showreelThumbnail' => '',
        'projects' => []
    ]);
    exit;
}

// Handle POST: Save updated videos live
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload || !is_array($payload)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid JSON input'
        ]);
        exit;
    }

    // Preserve existing fields if partially updated
    $existing = [];
    if (file_exists($dataFile)) {
        $existingRaw = @file_get_contents($dataFile);
        if ($existingRaw) {
            $existing = json_decode($existingRaw, true) ?: [];
        }
    }

    $showreelUrl = isset($payload['showreelVideoUrl']) ? trim($payload['showreelVideoUrl']) : ($existing['showreelVideoUrl'] ?? '');
    $showreelThumb = isset($payload['showreelThumbnail']) ? trim($payload['showreelThumbnail']) : ($existing['showreelThumbnail'] ?? '');
    $projects = isset($payload['projects']) && is_array($payload['projects']) ? $payload['projects'] : ($existing['projects'] ?? []);

    $dataToSave = [
        'status' => 'success',
        'showreelVideoUrl' => $showreelUrl,
        'showreelThumbnail' => $showreelThumb,
        'projects' => $projects,
        'updatedAt' => date('c')
    ];

    // Save to BOTH userFile (which is ignored by Git and never wiped by redeployment) and dataFile
    $encoded = json_encode($dataToSave, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    $resUser = @file_put_contents($userFile, $encoded, LOCK_EX);
    $resData = @file_put_contents($dataFile, $encoded, LOCK_EX);

    if ($resUser === false && $resData === false) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Could not save videos. Check directory write permissions.'
        ]);
        exit;
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Videos updated live on website successfully',
        'data' => $dataToSave
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
exit;
