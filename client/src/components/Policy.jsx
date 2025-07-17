import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="pt-24 pb-20 px-4 sm:px-10 md:px-20 bg-[#fff] text-gray-900 font-serif tracking-wide leading-relaxed my-36">
      <div className="max-w-4xl mx-auto border border-gray-300 px-6 sm:px-10 py-12 shadow-md">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 uppercase tracking-widest">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto italic">
            Effective Date: 05/14/2025
          </p>
          <p className="mt-2 text-sm text-gray-600">
            This policy outlines how Jewel Himalayan Products Store collects,
            uses, and protects your data.
          </p>
        </header>

        {/* Body Content */}
        <section className="space-y-10 text-[16px] sm:text-[17px]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information including your name, email, phone
              number, delivery address, and payment details when you interact
              with our website or make a purchase.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              2. Purpose of Data Collection
            </h2>
            <p>
              Your information is used solely for fulfilling orders,
              communicating with you, providing customer support, and improving
              our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              3. Payment Information
            </h2>
            <p>
              All transactions are securely processed via third-party payment
              providers. We do not store card details on our servers. *Future
              use
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              4. Use of Cookies
            </h2>
            <p>
              We use cookies to enhance user experience and analyze website
              traffic through analytics tools. You can manage cookie preferences
              through your browser.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              5. Third-Party Disclosure
            </h2>
            <p>
              We do not sell or rent your personal data. Data is shared only
              with verified third parties such as delivery services and payment
              processors for operational purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to, correct, or delete your
              personal information at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              7. Children’s Privacy
            </h2>
            <p>
              Our services are not intended for children under the age of 16. We
              do not knowingly collect data from minors.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              8. Policy Updates
            </h2>
            <p>
              We may revise this Privacy Policy periodically. Updates will be
              posted on this page with the latest effective date.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              9. Contact Information
            </h2>
            <p>
              For questions regarding this Privacy Policy, please contact us at:
              <br />
              <a
                className="block mt-2 text-blue-700 font-medium"
                href="mailto:office@jewelhimalayanproducts.com"
              >
                office@jewelhimalayanproducts.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 mt-16 border-t pt-6">
          © {new Date().getFullYear()} Jewel Himalayan Products. All rights
          reserved.
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
