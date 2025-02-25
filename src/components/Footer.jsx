import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Brew Haven</h3>
            <p className="text-amber-200">
              Crafting perfect coffee moments, one cup at a time.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-300">Home</a></li>
              <li><a href="#products" className="hover:text-amber-300">Products</a></li>
              <li><a href="#story" className="hover:text-amber-300">Our Story</a></li>
              <li><a href="#contact" className="hover:text-amber-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>123 Coffee Street</li>
              <li>Seattle, WA 98101</li>
              <li>Tel: (555) 123-4567</li>
              <li>Email: hello@brewhaven.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-amber-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-amber-300">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-amber-900 mt-8 pt-8 text-center">
          <p>&copy; 2024 Brew Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}