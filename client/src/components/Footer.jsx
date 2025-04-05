import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-wide">JHP Store</h3>
            <p className="text-sm text-amber-200 leading-relaxed">
              Bringing the purest Himalayan products to your doorstep —
              ethically sourced, naturally crafted.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-amber-300 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Journey
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-amber-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>Jewel Himalayan Products Pvt. Ltd.</li>
              <li>Balkumari-Lalitpur, Nepal</li>
              <li>Phone: +977 980-000-0000</li>
              <li>Email: contact@jhpstore.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800 mt-10 pt-6 text-sm text-center text-amber-400">
          <p>
            &copy; {new Date().getFullYear()} JHP Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
