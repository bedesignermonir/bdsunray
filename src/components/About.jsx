import React from 'react';
import { CheckCircle } from 'lucide-react';
import teamPhoto from '../assets/images/teams-photo.webp'


const About = () => {
    return (
        <div className="bg-white py-24 relative overflow-hidden" id="about">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-base font-bold text-primary tracking-wide uppercase mb-2">Who We Are</h2>
                        <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6 leading-tight">
                            Commited to a Sustainable Future
                        </h3>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At S R CORPORATION, we believe that sustainable energy should be accessible, affordable, and profitable for every business. We are dedicated to providing the highest quality solar PV installations with a focus on long-term performance and customer satisfaction.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Since our inception, we have helped hundreds of businesses across the UK reduce their carbon footprint and take control of their energy costs. Our team of expert engineers and consultants work closely with you to design a system that meets your specific needs.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {['Expert Consultation', 'Custom System Design', 'Professional Installation', 'Ongoing Maintenance'].map((item) => (
                                <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-gray-900 font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl opacity-10 blur-2xl"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                className="w-full h-full object-cover"
                                src={teamPhoto}
                                alt="Solar Installation Team"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                <p className="text-white text-lg font-bold">Trusted by Industry Leaders</p>
                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
