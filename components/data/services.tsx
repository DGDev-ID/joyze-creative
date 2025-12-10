import React from "react";
import { Edit3, Video, Users, Megaphone, Share2, Camera } from "lucide-react";

export const services = [
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Captivating and unique content tailored for your brand's voice and audience across all platforms.",
    icon: <Edit3 className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["10 Posts/Month", "Basic Graphic Design", "Content Calendar"], price: 500000, period: "/Month" },
      { name: "Standard", features: ["20 Posts/Month", "Advanced Graphic Design", "Copywriting", "Audience Engagement"], price: 950000, period: "/Month" },
      { name: "Premium", features: ["30 Posts/Month", "Custom Illustrations", "Video Content", "Performance Reports"], price: 1500000, period: "/Month" },
    ],
  },
  {
    id: "videography",
    title: "Videography & Motion Graphics",
    description: "Dynamic video content and engaging motion graphics to tell your story and captivate your audience.",
    icon: <Video className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["1 Minute Explainer", "Basic Editing", "Music License"], price: 800000, period: "/Video" },
      { name: "Standard", features: ["2 Minute Promo", "Custom Graphics", "Voiceover", "B-Roll Footage"], price: 1500000, period: "/Video" },
      { name: "Premium", features: ["3-5 Minute Short Film", "Advanced Visual Effects", "Storyboarding", "Multiple Revisions"], price: 2500000, period: "/Video" },
    ],
  },
  {
    id: "influencer",
    title: "Influencer Collaboration",
    description: "Connect with relevant influencers to amplify your brand's message and reach new audiences.",
    icon: <Users className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["Micro-Influencer Match (1)", "Campaign Briefing", "Performance Tracking"], price: 700000, period: "/Campaign" },
      { name: "Standard", features: ["Mid-Tier Influencer Match (1-2)", "Content Review", "Negotiation & Contracts"], price: 1300000, period: "/Campaign" },
      { name: "Premium", features: ["Macro-Influencer Match (1-3)", "Full Campaign Strategy", "Detailed ROI Analysis", "Ongoing Management"], price: 2200000, period: "/Campaign" },
    ],
  },
  {
    id: "ads",
    title: "Digital Ad Campaigns",
    description: "Targeted advertising strategies across platforms like Google, Facebook, and Instagram to maximize reach and conversions.",
    icon: <Megaphone className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["Platform Setup (1)", "Basic Audience Targeting", "A/B Testing (1 Ad Set)"], price: 450000, period: "/Month" },
      { name: "Standard", features: ["Platform Setup (2)", "Advanced Audience Targeting", "Multiple Ad Sets & Creatives"], price: 850000, period: "/Month" },
      { name: "Premium", features: ["Multi-Platform Campaigns", "Dynamic Retargeting", "Advanced Budget Optimization", "Conversion Tracking"], price: 1400000, period: "/Month" },
    ],
  },
  {
    id: "social",
    title: "Social Media Management",
    description: "Full-service management of your social media channels to boost presence and engagement.",
    icon: <Share2 className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["2 Platforms", "Scheduling", "Basic Analytics"], price: 600000, period: "/Month" },
      { name: "Standard", features: ["3 Platforms", "Community Management", "Growth Strategy", "Monthly Reports"], price: 1100000, period: "/Month" },
      { name: "Premium", features: ["All Platforms", "Influencer Outreach", "Campaign Management", "Crisis Management"], price: 1800000, period: "/Month" },
    ],
  },
  {
    id: "photography",
    title: "Brand Photography",
    description: "Professional photography services to capture your brand's essence with high-quality visuals.",
    icon: <Camera className="w-5 h-5" />,
    tiers: [
      { name: "Basic", features: ["1 Hour Shoot", "10 Edited Photos", "Online Gallery"], price: 400000, period: "/Session" },
      { name: "Standard", features: ["2 Hour Shoot", "25 Edited Photos", "Product Shots", "Location Scouting"], price: 750000, period: "/Session" },
      { name: "Premium", features: ["Half-Day Shoot", "50+ Edited Photos", "Lifestyle & Team Photos", "Props & Styling"], price: 1200000, period: "/Session" },
    ],
  },
];
