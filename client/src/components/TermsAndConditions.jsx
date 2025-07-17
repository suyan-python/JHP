import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <main className="pt-24 pb-20 px-4 sm:px-10 md:px-20 bg-white text-gray-900 font-serif tracking-wide leading-relaxed my-36">
      <div className="max-w-4xl mx-auto border border-gray-300 px-6 sm:px-10 py-12 shadow-md">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 uppercase tracking-widest">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto italic">
            Please read these terms carefully before using JHP Store’s services.
          </p>
        </header>

        {/* Sections */}
        <section className="space-y-10 text-[16px] sm:text-[17px]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              1. Introduction
            </h2>
            <p>
              By accessing and using the JHP Store website, operated by Jewel
              Himalayan Products, you agree to comply with these Terms &
              Conditions. If you do not agree, please refrain from using our
              services.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              2. Products & Pricing
            </h2>
            <p>
              All products listed are subject to availability. Prices are in NPR
              and include applicable taxes unless stated otherwise. We reserve
              the right to change prices and product details without prior
              notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              3. Orders & Payments
            </h2>
            <p>
              Orders must be placed with accurate and up-to-date information.
              Payments are accepted via digital wallets, bank transfers, and
              other supported methods.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              4. Shipping & Delivery
            </h2>
            <p>
              We deliver throughout Nepal. Estimated delivery times vary by
              region. Shipping offers: Free shippings for limited time (e.g.,
              free delivery over 5kg) are subject to promotional terms and may
              change at any time.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              5. Returns & Refunds
            </h2>
            <p>
              As coffee is a perishable product, returns are not accepted unless
              the item is defective or incorrect. Issues must be reported within
              3 days of delivery. Refunds will be issued after proper
              verification.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              6. Intellectual Property
            </h2>
            <p>
              All site content including images, branding, packaging, and text
              is the intellectual property of Jewel Himalayan Products.
              Unauthorized use is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              7. Privacy Policy
            </h2>
            <p>
              Your personal data is handled responsibly. Please refer to our{" "}
              <Link
                to="/privacy-policy"
                className="text-green-700 underline font-medium"
              >
                Privacy Policy
              </Link>{" "}
              for details on data collection and use.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              8. Changes to Terms
            </h2>
            <p>
              These Terms & Conditions may be updated at any time. Continued use
              of the website implies acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">
              9. Contact Us
            </h2>
            <p>
              For any questions or clarifications, contact us at:
              <br />
              <a
                href="mailto:jhpstore2025@gmail.com"
                className="text-blue-700 underline mt-1 block"
              >
                jhpstore2025@gmail.com
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

export default TermsAndConditions;
