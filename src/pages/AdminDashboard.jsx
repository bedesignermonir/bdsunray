import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, LogOut, Save, Upload, Check, X, AlertTriangle, ChevronDown, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [viewMode, setViewMode] = useState('menu'); // 'menu', 'add', 'edit'
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    
    // Login state
    const [credentials, setCredentials] = useState({ userId: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Form State (Shared for Add/Edit)
    const [selectedProductId, setSelectedProductId] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        price: '',
        stockStatus: 'In Stock', // Default
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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const storedLogin = localStorage.getItem('adminLoggedIn');
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Using ?t to prevent caching of the JSON
            const response = await fetch(`${API_BASE_URL}/data/products.json?t=${Date.now()}`);
            if (!response.ok) throw new Error('Failed to fetch product data');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setStatus({ type: 'error', message: 'Network error: Could not reach the server to fetch product data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.userId === 'bdsunray' && credentials.password === 'B@ngladesh2025') {
            setIsLoggedIn(true);
            localStorage.setItem('adminLoggedIn', 'true');
            setLoginError('');
            fetchProducts();
        } else {
            setLoginError('Invalid ID or Password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('adminLoggedIn');
        navigate('/');
    };

    const resetForm = () => {
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
            img5: null,
        });
        setImagePreviews({
            main: null,
            img1: null,
            img2: null,
            img3: null,
            img4: null,
            img5: null,
        });
        setSelectedProductId('');
    };

    const handleProductSelect = (productId) => {
        setSelectedProductId(productId);
        if (!productId) {
            resetForm();
            return;
        }

        const product = products.find(p => p.id == productId);
        if (product) {
            setFormData({
                title: product.title || '',
                type: product.type || '',
                price: product.price || '',
                stockStatus: product.stockStatus || 'In Stock',
                description: product.description || '',
                specs: Array.isArray(product.specs) ? product.specs.join(', ') : '',
                category: product.category || '',
            });
            setImagePreviews({
                main: product.image || null,
                img1: product.image1 || null,
                img2: product.image2 || null,
                img3: product.image3 || null,
                img4: product.image4 || null,
                img5: product.image5 || null,
            });
            setImageFiles({
                main: null,
                img1: null,
                img2: null,
                img3: null,
                img4: null,
                img5: null,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, imgType) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImageFiles(prev => ({ ...prev, [imgType]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({ ...prev, [imgType]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'loading', message: viewMode === 'add' ? 'Publishing new product...' : 'Saving updates...' });

        try {
            const data = new FormData();
            if (viewMode === 'edit') {
                data.append('id', selectedProductId);
            }
            
            data.append('title', formData.title);
            data.append('type', formData.type);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('stockStatus', formData.stockStatus);
            data.append('category', formData.category);
            
            const specsArray = formData.specs.split(',').map(s => s.trim()).filter(s => s !== '');
            data.append('specs', JSON.stringify(specsArray));

            // Append new images only if selected
            if (imageFiles.main) data.append('image', imageFiles.main);
            if (imageFiles.img1) data.append('image1', imageFiles.img1);
            if (imageFiles.img2) data.append('image2', imageFiles.img2);
            if (imageFiles.img3) data.append('image3', imageFiles.img3);
            if (imageFiles.img4) data.append('image4', imageFiles.img4);
            if (imageFiles.img5) data.append('image5', imageFiles.img5);

            const endpoint = viewMode === 'add' ? `${API_BASE_URL}/add_product.php` : `${API_BASE_URL}/update_product.php`;
            
            const response = await fetch(endpoint, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: result.message });
                await fetchProducts();
                if (viewMode === 'add') {
                   resetForm();
                }
                setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            } else {
                setStatus({ type: 'error', message: result.message || 'Action failed.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Connection failure: Server is unreachable.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedProductId) return;
        setIsSubmitting(true);
        setStatus({ type: 'loading', message: 'Removing product from catalog...' });

        try {
            const data = new FormData();
            data.append('id', selectedProductId);

            const response = await fetch(`${API_BASE_URL}/delete_product.php`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: 'Deleted successfully!' });
                await fetchProducts();
                resetForm();
                setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            } else {
                setStatus({ type: 'error', message: result.message || 'Delete failed.' });
            }
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', message: 'Operation failed. Server is unreachable.' });
        } finally {
            setIsSubmitting(false);
            setShowDeleteConfirm(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="text-primary" size={40} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Login</h1>
                        <p className="text-gray-500 mt-2">Manage your solar infrastructure and inventory</p>
                    </div>
                    {loginError && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">
                            <div className="flex items-center">
                                <AlertTriangle className="mr-2" size={18} />
                                {loginError}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">User ID</label>
                            <input
                                type="text"
                                value={credentials.userId}
                                onChange={(e) => setCredentials(prev => ({ ...prev, userId: e.target.value }))}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder-gray-400"
                                required
                                placeholder="bdsunray"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder-gray-400"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 transform active:scale-95 duration-200"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white md:bg-gray-50 pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Fixed Topbar Feedback */}
                {status.message && (
                    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-12 duration-300 border ${
                        status.type === 'success' ? 'bg-green-600 text-white border-green-400' :
                        status.type === 'loading' ? 'bg-primary text-white border-primary/50' :
                        'bg-red-600 text-white border-red-400'
                    }`}>
                        {status.type === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : status.type === 'success' ? (
                            <Check className="shrink-0" size={20} />
                        ) : (
                            <AlertTriangle className="shrink-0" size={20} />
                        )}
                        <span className="font-bold text-sm">{status.message}</span>
                        <button onClick={() => setStatus({type: '', message: ''})} className="ml-auto opacity-70 hover:opacity-100">
                           <X size={18} />
                        </button>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col">
                    {/* Interior Header */}
                    <header className="p-8 border-b border-gray-50 flex items-center justify-between bg-primary md:bg-white text-white md:text-gray-900">
                        <div className="flex items-center gap-4">
                            {viewMode !== 'menu' && (
                                <button 
                                    onClick={() => { setViewMode('menu'); resetForm(); }}
                                    className="p-2 hover:bg-white/10 md:hover:bg-gray-100 rounded-full transition-colors text-white md:text-gray-500"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <div>
                                <h1 className="text-2xl font-black tracking-tight leading-none">
                                    {viewMode === 'menu' ? 'Admin Controller' : (viewMode === 'add' ? 'Add New Item' : 'Edit Existing')}
                                </h1>
                                <p className="text-xs font-bold opacity-70 mt-1 uppercase tracking-widest hidden md:block">Inventory System Management</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 md:bg-gray-100 text-white md:text-gray-700 px-4 py-2 rounded-xl text-sm font-black hover:bg-red-600 md:hover:bg-red-50 md:hover:text-red-500 transition-all flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </header>

                    <div className="flex-grow p-8">
                        {/* VIEW: MENU */}
                        {viewMode === 'menu' && (
                            <div className="h-full flex flex-col items-center justify-center py-12 gap-8 md:flex-row max-w-3xl mx-auto">
                                <button
                                    onClick={() => setViewMode('add')}
                                    className="w-full group bg-white border-2 border-primary/20 rounded-3xl p-10 hover:border-primary hover:bg-primary/5 transition-all text-center flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Plus size={36} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Add New Product</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">Launch a new solar product to your public catalog and inventory list.</p>
                                </button>

                                <button
                                    onClick={() => setViewMode('edit')}
                                    className="w-full group bg-white border-2 border-primary/20 rounded-3xl p-10 hover:border-primary hover:bg-primary/5 transition-all text-center flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Edit3 size={36} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800">Manage Inventory</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">Update existing product specs, upload new images, or remove items from the catalog.</p>
                                </button>
                            </div>
                        )}

                        {/* VIEW: EDIT (Selection) */}
                        {viewMode === 'edit' && !selectedProductId && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-black text-gray-500 uppercase tracking-widest">Select Catalog Item</label>
                                    <div className="relative group">
                                        <select
                                            value={selectedProductId}
                                            onChange={(e) => handleProductSelect(e.target.value)}
                                            className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none font-black text-gray-700 text-lg group-hover:bg-white duration-200"
                                        >
                                            <option value="">-- Choose from {products.length} products --</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.title} (#{p.id})</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:text-primary transition-colors" size={24} />
                                    </div>
                                </div>
                                <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl text-center">
                                    <p className="text-gray-400 font-medium italic">Please select an item from the dropdown to unlock the edit controls.</p>
                                </div>
                            </div>
                        )}

                        {/* VIEW: ADD or EDIT (Form) */}
                        {(viewMode === 'add' || (viewMode === 'edit' && selectedProductId)) && (
                            <form onSubmit={handleSubmit} className="space-y-12 max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {/* Edit Header Actions */}
                                    <div className="col-span-2 flex items-center justify-between py-4 border-b border-gray-50 mb-4">
                                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                            {viewMode === 'add' ? 'Creating New Entry' : `ID: #${selectedProductId}`}
                                        </span>
                                        {viewMode === 'edit' && (
                                            <button
                                                type="button"
                                                onClick={() => setShowDeleteConfirm(true)}
                                                className="text-red-500 hover:text-red-700 font-black text-sm flex items-center gap-1.5 underline decoration-2 underline-offset-4"
                                            >
                                                <Trash2 size={16} /> Delete Product
                                            </button>
                                        )}
                                    </div>

                                    {/* Text Fields */}
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Product Title (Name)</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-xl font-bold bg-gray-50/50"
                                            placeholder="550W Mono Half Cell Solar Panel"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Type / Variant</label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold bg-gray-50/50 text-gray-700"
                                            placeholder="Monocrystalline"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Price (৳ BDT)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-black text-xl bg-gray-50/50"
                                                placeholder="0.00"
                                                required
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 font-black">৳</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Current Status</label>
                                        <select
                                            name="stockStatus"
                                            value={formData.stockStatus}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all bg-gray-50/50 font-black text-gray-700 appearance-none"
                                        >
                                            <option value="In Stock">✅ In Stock</option>
                                            <option value="Out of Stock">❌ Out of Stock</option>
                                            <option value="Hidden">👻 Hidden (Testing)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Catalog Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all bg-gray-50/50 font-black text-gray-700 appearance-none"
                                            required
                                        >
                                            <option value="">-- Choose Category --</option>
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
                                    </div>

                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Public Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-6 py-5 border-2 border-gray-100 rounded-3xl focus:border-primary focus:bg-white outline-none transition-all font-medium leading-relaxed bg-gray-50/50"
                                            placeholder="Write a compelling description for this product..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest">Specifications (Comma Separated)</label>
                                        <textarea
                                            name="specs"
                                            value={formData.specs}
                                            onChange={handleInputChange}
                                            rows="2"
                                            className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium bg-gray-50/50"
                                            placeholder="Efficiency: 21%, Power: 550W, Warranty: 25 Years"
                                        ></textarea>
                                    </div>

                                    {/* Image Management Section */}
                                    <div className="col-span-2 pt-6">
                                        <div className="flex flex-col gap-1 mb-8">
                                            <h3 className="text-lg font-black text-gray-800">Media Gallery (6 Slots)</h3>
                                            <p className="text-xs font-bold text-gray-400">Main image is required. Additional slots are for the product slider.</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                            {/* Slot Map */}
                                            {['main', 'img1', 'img2', 'img3', 'img4', 'img5'].map((key, i) => (
                                                <div key={key} className="space-y-3">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight block text-center truncate">
                                                        {key === 'main' ? 'Primary' : `Slot ${i}`}
                                                    </span>
                                                    <div className="relative aspect-[4/5] rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden hover:border-primary hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md duration-300">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleImageChange(e, key)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            accept="image/*"
                                                            required={key === 'main' && viewMode === 'add'}
                                                        />
                                                        {imagePreviews[key] ? (
                                                            <div className="relative w-full h-full">
                                                                <img src={imagePreviews[key]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 shadow-inner" alt={key} />
                                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <Upload className="text-white drop-shadow-lg" size={24} />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2 text-gray-200 group-hover:text-primary/40 transition-colors">
                                                                <Upload size={24} />
                                                                <span className="text-[10px] font-black uppercase">Upload</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Persistent Save Button */}
                                <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row items-center gap-6">
                                    <button
                                        type="button"
                                        onClick={() => { setViewMode('menu'); resetForm(); }}
                                        className="w-full md:w-auto px-10 py-5 bg-gray-100 text-gray-600 rounded-3xl font-black text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 active:scale-95 duration-200"
                                    >
                                        <X size={20} /> Close Editor
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex-grow py-6 bg-primary text-white rounded-3xl font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 active:scale-95 duration-200 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Save size={28} />
                                                {viewMode === 'add' ? 'Publish to Cloud' : 'Commit Changes'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Status Help */}
                {viewMode === 'menu' && (
                    <div className="mt-8 text-center text-gray-400 text-sm font-medium animate-pulse">
                        Logged in as <span className="font-black text-gray-900 underline decoration-primary underline-offset-4">bdsunray</span> • XAMPP Proxy Active
                    </div>
                )}
            </div>

            {/* Delete Confirmer */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-12 text-center">
                            <div className="w-28 h-28 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce transition-all">
                                <Trash2 size={56} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Destroy Entry?</h2>
                            <p className="text-gray-500 leading-relaxed mb-10 text-lg">
                                This will permanently remove <br/>
                                <span className="font-black text-gray-900">"{formData.title}"</span> <br/>
                                and all its data from the cloud database.
                            </p>
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-red-600 text-white rounded-3xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 active:scale-95 duration-200"
                                >
                                    Yes, Delete Forever
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-gray-100 text-gray-700 rounded-3xl font-black text-xl hover:bg-gray-200 transition-all active:scale-95 duration-200"
                                >
                                    Cancel, Keep Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
