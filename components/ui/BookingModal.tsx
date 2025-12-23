"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ServiceTier } from "@/components/ui/ServiceCard";
import { User, Mail, Phone, Calendar } from "lucide-react";
import Select from "@/components/ui/Select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// API lightweight types for mapping
type ServiceTypeDescriptionApi = { id: number; service_type_id?: number; description?: string };
type ServiceTypeApi = { id: number; service_id?: number; name?: string; title?: string; price?: number | string; price_raw?: number | string; price_display?: string; priceText?: string; serviceTypeDescriptions?: ServiceTypeDescriptionApi[] };
type ServiceApi = { id: number; name?: string; title?: string; description?: string; summary?: string; unit?: string; serviceTypes?: ServiceTypeApi[] };

export type ServiceItem = { id: string; title: string; description?: string; tiers: ServiceTier[] };

export type BookingData = {
  cust_name: string;
  cust_email: string;
  cust_phone: string;
  service_id: string;
  service_type_id: string;
  start_date: string;
  end_date: string;
};

const bookingSchema = z.object({
  cust_name: z.string().min(2, "Please enter your name"),
  cust_email: z.string().email("Enter a valid email"),
  cust_phone: z.string().optional(),
  service_id: z.string().min(1, "Please select a service"),
  service_type_id: z.string().min(1, "Please select a service type"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

type FormValues = z.infer<typeof bookingSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  services: ServiceItem[];
  initial?: Partial<BookingData>;
  onSubmit?: (data: BookingData) => void;
  /** If true, require the user to explicitly select a service (service select starts empty) */
  requireServiceSelection?: boolean;
}

export default function BookingModal({ open, onClose, services, initial = {}, onSubmit, requireServiceSelection = false }: Props) {
  // local fetched services when modal opens (overrides `services` prop while present)
  const [fetchedServices, setFetchedServices] = useState<ServiceItem[] | null>(null);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);

  // use fetchedServices when available, otherwise fall back to prop
  const servicesUsed = fetchedServices ?? services;

  // per-service types fetched when user selects a service
  const [serviceTypesList, setServiceTypesList] = useState<(ServiceTier & { id?: number })[] | null>(null);
  const [loadingServiceTypes, setLoadingServiceTypes] = useState(false);
  const [serviceTypesError, setServiceTypesError] = useState<string | null>(null);
  // submission state
  const [submitting, setSubmitting] = useState(false);

  // initialize form with empty defaults; we'll reset when servicesUsed or open change
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      cust_name: initial.cust_name ?? "",
      cust_email: initial.cust_email ?? "",
      cust_phone: initial.cust_phone ?? undefined,
      service_id: "",
      service_type_id: "",
      start_date: initial.start_date ?? undefined,
      end_date: initial.end_date ?? undefined,
    },
    mode: "onTouched",
  });

  // fetch services for make-order when modal opens
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!open) return;
      setLoadingServices(true);
      setServicesError(null);
      try {
        const res = await fetch('/api/guest/make-order/service');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = (json?.data ?? json) as ServiceApi[];
        const mapUnit = (u: string | undefined) => {
          if (!u) return undefined;
          switch (String(u).toUpperCase()) {
            case 'MONTH':
            case 'MONTHS':
              return '/bulan';
            case 'DAY':
              return '/hari';
            case 'SESSION':
              return '/sesi';
            case 'VIDEO':
              return '/video';
            default:
              return `/${String(u).toLowerCase()}`;
          }
        };

        const parseFixedPrice = (raw: unknown): number | undefined => {
          if (raw == null) return undefined;
          if (typeof raw === 'number') return Number.isFinite(raw) ? Math.round(raw) : undefined;
          const str = String(raw).trim();
          // reject ranges or textual prices containing hyphen or letters like 'to', 's/d'
          if (/[-–]/.test(str)) return undefined;
          if (/[a-zA-Z]/.test(str.replace(/Rp|IDR|\$|€|,|\.|\s/g, ''))) return undefined;
          const digits = str.replace(/[^0-9]+/g, '');
          if (!digits) return undefined;
          const n = Number(digits);
          return Number.isNaN(n) ? undefined : n;
        };

        const mapped = (data || []).map((s: ServiceApi) => {
          const tiers = (s.serviceTypes || []).map((st: ServiceTypeApi) => {
            const rawPrice = st.price ?? st.price_raw ?? st.price_display;
            const priceNum = parseFixedPrice(rawPrice);
            const features = (st.serviceTypeDescriptions || []).map((d: ServiceTypeDescriptionApi) => d.description).filter(Boolean) as string[];

            return {
              name: st.name ?? st.title ?? `Tier ${st.id}`,
              id: st.id,
              price: priceNum,
              period: mapUnit(s.unit),
              features,
            } as ServiceTier;
          });

          return {
            id: String(s.id),
            title: s.name ?? s.title ?? `Service ${s.id}`,
            description: s.description ?? s.summary ?? '',
            tiers,
          } as ServiceItem;
        });

        if (mounted) setFetchedServices(mapped);
      } catch (err: unknown) {
        if (mounted) setServicesError((err as Error)?.message ?? String(err));
      } finally {
        if (mounted) setLoadingServices(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [open]);

  // reset when modal opens or servicesUsed change
  useEffect(() => {
    if (open) {
      const defaultService = servicesUsed.length > 0 ? servicesUsed[0].id : "";
      const defaultValues: FormValues = {
        cust_name: initial.cust_name ?? "",
        cust_email: initial.cust_email ?? "",
        cust_phone: initial.cust_phone ?? undefined,
        service_id: (requireServiceSelection ? (initial.service_id ?? "") : (initial.service_id ?? defaultService)) as string,
        service_type_id: (initial.service_type_id ?? (requireServiceSelection ? "" : (servicesUsed[0]?.tiers && servicesUsed[0].tiers.length > 0 ? String(((servicesUsed[0].tiers[0] as unknown) as { id?: number }).id ?? "0") : "0"))) as string,
        start_date: initial.start_date ?? undefined,
        end_date: initial.end_date ?? undefined,
      };
      reset(defaultValues);
    }
    // include servicesUsed/fetchedServices so defaults pick up mapped ids
  }, [open, fetchedServices]);

  const watchedStart = watch("start_date");
  const watchedServiceId = watch("service_id");
  const watchedServiceType = watch("service_type_id");

  function formatIDR(amount?: number) {
    if (amount == null) return "-";
    try {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `Rp ${amount.toLocaleString()}`;
    }
  }

  const selectedService = servicesUsed.find((s) => s.id === watchedServiceId);
  let selectedTier: ServiceTier | undefined = undefined;
  if (selectedService) {
    const tiersSource = (serviceTypesList && watchedServiceId) ? serviceTypesList : selectedService.tiers;
    // if we have an id-based list (serviceTypesList) then watchedServiceType holds the real id
    if (serviceTypesList && watchedServiceType) {
      const idNum = Number(watchedServiceType);
      selectedTier = tiersSource.find((t) => Number(((t as ServiceTier & { id?: number }).id) ?? NaN) === idNum) as ServiceTier | undefined;
      if (!selectedTier) selectedTier = tiersSource[0];
    } else {
      const idx = Number(watchedServiceType);
      if (!Number.isNaN(idx) && idx >= 0 && idx < tiersSource.length) selectedTier = tiersSource[idx];
      else selectedTier = tiersSource[0];
    }
  }

  // auto-calc end date when start changes
  useEffect(() => {
    if (watchedStart) {
      const dt = new Date(watchedStart);
      dt.setDate(dt.getDate() + 30);
      const yyyy = dt.getFullYear();
      const mm = String(dt.getMonth() + 1).padStart(2, "0");
      const dd = String(dt.getDate()).padStart(2, "0");
      setValue("end_date", `${yyyy}-${mm}-${dd}`);
    } else {
      setValue("end_date", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedStart]);

  // when service changes, reset service_type to first tier id (if available) or empty
  useEffect(() => {
    if (watchedServiceId) {
      const svc = servicesUsed.find((x) => x.id === watchedServiceId);
      if (serviceTypesList && serviceTypesList.length > 0) {
        setValue("service_type_id", String((serviceTypesList[0] as { id?: number }).id ?? "0"));
      } else if (svc && svc.tiers && svc.tiers.length > 0) {
        setValue("service_type_id", String(((svc.tiers[0] as unknown) as { id?: number }).id ?? "0"));
      } else {
        setValue("service_type_id", "");
      }
    } else {
      setValue("service_type_id", "");
    }
  }, [watchedServiceId, serviceTypesList, servicesUsed]);

  // fetch service types for the selected service (when user picks a service)
  useEffect(() => {
    let mounted = true;
    const loadTypes = async () => {
      if (!watchedServiceId) {
        setServiceTypesList(null);
        setServiceTypesError(null);
        setLoadingServiceTypes(false);
        return;
      }
      setLoadingServiceTypes(true);
      setServiceTypesError(null);
      try {
        const res = await fetch(`/api/guest/make-order/service/type/${watchedServiceId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = (json?.data ?? json) as ServiceTypeApi[];
        const parseFixedPrice = (raw: unknown): number | undefined => {
          if (raw == null) return undefined;
          if (typeof raw === 'number') return Number.isFinite(raw) ? Math.round(raw) : undefined;
          const str = String(raw).trim();
          if (/[-–]/.test(str)) return undefined;
          if (/[a-zA-Z]/.test(str.replace(/Rp|IDR|\$|€|,|\.|\s/g, ''))) return undefined;
          const digits = str.replace(/[^0-9]+/g, '');
          if (!digits) return undefined;
          const n = Number(digits);
          return Number.isNaN(n) ? undefined : n;
        };

        const mapped = (data || []).map((st: ServiceTypeApi) => {
          const rawPrice = st.price ?? st.price_raw ?? st.price_display;
          const priceNum = parseFixedPrice(rawPrice);
          const features = (st.serviceTypeDescriptions || []).map((d: ServiceTypeDescriptionApi) => d.description).filter(Boolean) as string[];

          return {
            id: st.id,
            name: st.name ?? st.title ?? `Tier ${st.id}`,
            price: priceNum,
            period: undefined, // unit is unknown here (service-level), leave undefined
            features,
          } as ServiceTier & { id: number };
        });

        if (mounted) setServiceTypesList(mapped);
      } catch (err: unknown) {
        if (mounted) setServiceTypesError((err as Error)?.message ?? String(err));
      } finally {
        if (mounted) setLoadingServiceTypes(false);
      }
    };
    loadTypes();
    return () => { mounted = false; };
  }, [watchedServiceId]);

  const submit = (data: FormValues) => {
    const normalized: BookingData = {
      cust_name: data.cust_name,
      cust_email: data.cust_email,
      cust_phone: data.cust_phone ?? "",
      service_id: data.service_id,
      service_type_id: data.service_type_id,
      start_date: data.start_date ?? "",
      end_date: data.end_date ?? "",
    };
    (async () => {
      setSubmitting(true);
      try {
        // API expects numeric IDs for service_id and service_type_id
        const apiBody: Record<string, unknown> = {
          ...normalized,
          service_id: Number(normalized.service_id),
          service_type_id: Number(normalized.service_type_id),
        };

        const res = await fetch('/api/guest/make-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(apiBody),
        });

        let json: Record<string, unknown> | null = null;
        try { json = await res.json(); } catch { /* ignore parse errors */ }

        if (!res.ok) {
          const msg = json && typeof json['message'] === 'string' ? (json['message'] as string) : `HTTP ${res.status}`;
          throw new Error(msg);
        }

        // Prefer a message from the API, otherwise a generic success
        const successMessage = json && typeof json['message'] === 'string' ? (json['message'] as string) : 'Order created successfully';

        // check for a redirect/payment URL in the response
        let redirectUrl: string | null = null;
        if (json) {
          const d = json['data'] as unknown;
          if (typeof d === 'string') redirectUrl = d;
          else if (d && typeof (d as Record<string, unknown>)['payment_url'] === 'string') redirectUrl = String((d as Record<string, unknown>)['payment_url']);
          else if (d && typeof (d as Record<string, unknown>)['url'] === 'string') redirectUrl = String((d as Record<string, unknown>)['url']);
        }

        if (redirectUrl) {
          // show toast informing user about redirect and countdown
          toast.success(`${successMessage} Redirecting to payment in 5 seconds...`);
          if (onSubmit) onSubmit(normalized);
          else console.log('Booking submitted:', normalized);
          onClose();

          // open payment page in a new tab after 5s
          setTimeout(() => {
            // try open in new tab; if blocked, navigate current window
            const opened = window.open(redirectUrl as string, '_blank', 'noopener');
            if (!opened) window.location.href = redirectUrl as string;
          }, 5000);
        } else {
          toast.success(successMessage);
          if (onSubmit) onSubmit(normalized);
          else console.log('Booking submitted:', normalized);
          onClose();
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err ?? 'Network error');
        toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    })();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order Service"
        size="md"
          footer={(
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-700">
              <div className="text-xs text-gray-500 font-bold">Price</div>
              <div className="text-md font-semibold text-(--bg-primary)">
                {selectedTier
                  ? `${selectedTier.price != null ? formatIDR(selectedTier.price) : (selectedTier.priceDisplay ?? "-")}${selectedTier.period ? ` ${selectedTier.period}` : ""}`
                  : "-"}
              </div>
            </div>

            <div className="w-full sm:w-auto">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleSubmit(submit)}
            disabled={loadingServices || submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <>
                <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              'Submit Booking'
            )}
          </Button>
            </div>
          </div>
        )}
    >
  <form className="space-y-4 text-left min-w-0" onSubmit={handleSubmit(submit)}>
        <p className="text-sm text-gray-500">Fill out the form below to place your service order.</p>

        <div>
          <Input
            label="Customer Name"
            {...register("cust_name")}
            name="cust_name"
            required
            prefix={<User className="w-4 h-4" />}
            error={errors.cust_name?.message}
          />
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          <Input
            label="Customer Phone"
            type="tel"
            {...register("cust_phone")}
            name="cust_phone"
            prefix={<Phone className="w-4 h-4" />}
            error={errors.cust_phone?.message}
          />

          <Input
            label="Customer Email"
            type="email"
            {...register("cust_email")}
            name="cust_email"
            required
            prefix={<Mail className="w-4 h-4" />}
            error={errors.cust_email?.message}
          />
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          <div>
            <Select
              id="service-select"
              label="Select Service"
              title="Select Service"
              {...register("service_id")}
              error={errors.service_id?.message}
              disabled={loadingServices}
            >
              {requireServiceSelection && <option value="">-- Select a service --</option>}
              {loadingServices ? (
                <option value="">Loading services...</option>
              ) : (
                servicesUsed.map((sv) => (
                  <option key={sv.id} value={sv.id}>{sv.title}</option>
                ))
              )}
            </Select>
          </div>

          <div>
            <Select
              id="service-type-select"
              label="Select Service Type"
              title="Select Service Type"
              {...register("service_type_id")}
              disabled={!watchedServiceId || loadingServiceTypes}
              error={errors.service_type_id?.message}
            >
              {loadingServiceTypes ? (
                <option value="">Loading service types...</option>
              ) : serviceTypesList ? (
                serviceTypesList.map((t, i) => (
                  <option key={String(((t as { id?: number }).id) ?? i)} value={String(((t as { id?: number }).id) ?? i)}>{t.name}{t.period ? ` - ${t.period}` : ''}</option>
                ))
              ) : watchedServiceId ? (() => {
                    const svc = servicesUsed.find((x) => x.id === watchedServiceId) || servicesUsed[0];
                    return svc.tiers.map((t, i) => (
                      <option key={String((((t as unknown) as { id?: number }).id) ?? i)} value={String((((t as unknown) as { id?: number }).id) ?? i)}>{t.name}{t.period ? ` - ${t.period}` : ''}</option>
                    ));
                  })() : (
                    <option value="">-- Select a service first --</option>
                  )}
            </Select>
          </div>
        </div>

        {servicesError && <p className="text-sm text-red-500">{servicesError}</p>}
        {serviceTypesError && <p className="text-sm text-red-500">{serviceTypesError}</p>}

        {/* Price will be shown next to Submit in the footer */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            {...register("start_date")}
            prefix={<Calendar className="w-4 h-4" />}
            error={errors.start_date?.message}
          />

          <div>
            <Input
              label="End Date"
              type="date"
              value={watch("end_date") ?? ""}
              disabled
            />
            <p className="mt-2 text-xs text-gray-500">End date is automatically set to 30 days after the start date.</p>
          </div>
        </div>
      </form>
    </Modal>
  );
}
