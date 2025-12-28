import React from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.webp';

const Hero = () => {
    return (
        <div className="relative bg-gray-900 text-white overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Solar Energy Solutions"
                    className="w-full h-full object-cover object-center opacity-60"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900"></div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 lg:px-8 flex flex-col justify-center min-h-[60vh] lg:min-h-[70vh]">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
                        <Sun className="text-yellow-400 w-4 h-4 animate-spin-slow" />
                        <span className="text-sm font-medium text-gray-200">Leading Internal Solar Solutions</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Power Your Future with <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Sustainable Energy</span>
                    </h1>

                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                        SR CORPORATION transforms businesses with award-winning commercial solar installations. Reduce overheads, gain energy independence, and build a greener tomorrow.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <a
                            href="https://wa.me/8801619031996"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-primary hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1"
                        >
                            Get Your Free Quote
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </a>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/40"
                        >
                            View Our Products
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                        <div>
                            <p className="text-3xl font-bold text-white">500+</p>
                            <p className="text-sm text-gray-400">Installations</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">20MW+</p>
                            <p className="text-sm text-gray-400">Power Generated</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">৳50M+</p>
                            <p className="text-sm text-gray-400">Client Savings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
