"use client";

import React, { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import WorkCard from "../components/ui/WorkCard";
import MotionDiv, { MotionImg } from "../components/ui/MotionWrap";
import { Sparkles } from "lucide-react";
import { services } from "../components/data/services";
import { portfolio } from "../components/data/portfolio";
import BookingModal from "../components/ui/BookingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            {/* Decorative blobs for left hero area */}
            <span className="absolute -left-8 -top-6 w-36 h-36 rounded-full bg-(--bg-light) opacity-30 blur-2xl animate-float" aria-hidden />

            <MotionDiv className="relative z-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Elevate Your Brand&apos;s
                <br />
                Digital Storytelling.
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Joyze Creative Agency crafts compelling social media experiences that connect, engage, and convert. Let&apos;s create something extraordinary.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  variant="primary"
                  className="rounded-full px-6 py-3 h-12 text-base"
                  onClick={() => setModalOpen(true)}
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
            </MotionDiv>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Decorative blurred color blobs behind logo */}
              <span className="absolute -right-10 -top-6 w-50 h-50 rounded-full bg-(--bg-primary) opacity-25 blur-xl transform rotate-12 animate-float" aria-hidden />
              <span className="absolute -left-6 -bottom-6 w-38 h-38 rounded-full bg-(--bg-light) opacity-30 blur-lg animate-float" aria-hidden />

              {/* subtle ring */}
              <span className="absolute w-72 h-72 rounded-full border border-(--bg-primary) opacity-10" aria-hidden />

              <MotionImg
                src="/logo-joyze.svg"
                alt="Joyze"
                className="w-72 h-auto relative drop-shadow-xl"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.6 }}
                whileHover={{ scale: 1.04 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services section */}
  <section className="bg-(--bg-light)/10 text-gray-900 py-40">
        <div className="max-w-7xl mx-auto px-6 relative isolate">
          {/* Decorative blobs for services section (behind cards) */}
          <span className="absolute -right-8 -top-6 w-40 h-40 rounded-full bg-(--bg-primary) opacity-20 animate-float z-0 pointer-events-none" aria-hidden />
          <span className="absolute -left-6 -bottom-8 w-36 h-36 rounded-full bg-(--bg-light) opacity-25 animate-float z-0 pointer-events-none" aria-hidden />
          <span className="absolute left-6 -top-4 w-24 h-24 rounded-full bg-(--bg-primary) opacity-12 animate-float z-0 pointer-events-none" aria-hidden />
          <span className="absolute right-20 bottom-6 w-56 h-56 rounded-full bg-(--bg-light) opacity-8 animate-float z-20 pointer-events-none" aria-hidden />
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Creative Services</h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">We blend strategy, storytelling, and production to create memorable social experiences that move your audience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {services.slice(0, 6).map((s, idx) => (
              <MotionDiv
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.05 + idx * 0.06 }}
              >
                <Card className="p-6 group relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-(--bg-primary) to-(--bg-light) text-white shadow-md">
                        {s.icon}
                      </div>
                    </div>

                    <div className="mt-1">
                      <h3 className="font-semibold text-(--bg-primary)">{s.title}</h3>
                      <p className="text-sm text-gray-400 mt-2">{s.description}</p>
                    </div>
                  </div>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work section */}
  <section className="text-gray-900 py-40">
  <div className="max-w-7xl mx-auto px-6 relative isolate">
    {/* Decorative blobs for Recent Work section (behind work cards) */}
    <span className="absolute -right-10 -top-6 w-44 h-44 rounded-full bg-(--bg-primary) opacity-12 blur-2xl animate-float z-0 pointer-events-none" aria-hidden />
    <span className="absolute -left-6 -bottom-6 w-36 h-36 rounded-full bg-(--bg-light) opacity-14 blur-xl animate-float z-0 pointer-events-none" aria-hidden />
    <span className="absolute left-10 top-10 w-24 h-24 rounded-full bg-(--bg-primary) opacity-8 animate-float z-0 pointer-events-none" aria-hidden />
    <span className="absolute right-6 bottom-10 w-20 h-20 rounded-full bg-(--bg-light) opacity-10 animate-float z-0 pointer-events-none" aria-hidden />
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Recent Work</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">A selection of recent projects — social campaigns, photography, and video production.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.slice(0, 4).map((item, idx) => (
              <MotionDiv
                key={item.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 + idx * 0.06 }}
              >
                <WorkCard imageSrc={item.imageSrc} title={item.title} category={item.category} />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
  <section className="py-40 bg-(--bg-light)/10 text-gray-900">
        <div className="max-w-4xl mx-auto px-6 relative isolate">
          {/* Decorative blobs for CTA section (behind card) */}
          <span className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-(--bg-primary) opacity-18 animate-float z-20 pointer-events-none" aria-hidden />
          <span className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-(--bg-light) opacity-22 animate-float z-0 pointer-events-none" aria-hidden />
          <span className="absolute -right-24 top-6 w-28 h-28 rounded-full bg-(--bg-primary) opacity-10 animate-float z-0 pointer-events-none" aria-hidden />
          <span className="absolute left-4 -bottom-12 w-20 h-20 rounded-full bg-(--bg-light) opacity-16 animate-float z-0 pointer-events-none" aria-hidden />
          <MotionDiv initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
            <Card className="p-8 shadow-md hover:shadow-none relative z-10">
              <div className="text-center">
              <Sparkles className="mx-auto text-(--bg-primary) mb-4" size={40} />
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Transform Your Brand?</h3>
              <p className="text-gray-600 mb-6">Let&apos;s discuss how Joyze Creative Agency can help you achieve your social media marketing goals. Contact us for a free consultation today!</p>

              <div className="flex justify-center items-center gap-4">
                <Button variant="primary" className="rounded-full px-6 py-3">
                  Get in Touch
                </Button>

                <Button variant="ghost" className="rounded-full px-6 py-3">
                  Book a Free Consultation
                </Button>
              </div>
            </div>
          </Card>
          </MotionDiv>
        </div>
      </section>
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        services={services}
        requireServiceSelection
        onSubmit={(data) => { console.log('Booking from home:', data); setModalOpen(false); }}
      />
    </>
  );
}
