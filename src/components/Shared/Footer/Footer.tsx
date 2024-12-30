"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
  };

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-start">
            <div className="flex gap-2 items-center">
              <Image src={logo} alt="logo" width={40} height={40} priority />
              <h2 className="text-3xl font-bold text-emerald-500">
                ShopSphere
              </h2>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your favorite online store for the best deals on all products!
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-emerald-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-emerald-500">
                  Shop
                </a>
              </li>
              <li>
                <a href="/sale" className="hover:text-emerald-500">
                  Sale
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-emerald-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-emerald-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-emerald-500">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-emerald-500">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-emerald-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">
              Subscribe to our Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex mt-4 w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 mr-2 bg-dark-700 text-white"
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-dark-900 text-center pt-6 mt-12">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ShopSphere | Asif Rezwan Kabir | All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
