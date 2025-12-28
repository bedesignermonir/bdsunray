import React, { useState } from 'react';
import { ArrowRight, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import productsData from '../data/products.json';

export const products = productsData.map(product => ({
    ...product,
    name: product.title,
    fullDesc: product.description,
    shortDesc: product.description.split('.')[0] + '.',
    // Ensure image path is absolute from public
    image: product.image,
    // Add support for multiple images
    image1: product.image1,
    image2: product.image2,
    image3: product.image3,
    image4: product.image4,
    image5: product.image5
}));

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-[90vw] sm:w-full max-w-2xl overflow-hidden relative animate-scale-up max-h-[85vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1.5 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors z-10"
                >
                    <X size={18} />
                </button>

                <div className="grid md:grid-cols-2">
                    <div className="h-40 md:h-auto relative bg-gray-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain md:object-cover mix-blend-multiply"
                        />
                    </div>
                    <div className="p-4 md:p-8 flex flex-col">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{product.category}</span>
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h2>

                        <p className="text-gray-600 mb-4 flex-grow text-xs md:text-base leading-relaxed">{product.shortDesc}</p>

                        <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex items-center justify-between">
                                <span className="text-xl md:text-2xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                            </div>
                            <Link
                                to={`/products/${product.id}`}
                                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                Continue Reading
                                <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="bg-white py-12 text-center shadow-sm">
                <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
                <p className="mt-4 text-xl text-gray-600">High-Quality Solar Equipment</p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mx-2"
                                    >
                                        <Eye size={18} /> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">{product.category}</span>
                                    <span className="font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.shortDesc}</p>

                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="w-full border border-gray-200 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-50 hover:text-primary hover:border-primary transition-all"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Render Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default Products;
