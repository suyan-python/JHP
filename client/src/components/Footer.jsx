import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import footer from "../assets/logo/footer.png";

export function Footer() {
  return (
    <footer
      className="w-full bg-[#1c130f] text-[#e6dccf] pt-16 pb-10 rounded-t-3xl"
      id="contact"
    >
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="text-3xl font-bold mb-4 tracking-wide text-white">
              <Link to={"/"}>
                <img
                  src={footer}
                  alt="Himalayan Arabica Coffee Beans - JHP Store"
                />
              </Link>
            </div>
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
              {[
                { label: "Home", path: "/" },
                { label: "Store", path: "/store" },
                { label: "Our Journey", path: "/parent" },
                { label: "Terms and Conditions", path: "/termsandconditions" },
                { label: "Privacy Policy", path: "/privacy-policy" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
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
              <li>
                Phone:{" "}
                <a
                  href="tel:+9779849121515"
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  +977 9849121515
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:jhpstore2025@gmail.com"
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  jhpstore2025@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Connect with Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/JHPjewelhimalayanproducts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-transform transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/jewel.himalayan.products?igsh=MW1hczAyZGd3anBxaA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-transform transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
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
