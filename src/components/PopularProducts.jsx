import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const PopularProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/data/products.json`)
            .then(res => res.json())
            .then(data => {
                const mappedProducts = data
                    .filter(product => product.stockStatus !== 'Hidden') // Don't show hidden products
                    .map(product => ({
                        ...product,
                        name: product.title,
                        shortDesc: product.description.split('.')[0] + '.',
                        image: product.image,
                        stockStatus: product.stockStatus || 'In Stock'
                    }));
                setAllProducts(mappedProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load products", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-12 text-center bg-gray-50">Loading products...</div>;
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Explore our complete range of solar and electrical solutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {allProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className={`bg-white/90 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
                                            product.stockStatus === 'Out of Stock'
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-gray-900 hover:bg-white'
                                        }`}
                                        onClick={(e) => product.stockStatus === 'Out of Stock' && e.preventDefault()}
                                    >
                                        <Eye size={18} /> {product.stockStatus === 'Out of Stock' ? 'Unavailable' : 'View Details'}
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">{product.category}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                                        product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' :
                                        product.stockStatus === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {product.stockStatus}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={product.name}>{product.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.shortDesc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;

