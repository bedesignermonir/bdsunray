import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10" id="contact">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            {/* Placeholder Logo  */}
                            <img src="/logo.png" alt="SR CORPORATION" className="h-10 w-10 object-contain bg-white rounded p-1" />
                            <span className="font-bold text-xl tracking-tight">SR CORPORATION</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering businesses with huge sustainable solar energy solutions. Join the renewable revolution today.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 inline-block">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Services', 'Case Studies', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Services</h3>
                        <ul className="space-y-4">
                            {['Commercial Solar PV', 'Battery Storage', 'EV Charging', 'Maintenance & Support'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                                <span className="text-gray-400">Kaptan Bazar Complex, Bhaban No-1, Shop No-191, Wari, Dhaka-1203</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                                <span className="text-gray-400">154, Nawabpur Road, Dhaka-1100</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-400">+880 161 903 1996</p>
                                    <p className="text-gray-400">+880 174 903 1996</p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                                <span className="text-gray-400">raselsolarhouse@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} SR CORPORATION. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
