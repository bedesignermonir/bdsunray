import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: December 16, 2025</p>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small data files placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Cookies</h2>
                        <p className="mb-2">We use cookies for the following purposes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Essential Operation:</strong> To enable basic functions of the website, such as page navigation.
                            </li>
                            <li>
                                <strong>Performance and Analytics:</strong> To understand how visitors interact with our Site by collecting and reporting information anonymously. This helps us improve our website structure and content.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Your Choices Regarding Cookies</h2>
                        <p>
                            Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline them. If you choose to disable cookies, some parts of the Site may not function properly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Cookies</h2>
                        <p>
                            We may use trusted third-party services that place cookies on our Site to help us analyze how our website is used. These third parties have their own privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
                        <p className="mb-2">If you have any questions about our use of cookies, please contact us at:</p>
                        <address className="not-italic">
                            Email: <a href="mailto:ceo@bdsunray.com" className="text-primary hover:underline">ceo@bdsunray.com</a>
                        </address>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
