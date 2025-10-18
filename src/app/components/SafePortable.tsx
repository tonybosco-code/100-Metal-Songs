"use client";

import React from "react";

type PortableChild = { text?: string; children?: PortableChild[] };
type PortableBlock = {
  _type?: string;
  children?: PortableChild[];
  text?: string;
};
type PortableValue = string | PortableBlock[] | null | undefined;

function toPlainText(val: PortableValue): string {
  if (!val) return "";
  if (typeof val === "string") return val;

  // Sanity Portable Text (very safe flatten)
  try {
    return (val as PortableBlock[])
      .map((block) => {
        if (block?.text) return block.text;
        if (Array.isArray(block?.children)) {
          return block!.children!.map((c) => c?.text ?? "").join("");
        }
        return "";
      })
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  value: PortableValue;
  /** If true, render a <span> instead of a <p> (useful inside grids) */
  plain?: boolean;
}

export default function SafePortable({ value, plain, className, ...rest }: Props) {
  const text = toPlainText(value);
  if (!text) return null;

  if (plain) {
    return (
      <span className={className} {...rest}>
        {text}
      </span>
    );
  }
  return (
    <p className={className} {...rest}>
      {text}
    </p>
  );
}
