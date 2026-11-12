<?php
/**
 * ClipsLab Media — Administrator Authentication & Credentials API
 * Stores and validates administrator credentials persistently on the server backend.
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

define('AUTH_INCLUDED', true);
$configFile = __DIR__ . '/admin_config.php';

function loadAdminConfig($file) {
    if (file_exists($file)) {
        $cfg = @include $file;
        if (is_array($cfg) && !empty($cfg['password'])) {
            return $cfg;
        }
    }
    return [
        'userId' => 'admin',
        'password' => 'clipslab2026',
        'updatedAt' => date('c')
    ];
}

function saveAdminConfig($file, $data) {
    $code = "<?php\nif (!defined('AUTH_INCLUDED')) {\n    http_response_code(403);\n    exit('Access Denied');\n}\n\nreturn " . var_export($data, true) . ";\n";
    return @file_put_contents($file, $code, LOCK_EX) !== false;
}

$config = loadAdminConfig($configFile);

// Handle GET: Retrieve current credentials for the authenticated security modal
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'success',
        'userId' => $config['userId'] ?? 'admin',
        'password' => $config['password'] ?? 'clipslab2026',
        'updatedAt' => $config['updatedAt'] ?? ''
    ]);
    exit;
}

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload || !is_array($payload)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
        exit;
    }

    $action = $payload['action'] ?? 'login';

    // 1. LOGIN ACTION
    if ($action === 'login') {
        $inputId = trim(strtolower($payload['userId'] ?? ''));
        $inputPwd = trim($payload['password'] ?? '');

        $validIds = ['admin', 'harsh', 'clipslab'];
        if (!empty($config['userId'])) {
            $validIds[] = strtolower(trim($config['userId']));
        }

        $expectedPassword = trim($config['password'] ?? 'clipslab2026');

        if (in_array($inputId, $validIds, true) && $inputPwd === $expectedPassword) {
            echo json_encode([
                'status' => 'success',
                'authenticated' => true,
                'userId' => $config['userId'] ?? 'admin',
                'message' => 'Login successful'
            ]);
            exit;
        }

        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'authenticated' => false,
            'message' => 'Invalid User ID or Password. Please try again.'
        ]);
        exit;
    }

    // 2. UPDATE CREDENTIALS ACTION
    if ($action === 'update') {
        $newUserId = trim($payload['newUserId'] ?? '');
        $newPassword = trim($payload['newPassword'] ?? '');

        if (empty($newPassword)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Password cannot be empty.']);
            exit;
        }

        $config['userId'] = !empty($newUserId) ? $newUserId : ($config['userId'] ?? 'admin');
        $config['password'] = $newPassword;
        $config['updatedAt'] = date('c');

        $saved = saveAdminConfig($configFile, $config);

        if (!$saved) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Could not save admin_config.php. Check server file write permissions.'
            ]);
            exit;
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Administrator credentials updated and saved permanently to backend server!',
            'userId' => $config['userId'],
            'password' => $config['password'],
            'updatedAt' => $config['updatedAt']
        ]);
        exit;
    }

    // 3. GET ACTION VIA POST
    if ($action === 'get') {
        echo json_encode([
            'status' => 'success',
            'userId' => $config['userId'] ?? 'admin',
            'password' => $config['password'] ?? 'clipslab2026',
            'updatedAt' => $config['updatedAt'] ?? ''
        ]);
        exit;
    }
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
exit;
