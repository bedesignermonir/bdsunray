import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import SolarPanelIcon from '../assets/Icons/Solar Panel.svg';
import ComboPackageIcon from '../assets/Icons/Combo Package.svg';
import SolarIPSIcon from '../assets/Icons/Solar IPS.svg';
import RegularIPSIcon from '../assets/Icons/Regular IPS.svg';
import LithiumBatteryIcon from '../assets/Icons/Lithium Battery.svg';
import SolarChargeControllerIcon from '../assets/Icons/Solar Charge Controller.svg';
import DCWireIcon from '../assets/Icons/DC Wire.svg';
import SolarToolsIcon from '../assets/Icons/Solar Tools.svg';
import StreetLightIcon from '../assets/Icons/Street Light.svg';
import AVRIcon from '../assets/Icons/AVR.svg';
import VFDIcon from '../assets/Icons/VFD.svg';
import OthersIcon from '../assets/Icons/Others.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [topOffset, setTopOffset] = useState(40);
    const topBarRef = React.useRef(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Handle scroll to adjust sidebar/mobile header position
    useEffect(() => {
        const handleScroll = () => {
            if (topBarRef.current) {
                const height = topBarRef.current.offsetHeight;
                const offset = Math.max(0, height - window.scrollY);
                setTopOffset(offset);
            }
        };

        // Initial correct calculation on mount/resize
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const categories = [
        { name: 'SOLAR PANEL', icon: SolarPanelIcon, href: '/category/solar-panel' },
        { name: 'COMBO PACKAGE', icon: ComboPackageIcon, href: '/category/combo-package' },
        { name: 'SOLAR IPS', icon: SolarIPSIcon, href: '/category/solar-ips' },
        { name: 'HOME IPS', icon: RegularIPSIcon, href: '/category/home-ips' },
        { name: 'LITHIUM BATTERY', icon: LithiumBatteryIcon, href: '/category/lithium-battery' },
        { name: 'SOLAR CHARGE CONTROLLER', icon: SolarChargeControllerIcon, href: '/category/solar-charge-controller' },
        { name: 'DC WIRE', icon: DCWireIcon, href: '/category/dc-wire' },
        { name: 'SOLAR TOOLS', icon: SolarToolsIcon, href: '/category/solar-tools' },
        { name: 'STREET LIGHT', icon: StreetLightIcon, href: '/category/street-light' },
        { name: 'AVR', icon: AVRIcon, href: '/category/avr' },
        { name: 'VFD', icon: VFDIcon, href: '/category/vfd' },
        { name: 'OTHERS', icon: OthersIcon, href: '/category/others' },
    ];

    return (
        <>
            {/* Top Bar - Contact Info (Standard Flow / Relative) */}
            <div
                ref={topBarRef}
                className="relative z-[60] bg-primary text-white py-2 px-4 shadow-md w-full"
            >
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-2 text-sm md:text-base font-semibold text-center leading-tight">
                    <span className="block">আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:</span>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        <a href="https://wa.me/8801619031996" className="flex items-center gap-1 hover:text-blue-200 transition-colors whitespace-nowrap">
                            <MessageCircle size={16} /> +880 1619-031996
                        </a>
                        <span className="hidden md:inline">|</span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            হট লাইন: <Phone size={16} /> +880 1619-031996
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Header (Sticky-ish behavior via Top Offset) */}
            <div
                className="md:hidden fixed left-0 right-0 z-50 bg-white shadow-sm p-4 flex justify-between items-center h-[60px] transition-all duration-75"
                style={{ top: `${topOffset}px` }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 hover:text-primary focus:outline-none"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Logo Center */}
                <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
                    <img src="/logo.png" alt="S R CORPORATION" className="h-10 object-contain" />
                </Link>
            </div>

            {/* Sidebar Navigation */}
            {/* Desktop: Fixed Left (Always Visible) with Dynamic Top */}
            <aside
                className={`fixed left-0 z-50 w-[260px] bg-gray-50 shadow-2xl md:shadow-none md:border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto custom-scrollbar ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{
                    top: `${topOffset}px`,
                    height: `calc(100vh - ${topOffset}px)`
                }}
            >
                <div className="flex flex-col min-h-full pt-6">
                    <nav className="flex-1 px-4 space-y-3">
                        <Link
                            to="/"
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group border
                                ${location.pathname === '/'
                                    ? 'bg-blue-50 text-blue-700 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] border-blue-100'
                                    : 'bg-white text-gray-600 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] border-transparent hover:shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:translate-y-[-1px]'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className={`transition-transform duration-300 group-hover:scale-110 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                                }`}>
                                <Menu size={20} />
                            </span>
                            Home
                        </Link>

                        {categories.map((category) => {
                            const isActive = location.pathname === category.href;
                            return (
                                <Link
                                    key={category.name}
                                    to={category.href}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group border
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-700 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] border-blue-100'
                                            : 'bg-white text-gray-600 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] border-transparent hover:shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:translate-y-[-1px]'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                                        }`}>
                                        <img
                                            src={category.icon}
                                            alt={category.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="truncate">{category.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 mt-4">
                        <a
                            href="https://wa.me/8801619031996"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-[4px_4px_10px_rgba(21,101,192,0.3)] hover:shadow-[6px_6px_15px_rgba(21,101,192,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm active:shadow-inner"
                        >
                            <MessageCircle size={18} />
                            Get a Free Quote
                        </a>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile only */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Header;
