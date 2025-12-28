import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Products', href: '/products' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleNavClick = (href) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white py-4'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            {/* Placeholder Logo or Image */}
                            <img src="/logo.png" alt="SR CORPORATION" className="h-10 w-10 object-contain" />

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            item.href.startsWith('#') ? (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                    className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                        <a
                            href="https://wa.me/8801619031996"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                        >
                            Get Quote
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {/* Animated Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <span className="font-bold text-lg text-gray-900">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                        {navItems.map((item) => (
                            item.href.startsWith('#') ? (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                        setIsOpen(false);
                                    }}
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 transition-all border-l-4 border-transparent hover:border-primary"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 transition-all border-l-4 border-transparent hover:border-primary"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                    <div className="p-4 border-t bg-gray-50">
                        <a
                            href="https://wa.me/8801619031996"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Get a Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
