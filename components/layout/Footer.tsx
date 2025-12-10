import React from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--bg-light)] text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {/* Column 1: Brand and Social */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo-joyze.svg" alt="Joyze" width={48} height={48} />
            </Link>
            <p className="text-sm text-gray-600 mb-4 max-w-xs">
              Empowering brands through creative social media marketing.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Services</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Content Creation</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Social Media Mgmt</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Photography</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Videography</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Influence Collab</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[var(--bg-primary)]">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Our Team</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[var(--bg-primary)]">FAQ</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[var(--bg-primary)]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Joyze Creative Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;