import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: December 16, 2025</p>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                        <p>
                            Welcome to S R Corporation ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://bdsunray.com" className="text-primary hover:underline">https://bdsunray.com</a> (the "Site"). Please read this policy carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                        <p className="mb-2">We may collect information about you in a variety of ways.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Personal Data:</strong> Personally identifiable information, such as your name, company name, email address, and telephone number, which you voluntarily provide when you contact us for consultations or services.
                            </li>
                            <li>
                                <strong>Derived Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Use of Your Information</h2>
                        <p className="mb-2">We use the information we collect to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide, operate, and maintain our Site and services.</li>
                            <li>Respond to your inquiries and provide expert consultation on solar solutions.</li>
                            <li>Communicate with you, including for customer service and updates related to our services.</li>
                            <li>Compile anonymous statistical data and analysis for internal use.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Sharing Your Information</h2>
                        <p>
                            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners for the purposes outlined above.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to protect your personal information. While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
                        <p className="mb-2">If you have questions or comments about this Privacy Policy, please contact us at:</p>
                        <address className="not-italic">
                            <strong>S R Corporation</strong><br />
                            Email: <a href="mailto:ceo@bdsunray.com" className="text-primary hover:underline">ceo@bdsunray.com</a><br />
                            Website: <a href="https://bdsunray.com" className="text-primary hover:underline">https://bdsunray.com</a>
                        </address>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
