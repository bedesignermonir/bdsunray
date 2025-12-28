import React from 'react';
import Hero from '../components/Hero';
import PopularProducts from '../components/PopularProducts';
import DetailsSection from '../components/DetailsSection';
import About from '../components/About';

const Home = () => {
    return (
        <>
            <Hero />
            <PopularProducts />
            <DetailsSection />
            <About />
        </>
    );
};

export default Home;
