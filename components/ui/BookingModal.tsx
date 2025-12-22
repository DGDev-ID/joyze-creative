"use client";

import React, { useEffect } from "react";
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
  const defaultService = services.length > 0 ? services[0].id : "";

  const defaultValues: FormValues = {
    cust_name: initial.cust_name ?? "",
    cust_email: initial.cust_email ?? "",
    cust_phone: initial.cust_phone ?? undefined,
    service_id: (requireServiceSelection ? (initial.service_id ?? "") : (initial.service_id ?? defaultService)) as string,
    service_type_id: (initial.service_type_id ?? (requireServiceSelection ? "" : "0")) as string,
    start_date: initial.start_date ?? undefined,
    end_date: initial.end_date ?? undefined,
  };

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
    mode: "onTouched",
  });

  // reset when modal opens or initial/services change
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, services]);

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

  const selectedService = services.find((s) => s.id === watchedServiceId);
  let selectedTier: ServiceTier | undefined = undefined;
  if (selectedService) {
    const idx = Number(watchedServiceType);
    if (!Number.isNaN(idx) && idx >= 0 && idx < selectedService.tiers.length) selectedTier = selectedService.tiers[idx];
    else selectedTier = selectedService.tiers[0];
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

  // when service changes, reset service_type to 0 (or empty)
  useEffect(() => {
    if (watchedServiceId) {
      setValue("service_type_id", "0");
    } else {
      setValue("service_type_id", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const simulateBookingApi = async () => {
      // simulate latency
      await new Promise((r) => setTimeout(r, 700));
      // static successful contract response
      return {
        status: "success",
        message: "Transaksi berhasil dibuat, silahkan selesaikan pembayaran anda",
        data: { payment_url: "" },
      } as const;
    };

    (async () => {
      try {
  const res = await simulateBookingApi();
        if (res.status === "success") {
          toast.success(res.message);
          if (onSubmit) onSubmit(normalized);
          else console.log("Booking submitted:", normalized);
          onClose();
        } else {
          // error path: show message from contract
          toast.error(res.message ?? "Unexpected error");
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err ?? "Network error");
        toast.error(msg);
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
              <Button variant="primary" className="w-full" onClick={handleSubmit(submit)}>Submit Booking</Button>
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
            >
              {requireServiceSelection && <option value="">-- Select a service --</option>}
              {services.map((sv) => (
                <option key={sv.id} value={sv.id}>{sv.title}</option>
              ))}
            </Select>
          </div>

          <div>
            <Select
              id="service-type-select"
              label="Select Service Type"
              title="Select Service Type"
              {...register("service_type_id")}
              disabled={!watchedServiceId}
              error={errors.service_type_id?.message}
            >
              {watchedServiceId
                ? (() => {
                    const svc = services.find((x) => x.id === watchedServiceId) || services[0];
                    return svc.tiers.map((t, i) => (
                      <option key={i} value={String(i)}>{t.name} - {t.period ?? ""}</option>
                    ));
                  })()
                : <option value="">-- Select a service first --</option>
              }
            </Select>
          </div>
        </div>

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
