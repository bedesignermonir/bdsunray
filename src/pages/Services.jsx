import DetailsSection from "../components/DetailsSection";

const Services = () => {
    return (
        <div className="pt-20">
            <div className="bg-gray-50 py-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
                <p className="mt-4 text-xl text-gray-600">Comprehensive Solar Solutions for Your Business</p>
            </div>
            <div className="container mx-auto px-4 py-16">
                <DetailsSection />
                {/* <p className="text-center text-gray-500">Service details coming soon.</p> */}
            </div>
        </div>
    );
};

export default Services;
