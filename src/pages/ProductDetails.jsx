import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Phone, Share2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/data/products.json`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('Fetched Data (Details):', data);
                
                // Safety check: ensure data is an array
                const productsArray = Array.isArray(data) ? data : (data.products || []);
                
                const foundProduct = productsArray.find(p => p.id == id);
                if (foundProduct && foundProduct.stockStatus !== 'Hidden') {
                    // Normalize product data structure matching the logic we used in Products.jsx to ensure safety
                    const normalizedProduct = {
                        ...foundProduct,
                        name: foundProduct.title,
                        fullDesc: foundProduct.description,
                        stockStatus: foundProduct.stockStatus || 'In Stock',
                        // Ensure optional images exist
                        image1: foundProduct.image1,
                        image2: foundProduct.image2,
                        image3: foundProduct.image3,
                        image4: foundProduct.image4,
                        image5: foundProduct.image5
                    };
                    setProduct(normalizedProduct);
                    setActiveImage(normalizedProduct.image);
                } else if (foundProduct && foundProduct.stockStatus === 'Hidden') {
                    // Product is hidden, treat as not found
                    setProduct(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load product detail:", err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="pt-32 text-center">Loading product details...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }

    // Collect all available images
    const allImages = [
        product.image,
        product.image1,
        product.image2,
        product.image3,
        product.image4,
        product.image5
    ].filter(img => img && img !== "");

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* Breadcrumb / Back */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Products
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
                        {/* Image Section */}
                        <div className="space-y-6">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative group">
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="flex flex-wrap gap-3">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img
                                                ? 'border-primary ring-2 ring-primary/20'
                                                : 'border-gray-200 hover:border-primary/50'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} view ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-primary font-bold rounded-full text-sm">
                                    {product.category}
                                </span>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                                    product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' :
                                    product.stockStatus === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {product.stockStatus}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                <span className="text-gray-500 text-lg">excl. VAT</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.fullDesc}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {product.specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                                        <span className="font-medium text-gray-700">{spec}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <a
                                    href="tel:+8801309229966"
                                    className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={(e) => product.stockStatus === 'Out of Stock' && e.preventDefault()}
                                >
                                    <Phone size={20} /> Call Now
                                </a>
                                <a
                                    href="https://wa.me/8801619031996"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 ${
                                        product.stockStatus === 'Out of Stock'
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-green-500 text-white hover:bg-green-600 transition-colors hover:shadow-green-500/30'
                                    }`}
                                    onClick={(e) => product.stockStatus === 'Out of Stock' && e.preventDefault()}
                                >
                                    <Share2 size={20} /> {product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Order Now'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
