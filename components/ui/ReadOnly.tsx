"use client";

import React from "react";

type ReadOnlyProps = {
	label?: string;
	value?: React.ReactNode;
	description?: string;
	/** size controls padding and font-size */
	size?: "sm" | "md" | "lg";
	className?: string;
};

const sizeMap: Record<NonNullable<ReadOnlyProps["size"]>, string> = {
	sm: "text-sm py-1 px-2",
	md: "text-base py-2 px-3",
	lg: "text-lg py-3 px-4",
};

export default function ReadOnlyField({
	label,
	value,
	description,
	size = "md",
	className = "",
}: ReadOnlyProps) {
	return (
		<div className={"flex flex-col " + className}>
			{label && (
				<label className="text-sm font-medium text-gray-700 mb-1">
					{label}
				</label>
			)}

					<div className={`w-full rounded-md border border-green-200 bg-green-50 text-green-900 ${sizeMap[size]} wrap-break-word`}>{value ?? "-"}</div>

			{description && (
				<p className="text-xs text-gray-500 mt-1">{description}</p>
			)}
		</div>
	);
}
