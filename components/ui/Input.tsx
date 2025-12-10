import React, { forwardRef } from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
	label?: string;
	description?: string; // small helper text shown under the input
	error?: string | boolean;
	inputSize?: "sm" | "md" | "lg";
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	multiline?: boolean;
	rows?: number;
}

const cn = (...args: Array<string | false | null | undefined>) =>
	args.filter(Boolean).join(" ");

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
	(
				{
				label,
				description,
				error,
				className = "",
				inputSize = "md",
				prefix,
				suffix,
				multiline = false,
				rows = 4,
				id,
				...props
			},
		ref
	) => {
		const inputId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
		const helperId = description ? `${inputId ?? "input"}-helper` : undefined;

			const sizeClasses: Record<string, string> = {
				sm: "text-sm px-3 py-2 h-9",
				md: "text-sm px-3 py-2 h-11",
				lg: "text-base px-4 py-3 h-12",
			};

		const base = "w-full bg-white border rounded-md transition-shadow duration-150 focus:outline-none";
		const errorClasses = error ? "border-[var(--bg-danger)] ring-1 ring-[var(--bg-danger)]/20" : "border-gray-200 focus:ring-2 focus:ring-[var(--bg-primary)]/30";

		const prefixPadding = prefix ? "pl-10" : "";
		const suffixPadding = suffix ? "pr-10" : "";

		const classes = cn(base, errorClasses, sizeClasses[inputSize], prefixPadding, suffixPadding, className);

		return (
			<div className="w-full">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
						{label}
					</label>
				)}

				<div className="relative">
					{prefix && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
							{prefix}
						</div>
					)}

					{multiline ? (
									<textarea
							id={inputId}
							ref={ref as React.Ref<HTMLTextAreaElement>}
										rows={rows}
										  aria-invalid={error ? "true" : "false"}
										aria-describedby={helperId}
							className={cn(classes, "resize-none")}
							{...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
						/>
					) : (
						<input
							id={inputId}
							ref={ref as React.Ref<HTMLInputElement>}
										  aria-invalid={error ? "true" : "false"}
										  aria-describedby={helperId}
							className={classes}
							{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
						/>
					)}

					{suffix && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-auto">
							{suffix}
						</div>
					)}
				</div>

				{description && !error && (
					<p id={helperId} className="mt-2 text-xs text-gray-500">
						{description}
					</p>
				)}

						{error && typeof error === "string" && (
							<p className="mt-2 text-xs text-(--bg-danger)">{error}</p>
						)}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
