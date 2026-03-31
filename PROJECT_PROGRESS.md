# PROJECT PROGRESS - Solar Panel Wholesale Website

## Current Status
- **Vite (React)**: Running as the frontend framework.
- **Data Source**: Uses a local JSON file `data/products.json` in the public folder.
- **Routing**: `react-router-dom` is configured in `AppRoutes.jsx`.
- **Product Listing**: `Products.jsx` displays products from the JSON file.
- **Product Details**: `ProductDetails.jsx` handles individual product views.
- **Admin Pages**:
  - `Superman.jsx`: Form to add new products.
  - `AdminDashboard.jsx`: Dashboard to list, edit, and delete products.
- **Backend API**: PHP scripts (`add_product.php`, `update_product.php`, `delete_product.php`) handle JSON file updates and image uploads.

## Planned Features
- [ ] **Multiple Image Upload**: Transition from indexed fields (`image`, `image1`, etc.) to a gallery array. (Self-Correction: Existing system already handles up to 6 images, I will streamline this if needed or just refine the existing logic).
- [x] **Product Inventory Fields**: Add/Update 'Price' (numeric) and 'Stock Status' (In Stock / Out of Stock / Hidden).
- [x] **Admin Management Dashboard**:
  - [x] Toggle Status (In Stock / Out of Stock / Hidden) directly from the list.
  - [x] Edit Form (Pre-filled).
  - [x] Delete with Confirm Dialog.
- [ ] **Global Sync**: Ensure state updates immediately on the frontend. (Partial: Toggles now sync, need to double check other forms).
- [ ] **Quality & Error Checking**: Scan for Router mismatches and state bugs.

## Completed Tasks
- [x] Initial codebase analysis.
- [x] Creation of PROJECT_PROGRESS.md.
- [x] Implemented Product Inventory Fields: 'Price' and 'Stock Status' (In Stock / Out of Stock / Hidden).
- [x] **Redesigned Admin Dashboard (Two-Mode Interface)**:
  - [x] Added 'Add New Product' and 'Edit/Manage Products' mode toggles.
  - [x] Integrated product selection dropdown for editing existing items.
  - [x] Unified form handling for both creating and updating products.
  - [x] Implemented robust 6-slot image management (Main + 5 Gallery).
  - [x] Added high-contrast Delete with safety confirmation overlay.
  - [x] Enhanced UI with premium Tailwind animations and feedback states.
- [x] Implemented 'Hidden' status filtering in Products.jsx and PopularProducts.jsx.
- [x] Local Development Setup (XAMPP compatibility):
  - [x] Centralized `API_BASE_URL` in `src/config.js` for dynamic local/production targeting.
  - [x] Updated all fetch() calls in `AdminDashboard.jsx`, `Superman.jsx`, `Products.jsx`, etc.
  - [x] Implemented robust CORS headers with explicit `http_response_code(200)` for OPTIONS pre-flight requests in all PHP scripts.
  - [x] Verified all frontend fetch calls correctly target XAMPP via `API_BASE_URL`.
  - [x] Verified relative data paths for JSON and image storage.

## Pending Tasks
- [ ] Final UI/UX Polish for the Admin Dashboard.
- [ ] Move hardcoded Admin Credentials to a more secure environment config if possible.
- [ ] Double-check all image upload paths for production consistency.

## Local Development Setup
- **Frontend**: `npm run dev` (Port 5173).
- **Backend (XAMPP)**: `http://localhost/bdsunray-api/` (Port 80).
- **PHP Config**: CORS headers are enabled to allow cross-origin requests from Port 5173.
- **Data Path**: PHP files assume `products/` and `data/` are in the same directory as the scripts in XAMPP htdocs.

## Technical Notes
- **API Base**: Configured in `src/config.js`.
- **Data File**: `data/products.json`.
- **Image Uploads**: Saved to `/products/`.
- **Admin Credentials**: `bdsunray` / `B@ngladesh2025` (hardcoded in components).

