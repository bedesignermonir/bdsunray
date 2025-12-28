import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="bg-primary py-16 text-center text-white">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="mt-4 text-xl opacity-90">Get in touch with SR CORPORATION</p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Head Office</h3>
                                    <p className="text-gray-600">Kaptan Bazar Complex, Bhaban No-1, Shop No-191</p>
                                    <p className="text-gray-600">Wari, Dhaka-1203</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Branch Office</h3>
                                    <p className="text-gray-600">154, Nawabpur Road</p>
                                    <p className="text-gray-600">Dhaka-1100</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-6 h-6 text-primary mr-4 shrink-0" />
                                <div>
                                    <p className="text-gray-600">+880 161 903 1996</p>
                                    <p className="text-gray-600">+880 174 903 1996</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-6 h-6 text-primary mr-4 shrink-0" />
                                <p className="text-gray-600">raselsolarhouse@gmail.com</p>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-6 h-6 text-primary mr-4 shrink-0" />
                                <p className="text-gray-600">Sat - Thu: 9:00 AM - 8:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Simple Map or Contact Form Placeholder */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg h-full min-h-[400px]">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
