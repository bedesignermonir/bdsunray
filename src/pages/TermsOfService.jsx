import React from 'react';

const TermsOfService = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: December 16, 2025</p>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the website <a href="https://bdsunray.com" className="text-primary hover:underline">https://bdsunray.com</a> ("the Site"), operated by S R Corporation ("the Company"), you accept and agree to be bound by these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                        <p>
                            S R Corporation provides information about commercial solar energy solutions, including expert consultation, custom system design, professional installation, and ongoing maintenance services for businesses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
                        <p>
                            All content on this Site, including text, graphics, logos, and images, is the property of S R Corporation or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Product Information and Pricing</h2>
                        <p>
                            The Site displays products such as Surge Protection Devices (e.g., AC SPD DP, DC SPD DP, DC SPD TP) with listed prices (e.g., ৳900, ৳1,800). All product descriptions and pricing are for informational purposes and are subject to change without notice. For accurate quotes and system design, a formal consultation is required.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Disclaimer and Limitation of Liability</h2>
                        <p>
                            The information on this Site is provided for general informational purposes only. S R Corporation shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, the Site, the information contained therein, or our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by the laws of the jurisdiction in which S R Corporation operates, without regard to its conflict of law principles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
                        <p className="mb-2">For any questions regarding these Terms of Service, please contact us at:</p>
                        <address className="not-italic">
                            Email: <a href="mailto:ceo@bdsunray.com" className="text-primary hover:underline">ceo@bdsunray.com</a>
                        </address>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
