import React from "react";
import { Video, Megaphone, Share2 } from "lucide-react";

export const services = [
  {
    id: "digital-marketing-support",
    title: "Digital Marketing Support",
    description: "Live Selling support and daily performance optimization to drive sales and audience growth.",
    icon: <Megaphone className="w-5 h-5" />,
    tiers: [
      {
        name: "Daily Boost",
        price: 300000,
        priceDisplay: "Rp 300.000",
        period: "/sesi",
        features: [
          "Durasi live 3-6 jam / sesi",
          "1 Talent Host",
          "Equipment",
          "Optimasi caption & tag",
          "Mini report setelah sesi",
        ],
      },
      {
        name: "Growth Boost",
        price: 1725000,
        priceDisplay: "Rp1.725.000",
        period: "/14 hari",
        features: [
          "Live Selling 14 hari",
          "Bonus Free 1 day (total 15 hari)",
          "Talent host tetap",
          "Equipment",
          "Report mingguan",
          "Optimasi performa harian (judul, tag, katalog, thumbnail)",
        ],
      },
      {
        name: "Momentum Max",
        price: 3350000,
        priceDisplay: "Rp3.350.000",
        period: "/bulan",
        features: [
          "Live Selling 30 hari",
          "Bonus Free 3 Days (total 33 hari)",
          "Prioritas jadwal",
          "Talent host",
          "Equipment",
          "Report mingguan & bulanan",
          "Optimasi algoritma (judul, tag, boosting organik)",
        ],
      },
    ],
  },
  {
    id: "creative-production",
    title: "Creative Production",
    description: "Produksi konten kreatif termasuk videografi dan talent management (talent only).",
    icon: <Video className="w-5 h-5" />,
    tiers: [
      {
        name: "Vidio Production",
        price: 100000,
        priceDisplay: "Rp100.000",
        period: "/sesi",
        features: [
          "1 video / 1 sesi",
          "Basic shooting",
          "Simple editing",
          "1x revisi",
        ],
      },
      {
        name: "Talent Management (Talent Only)",
        price: 150000,
        priceDisplay: "Rp 150.000",
        period: "/sesi",
        features: [
          "1 Talent (model/host/brand ambassador)",
          "Durasi 1 – 3 jam shooting",
        ],
        excludes: [
          "Editing",
          "Studio/lighting",
          "Equipment",
          "Transport",
        ],
      },
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Full-service maintenance dan manajemen konten untuk menjaga performa dan pertumbuhan kanal sosial.",
    icon: <Share2 className="w-5 h-5" />,
    tiers: [
      {
        name: "Starter",
        price: 1975000,
        priceDisplay: "Rp1.975.000",
        period: "/bulan",
        features: [
          "Maintenance platform",
          "Creative Concept",
          "Copywriting",
          "Design konten profesional",
          "Posting & scheduling",
          "Hashtag & research",
          "Performance check mingguan",
          "Revisi",
        ],
      },
    ],
  },
];
