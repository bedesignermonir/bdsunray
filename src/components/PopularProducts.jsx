import React, { useState, useMemo } from 'react';
import { ArrowRight, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

// Reuse the modal definition or import it if better refactored, 
// but for now, I'll define a simplified version or reuse the same logic to ensure consistency.
// Ideally, ProductModal should be a shared component, but to avoid large refactors I will inline a simple view or just link to details.
// For the home page "Popular Products", usually just clicking to view details is enough.

const PopularProducts = () => {
    // Select 3 random products from the data
    const popularProducts = useMemo(() => {
        // Create a copy and shuffle
        const shuffled = [...productsData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3).map(product => ({
            ...product,
            name: product.title,
            shortDesc: product.description.split('.')[0] + '.',
            image: product.image
        }));
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Explore our top-rated solar solutions designed for maximum efficiency and savings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {popularProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                    >
                                        <Eye size={18} /> View Details
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">{product.category}</span>
                                    <span className="font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.shortDesc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold rounded-xl text-white bg-primary hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1"
                    >
                        View All Products
                        <ArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
