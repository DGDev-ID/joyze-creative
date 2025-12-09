import React from "react";
import Button from "../components/ui/Button";

export default function Home() {
  return (
      <div className="max-w-7xl mx-auto px-6 py-35">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Elevate Your Brand's
              <br />
              Digital Storytelling.
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Joyze Creative Agency crafts compelling social media experiences that connect, engage, and convert. Let's create something extraordinary.
            </p>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                className="rounded-full px-6 py-3 h-12 text-base"
              >
                Book a Consultation
              </Button>

              <Button
                variant="ghost"
                className="rounded-full px-6 py-3 h-12 text-base"
              >
                Explore Services
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Decorative blurred color blobs behind logo */}
              <span className="absolute -right-10 -top-6 w-40 h-40 rounded-full bg-[var(--bg-primary)] opacity-25 blur-xl transform rotate-12" aria-hidden />
              <span className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-[var(--bg-light)] opacity-30 blur-lg" aria-hidden />

              {/* subtle ring */}
              <span className="absolute w-72 h-72 rounded-full border border-[var(--bg-primary)] opacity-10" aria-hidden />

              <img
                src="/logo-joyze.svg"
                alt="Joyze"
                className="w-72 h-auto relative drop-shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
  );
}
