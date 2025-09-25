// ECommerceFooter.tsx
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { Value } from "../Values/Value";

interface FooterProp {
  value?: boolean;
}
const Footer: React.FC<FooterProp> = ({ value }) => {
  return (
    <>
      {value && <Value />}

      <footer className="bg-pryColor text-white pt-12">
        <div className="w-full">
          {/* Main Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-10">
            <div className="flex flex-col justify-center items-center">
              <h5 className="text-xl font-semibold mb-4">Company</h5>
              <ul className="space-y-2 flex flex-col justify-center items-center">
                <li>
                  <a
                    href="/about-us"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Careers
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h5 className="text-xl font-semibold mb-4">Customer Service</h5>
              <ul className="space-y-2 flex flex-col justify-center items-center">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Returns & Exchanges
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Shipping Info
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Order Tracking
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center items-center">
              <h5 className="text-xl font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 flex flex-col justify-center items-center">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Men's Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Women's Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Accessories
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-sm hover:text-secColor transition-colors"
                  >
                    Sale
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-700 px-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Social Icons */}
              <div className="flex space-x-6">
                <a
                  href="https://www.facebook.com/share/18sQ1aLHjo/?mibextid=kFxxJD"
                  className="text-gray-300 hover:text-secColor transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiLogoFacebook size={24} />
                </a>
                <a
                  href="https://x.com/ashobox"
                  className="text-gray-300 hover:text-secColor transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiLogoTwitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com/ashobox?igsh=MXJ4aDZ2OTdxem92ag%3D%3D&utm_source=qr"
                  className="text-gray-300 hover:text-secColor transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiLogoInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-secColor transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiLogoWhatsapp size={24} />
                </a>
              </div>

              {/* Newsletter */}
              <div className="w-full lg:w-auto">
                <p className="text-sm mb-2 text-center lg:text-left">
                  Subscribe to our newsletter
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                  />
                  <button className="px-6 py-2 bg-secColor text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-gray-700 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="bg-secColor text-white mt-8 py-4">
            <div className="text-center">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Ashobox. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
