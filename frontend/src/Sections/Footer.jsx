import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#044236] text-white py-10 relative z-10">
      <div className="container mx-auto max-w-[1320px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-semibold text-center md:text-left font-serif">The Body Shop</h2>
            <p className="text-gray-300 mt-3">
              Bringing you the best in organic skincare and beauty products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="hover:text-emerald-400 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Social Media */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="mt-3 flex justify-center lg:justify-end space-x-4">
              {[
                { icon: <Facebook />, link: "https://facebook.com" },
                { icon: <Instagram />, link: "https://instagram.com" },
                { icon: <Twitter />, link: "https://twitter.com" },
                { icon: <Linkedin />, link: "https://linkedin.com" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-[#044236] hover:bg-emerald-500 hover:text-white transition duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-10 pt-4 text-center text-gray-300">
          <p>© {new Date().getFullYear()} The Body Shop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
