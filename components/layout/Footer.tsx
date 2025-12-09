import React from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--bg-light)] text-gray-700">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <p className="text-sm text-gray-700 mb-4 max-w-xs">
              Empowering brands through creative social media marketing.
            </p>

            <div className="flex items-center gap-3 text-gray-700">
              <a href="#" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/20">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/20">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-md hover:bg-white/20">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-md hover:bg-white/20">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-md hover:bg-white/20">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Content Creation</li>
              <li>Social Media Mgmt</li>
              <li>Photography</li>
              <li>Videography</li>
              <li>Influence Collab</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[rgba(0,0,0,0.06)] pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Joyze Creative Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
