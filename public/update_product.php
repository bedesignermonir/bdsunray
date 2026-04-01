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

    $uploadDir = 'products/';
    $jsonFile = 'data/products.json';

    // Ensure upload directory exists
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true)) {
            echo json_encode(["success" => false, "message" => "Failed to create upload directory."]);
            exit;
        }
    }

    // 1. Get Product ID
    $productId = isset($_POST['id']) ? intval($_POST['id']) : 0;
    if ($productId <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid product ID."]);
        exit;
    }

    // 2. Read existing products
    if (!file_exists($jsonFile)) {
        echo json_encode(["success" => false, "message" => "Products file not found."]);
        exit;
    }

    $jsonContent = file_get_contents($jsonFile);
    $products = json_decode($jsonContent, true);

    if (!is_array($products)) {
        echo json_encode(["success" => false, "message" => "Invalid products data."]);
        exit;
    }

    // Find the product to update
    $productIndex = -1;
    foreach ($products as $index => $product) {
        if (isset($product['id']) && $product['id'] == $productId) {
            $productIndex = $index;
            break;
        }
    }

    if ($productIndex === -1) {
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }

    // 3. Get updated product data
    $title = $_POST['title'] ?? $products[$productIndex]['title'];
    $type = $_POST['type'] ?? $products[$productIndex]['type'];
    $price = isset($_POST['price']) ? floatval($_POST['price']) : $products[$productIndex]['price'];
    $description = $_POST['description'] ?? $products[$productIndex]['description'];
    $category = $_POST['category'] ?? $products[$productIndex]['category'];
    $stockStatus = $_POST['stockStatus'] ?? $products[$productIndex]['stockStatus'];

    // Validate stock status
    $validStatuses = array('In Stock', 'Out of Stock', 'Hidden');
    if (!in_array($stockStatus, $validStatuses)) {
        $stockStatus = 'In Stock';
    }

    // Specs sent as JSON string from frontend
    if (isset($_POST['specs'])) {
        $specs = json_decode($_POST['specs']);
        if (!is_array($specs)) {
            $specs = $products[$productIndex]['specs'] ?? [];
        }
    } else {
        $specs = $products[$productIndex]['specs'] ?? [];
    }

    // 4. Handle image uploads (optional - only replace if new files provided)
    $allowedfileExtensions = array('jpg', 'gif', 'png', 'webp', 'jpeg');
    $currentProduct = $products[$productIndex];

    // Primary image
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        if (in_array($fileExtension, $allowedfileExtensions)) {
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $dest_path = $uploadDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Delete old image if exists
                if (isset($currentProduct['image']) && strpos($currentProduct['image'], '/products/') === 0) {
                    $oldFile = '.' . $currentProduct['image'];
                    if (file_exists($oldFile) && is_writable($oldFile)) {
                        unlink($oldFile);
                    }
                }
                $products[$productIndex]['image'] = "/products/" . $newFileName;
            }
        }
    }

    // Additional images (image1-5)
    $additionalImages = array('image1', 'image2', 'image3', 'image4', 'image5');
    foreach ($additionalImages as $imgField) {
        if (isset($_FILES[$imgField]) && $_FILES[$imgField]['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES[$imgField]['tmp_name'];
            $fileName = $_FILES[$imgField]['name'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            if (in_array($fileExtension, $allowedfileExtensions)) {
                $newFileName = md5(time() . $fileName . rand(1000, 9999)) . '.' . $fileExtension;
                $dest_path = $uploadDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    // Delete old image if exists
                    if (isset($currentProduct[$imgField]) && strpos($currentProduct[$imgField], '/products/') === 0) {
                        $oldFile = '.' . $currentProduct[$imgField];
                        if (file_exists($oldFile) && is_writable($oldFile)) {
                            unlink($oldFile);
                        }
                    }
                    $products[$productIndex][$imgField] = "/products/" . $newFileName;
                }
            }
        }
    }

    // 5. Update product fields
    $products[$productIndex]['title'] = $title;
    $products[$productIndex]['type'] = $type;
    $products[$productIndex]['price'] = $price;
    $products[$productIndex]['description'] = $description;
    $products[$productIndex]['specs'] = $specs;
    $products[$productIndex]['category'] = $category;
    $products[$productIndex]['stockStatus'] = $stockStatus;

    // 6. Save updated products
    if (file_put_contents($jsonFile, json_encode($products, JSON_PRETTY_PRINT))) {
        $response["success"] = true;
        $response["message"] = "Product updated successfully!";
    } else {
        $response["success"] = false;
        $response["message"] = "Error writing to JSON file.";
    }

    echo json_encode($response);

} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>