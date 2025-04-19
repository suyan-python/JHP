import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="w-full bg-[#1c130f] text-[#e6dccf] pt-16 pb-10"
      id="contact"
    >
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4 tracking-wide text-white">
              JHP Store
            </h3>
            <p className="text-sm leading-relaxed text-[#d3c3b3]">
              Discover the purity of the Himalayas. Ethically sourced,
              hand-crafted, and delivered fresh to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-[#d3c3b3]">
              {["Home", "Products", "Our Journey", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Contact</h4>
            <ul className="text-sm text-[#d3c3b3] space-y-2">
              <li>Jewel Himalayan Products Pvt. Ltd.</li>
              <li>Balkumari, Lalitpur, Nepal</li>
              <li>Phone: +977 980-000-0000</li>
              <li>Email: contact@jhpstore.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Connect with Us
            </h4>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-amber-400 transition-transform transform hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3d2f29] mt-12 pt-6 text-center text-sm text-[#c0b4a3]">
          <p>
            &copy; {new Date().getFullYear()} JHP Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
