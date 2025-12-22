"use client";

import React from "react";
import { motion } from "framer-motion";

type LoadingProps = {
  /** Optional caption text. If omitted, no caption is shown. */
  text?: string;
  /** If true and `text` is not provided, a default caption "Loading..." will be shown. */
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
};

const sizeMap: Record<NonNullable<LoadingProps["size"]>, string> = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

export default function Loading({ text, showText = false, size = "md", fullScreen = false, className = "" }: LoadingProps) {
  const dims = sizeMap[size];

  const wrapperCls = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
    : "inline-flex items-center";

  return (
    <div className={`${wrapperCls} ${className}`} role="status" aria-live="polite">
  <div className={`flex items-center gap-3 ${dims}`}>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.18 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-(--bg-primary)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.36 }}
            />
          </div>
          {(text !== undefined || showText) && (
            <div className="text-sm text-gray-600 mt-2">{text ?? "Loading..."}</div>
          )}
        </div>
      </div>
    </div>
  );
}
