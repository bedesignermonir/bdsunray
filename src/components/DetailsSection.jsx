import React from 'react';
import detailsImage from '../assets/images/details.webp';
import { CheckCircle2, Zap, Building2, Home as HomeIcon } from 'lucide-react';

const DetailsSection = () => {
    const features = [
        {
            icon: <HomeIcon className="w-6 h-6 text-primary" />,
            title: "Residential Solutions",
            desc: "Complete solar systems for homes, reducing electricity bills and ensuring 24/7 power."
        },
        {
            icon: <Building2 className="w-6 h-6 text-primary" />,
            title: "Commercial & Industrial",
            desc: "Large-scale solar installations for factories and offices with high ROI and sustainability."
        },
        {
            icon: <Zap className="w-6 h-6 text-primary" />,
            title: "Premium Brands",
            desc: "We provide top-tier solar panels and inverters from world-renowned manufacturers."
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Side */}
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                            <img
                                src={detailsImage}
                                alt="Solar Usage and Partners"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-50 hidden sm:block animate-bounce-slow">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Certified Quality</p>
                                    <p className="text-lg font-bold text-gray-900">100% Reliable</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-primary font-bold tracking-wider uppercase text-sm">Why Choose Us</h2>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Comprehensive Solar Solutions for Every Need
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                At SR CORPORATION, we bring you the best-in-class solar technology. From residential rooftops to massive industrial setups, our solutions are designed for maximum efficiency and longevity.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {features.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="shrink-0 bg-blue-50 p-3 rounded-lg h-fit">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsSection;
