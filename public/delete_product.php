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

    $jsonFile = 'data/products.json';

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

    // Find the product to delete
    $productIndex = -1;
    $productToDelete = null;
    foreach ($products as $index => $product) {
        if (isset($product['id']) && $product['id'] == $productId) {
            $productIndex = $index;
            $productToDelete = $product;
            break;
        }
    }

    if ($productIndex === -1) {
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }

    // 3. Delete associated images
    $uploadDir = 'products/';
    $imagesToDelete = array($productToDelete['image'], $productToDelete['image1'], $productToDelete['image2'], $productToDelete['image3'], $productToDelete['image4'], $productToDelete['image5']);

    foreach ($imagesToDelete as $imgPath) {
        if ($imgPath && strpos($imgPath, '/products/') === 0) {
            $filePath = '.' . $imgPath;
            if (file_exists($filePath) && is_writable($filePath)) {
                unlink($filePath);
            }
        }
    }

    // 4. Remove product from array
    array_splice($products, $productIndex, 1);

    // 5. Save updated products
    if (file_put_contents($jsonFile, json_encode($products, JSON_PRETTY_PRINT))) {
        $response["success"] = true;
        $response["message"] = "Product deleted successfully!";
    } else {
        $response["success"] = false;
        $response["message"] = "Error updating products file.";
    }

    echo json_encode($response);

} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>