import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      <div className="flex flex-col flex-grow pt-[100px] md:pt-[40px] md:ml-[260px] transition-all duration-300">
        <div className="flex justify-center flex-shrink-0 pt-6 pb-2">
          <Link to="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="S R CORPORATION" className="h-[90px] object-contain drop-shadow-sm" />
          </Link>
        </div>
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
