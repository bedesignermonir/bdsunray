import React, { useState, useEffect } from 'react';
import { Upload, Plus, Save } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Superman = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ userId: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Product Form State
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        price: '',
        stockStatus: 'In Stock',
        description: '',
        specs: '',
        category: '',
    });
    const [imageFiles, setImageFiles] = useState({
        main: null,
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
    });
    const [imagePreviews, setImagePreviews] = useState({
        main: null,
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedLogin = localStorage.getItem('adminLoggedIn');
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.userId === 'bdsunray' && credentials.password === 'B@ngladesh2025') {
            setIsLoggedIn(true);
            localStorage.setItem('adminLoggedIn', 'true');
            setLoginError('');
        } else {
            setLoginError('Invalid ID or Password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('adminLoggedIn');
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Product title is required';
        }

        if (!formData.type.trim()) {
            newErrors.type = 'Product type is required';
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            newErrors.price = 'Price must be a positive number';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.specs.trim()) {
            newErrors.specs = 'At least one specification is required';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        if (!imageFiles.main) {
            newErrors.mainImage = 'Main product image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e, imgType) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImageFiles(prev => ({ ...prev, [imgType]: file }));
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({ ...prev, [imgType]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
        // Clear error
        if (errors[imgType === 'main' ? 'mainImage' : imgType]) {
            setErrors(prev => ({ ...prev, [imgType === 'main' ? 'mainImage' : imgType]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form.' });
            return;
        }

        setSubmitStatus({ type: 'loading', message: 'Adding product...' });

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('type', formData.type);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('stockStatus', formData.stockStatus);

            // Convert comma-separated specs to JSON array
            const specsArray = formData.specs.split(',').map(item => item.trim()).filter(item => item !== '');
            data.append('specs', JSON.stringify(specsArray));

            data.append('category', formData.category);

            // Append all images
            if (imageFiles.main) {
                data.append('image', imageFiles.main);
            }
            if (imageFiles.img1) {
                data.append('image1', imageFiles.img1);
            }
            if (imageFiles.img2) {
                data.append('image2', imageFiles.img2);
            }
            if (imageFiles.img3) {
                data.append('image3', imageFiles.img3);
            }
            if (imageFiles.img4) {
                data.append('image4', imageFiles.img4);
            }
            if (imageFiles.img5) {
                data.append('image5', imageFiles.img5);
            }

            const response = await fetch(`${API_BASE_URL}/add_product.php`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus({ type: 'success', message: 'Product added successfully!' });
                // Reset form
                setFormData({
                    title: '',
                    type: '',
                    price: '',
                    stockStatus: 'In Stock',
                    description: '',
                    specs: '',
                    category: '',
                });
                setImageFiles({
                    main: null,
                    img1: null,
                    img2: null,
                    img3: null,
                    img4: null,
                });
                setImagePreviews({
                    main: null,
                    img1: null,
                    img2: null,
                    img3: null,
                    img4: null,
                });
                setErrors({});
                // Reset file inputs
                document.querySelectorAll('input[type="file"]').forEach(input => {
                    input.value = '';
                });
            } else {
                setSubmitStatus({ type: 'error', message: result.message || 'Failed to add product.' });
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({ type: 'error', message: 'Network error occurred.' });
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h1>
                    {loginError && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
                            {loginError}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                            <input
                                type="text"
                                name="userId"
                                value={credentials.userId}
                                onChange={handleLoginChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleLoginChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 bg-primary text-white flex justify-between items-center">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Plus size={24} /> Add New Product
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="p-4">
                        {submitStatus.message && (
                            <div className={`p-4 rounded-lg text-center font-medium ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : (submitStatus.type === 'loading' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700')}`}>
                                {submitStatus.message}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Title */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    placeholder="e.g. 5kW Solar Inverter"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    placeholder="e.g. Inverter"
                                />
                                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Price (BDT)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    placeholder="e.g. 50000"
                                    min="0"
                                    step="1"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            {/* Stock Status */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Stock Status</label>
                                <select
                                    name="stockStatus"
                                    value={formData.stockStatus}
                                    onChange={handleFormChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Hidden">Hidden</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white`}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="SOLAR PANEL">SOLAR PANEL</option>
                                    <option value="COMBO PACKAGE">COMBO PACKAGE</option>
                                    <option value="SOLAR IPS">SOLAR IPS</option>
                                    <option value="HOME IPS">HOME IPS</option>
                                    <option value="LITHIUM BATTERY">LITHIUM BATTERY</option>
                                    <option value="SOLAR CHARGE CONTROLLER">SOLAR CHARGE CONTROLLER</option>
                                    <option value="DC WIRE">DC WIRE</option>
                                    <option value="SOLAR TOOLS">SOLAR TOOLS</option>
                                    <option value="STREET LIGHT">STREET LIGHT</option>
                                    <option value="AVR">AVR</option>
                                    <option value="VFD">VFD</option>
                                    <option value="OTHERS">OTHERS</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            {/* Description */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows="4"
                                    className={`w-full px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    placeholder="Detailed product description..."
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Specifications */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Specifications (Comma Separated)</label>
                                <textarea
                                    name="specs"
                                    value={formData.specs}
                                    onChange={handleFormChange}
                                    rows="3"
                                    className={`w-full px-4 py-3 border ${errors.specs ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                                    placeholder="e.g. Power: 5kW, Efficiency: 98%, Warranty: 5 Years"
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">Enter each specification separated by commas.</p>
                                {errors.specs && <p className="text-red-500 text-sm mt-1">{errors.specs}</p>}
                            </div>

                            {/* Multiple Images */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Images</label>
                                <p className="text-xs text-gray-500 mb-3">Main image is required. Additional images are optional (max 5 more).</p>

                                {/* Main Image */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Main Image *</label>
                                    <div className={`border-2 border-dashed ${errors.mainImage ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group`}>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={(e) => handleImageChange(e, 'main')}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <div className="flex flex-col items-center pointer-events-none">
                                            {imagePreviews.main ? (
                                                <img src={imagePreviews.main} alt="Preview" className="max-h-32 max-w-full mb-2 rounded" />
                                            ) : (
                                                <>
                                                    <Upload className="text-gray-400 mb-2 group-hover:text-primary transition-colors" size={32} />
                                                    <span className="text-sm text-gray-500 font-medium group-hover:text-primary transition-colors">
                                                        Click to upload main image
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {errors.mainImage && <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>}
                                </div>

                                {/* Additional Images */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {['img1', 'img2', 'img3', 'img4', 'img5'].map((imgKey) => (
                                        <div key={imgKey}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image {imgKey.replace('img', '') === 'img1' ? '1 (optional)' : `${imgKey.replace('img', '')} (optional)`}</label>
                                            <div className={`border-2 border-dashed ${errors[imgKey] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group h-32`}>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageChange(e, imgKey)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    accept="image/*"
                                                />
                                                <div className="flex flex-col items-center pointer-events-none">
                                                    {imagePreviews[imgKey] ? (
                                                        <img src={imagePreviews[imgKey]} alt="Preview" className="max-h-20 max-w-full rounded" />
                                                    ) : (
                                                        <>
                                                            <Upload className="text-gray-400 mb-1 group-hover:text-primary transition-colors" size={24} />
                                                            <span className="text-xs text-gray-500">Upload</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {errors[imgKey] && <p className="text-red-500 text-xs mt-1">{errors[imgKey]}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={submitStatus.type === 'loading'}
                                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Save size={20} />
                                {submitStatus.type === 'loading' ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Superman;
