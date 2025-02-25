import React from "react";
import { Coffee, ShoppingCart, User } from "lucide-react";
import { Link } from "./Link";

export function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Coffee className="h-8 w-8 text-amber-700" />
            <span className="ml-2 text-xl font-bold text-amber-900">JHP</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home">Home</Link>
            <Link href="#products">Products</Link>
            <Link href="#story">Our Story</Link>
            <Link href="#contact">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-amber-50 rounded-full">
              <ShoppingCart className="h-6 w-6 text-amber-700" />
            </button>
            <button className="p-2 hover:bg-amber-50 rounded-full">
              <User className="h-6 w-6 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
