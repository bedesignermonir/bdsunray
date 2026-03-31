<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = array("success" => false, "message" => "");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Relative paths ensure it works in any directory structure (local or server)
    $uploadDir = 'products/';
    $jsonFile = 'data/products.json';

    // Ensure upload directory exists
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true)) {
            echo json_encode(["success" => false, "message" => "Failed to create upload directory."]);
            exit;
        }
    }

    $imagePath = "";
    $image1Path = "";
    $image2Path = "";
    $image3Path = "";
    $image4Path = "";

    // 1. Handle Primary Image Upload (required)
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Basic validation for image extension
        $allowedfileExtensions = array('jpg', 'gif', 'png', 'webp', 'jpeg');
        if (!in_array($fileExtension, $allowedfileExtensions)) {
             echo json_encode(["success" => false, "message" => "Upload failed. Allowed file types: " . implode(',', $allowedfileExtensions)]);
             exit;
        }

        // Generate detailed unique filename
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
        $dest_path = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            // Path to be saved in JSON (relative to public root)
            $imagePath = "/products/" . $newFileName;
        } else {
            echo json_encode(["success" => false, "message" => "Error moving uploaded file to destination."]);
            exit;
        }
    } else {
        echo json_encode(["success" => false, "message" => "No image uploaded or upload error code: " . ($_FILES['image']['error'] ?? 'N/A')]);
        exit;
    }

    // 2. Handle Additional Images (optional)
    $additionalImages = array('image1', 'image2', 'image3', 'image4', 'image5');
    foreach ($additionalImages as $index => $imgField) {
        $pathVar = $imgField . 'Path';
        if (isset($_FILES[$imgField]) && $_FILES[$imgField]['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES[$imgField]['tmp_name'];
            $fileName = $_FILES[$imgField]['name'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            if (!in_array($fileExtension, $allowedfileExtensions)) {
                // Continue but don't save this image - optional
                continue;
            }

            $newFileName = md5(time() . $fileName . rand(1000, 9999)) . '.' . $fileExtension;
            $dest_path = $uploadDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                ${$pathVar} = "/products/" . $newFileName;
            }
        }
    }

    // 3. Get Product Details
    $title = $_POST['title'] ?? '';
    $type = $_POST['type'] ?? '';
    $price = isset($_POST['price']) ? floatval($_POST['price']) : 0;
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $stockStatus = $_POST['stockStatus'] ?? 'In Stock';

    // Validate stock status
    $validStatuses = array('In Stock', 'Out of Stock', 'Hidden');
    if (!in_array($stockStatus, $validStatuses)) {
        $stockStatus = 'In Stock';
    }

    // Specs sent as JSON string from frontend
    $specs = isset($_POST['specs']) ? json_decode($_POST['specs']) : [];

    // 3. Read and Update JSON
    $currentData = [];

    if (file_exists($jsonFile)) {
        $jsonContent = file_get_contents($jsonFile);
        $currentData = json_decode($jsonContent, true);
        if (!is_array($currentData)) {
            $currentData = [];
        }
    } else {
        // Try creating the file if it doesn't exist (directory must exist)
        if (!file_exists(dirname($jsonFile))) {
             mkdir(dirname($jsonFile), 0777, true);
        }
    }

    // 4. Generate New ID
    $newId = 1;
    if (!empty($currentData)) {
        // Find max ID to be safe, rather than just end()
        $maxId = 0;
        foreach ($currentData as $item) {
            if (isset($item['id']) && $item['id'] > $maxId) {
                $maxId = $item['id'];
            }
        }
        $newId = $maxId + 1;
    }

    // 5. Create New Product Object matching JSON structure
    $newProduct = array(
        "id" => $newId,
        "title" => $title,
        "type" => $type,
        "price" => $price,
        "description" => $description,
        "specs" => $specs,
        "image" => $imagePath,
        "image1" => $image1Path,
        "image2" => $image2Path,
        "image3" => $image3Path,
        "image4" => $image4Path,
        "image5" => $image5Path,
        "category" => $category,
        "stockStatus" => $stockStatus
    );

    // 6. Append and Save
    $currentData[] = $newProduct;

    if (file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        $response["success"] = true;
        $response["message"] = "Product added successfully!";
    } else {
        $response["success"] = false;
        $response["message"] = "Error writing to JSON file.";
    }

    echo json_encode($response);

} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
