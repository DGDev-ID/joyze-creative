"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
}: ModalProps) {
  const previouslyFocused = useRef<Element | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      // delay focusing to allow animation/mount
      setTimeout(() => dialogRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current && open) {
        // basic focus trap
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);



  const maxWidth = {
    sm: "max-w-xl",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    full: "w-full max-w-5xl mx-4",
  }[size];

  const node = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-hidden={!open}
        >
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => closeOnOverlayClick && onClose()}
          />

          {/* dialog */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`relative z-10 w-full ${maxWidth}`}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              className="bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="text-lg font-semibold text-gray-900">{title}</div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <X />
                </button>
              </div>

              <div className="p-6 text-gray-700">{children}</div>

              {footer && <div className="p-4 border-t border-gray-100">{footer}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // avoid using `document`/portals during SSR — return null when document is not available
  if (typeof document === "undefined") return null;

  return createPortal(node, document.body);
}
