"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";

export type ServiceTier = {
  name: string;
  features: string[];
  /** price in whole rupiah (e.g. 1500000) */
  price: number;
  /** optional period label, e.g. "/Month" or "/Session" */
  period?: string;
};

type ServiceCardProps = {
  title: string;
  description?: string;
  tiers: ServiceTier[];
  /** optional icon node to render above title */
  icon?: React.ReactNode;
  /** optional id used to identify service when booking */
  serviceId?: string | number;
  /** called when user clicks Book Now; provides serviceId and default tier index */
  onBook?: (serviceId?: string | number, defaultTierIndex?: number) => void;
};

function formatIDR(amount: number) {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // fallback simple formatting
    return "Rp " + amount.toLocaleString();
  }
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, tiers, icon, serviceId, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full transform-gpu transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-center">
        {icon && (
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--bg-light)]/60 flex items-center justify-center text-[var(--bg-primary)] mb-3">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{description}</p>
        )}
      </div>

      <div className="mt-6 space-y-4 flex-1">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-700">{tier.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-[var(--bg-primary)]">
                  {formatIDR(tier.price)}
                </div>
                {tier.period && <div className="text-xs text-gray-400 mt-1">{tier.period}</div>}
              </div>
            </div>

            {tier.features && tier.features.length > 0 && (
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-1 w-4 h-4 text-[var(--bg-primary)] flex-none" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => onBook?.(serviceId ?? title, 0)}
          aria-label={`Book ${title}`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
