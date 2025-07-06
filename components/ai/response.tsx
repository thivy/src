"use client";

import { cn } from "@/components/lib/utils";
import type { HTMLAttributes } from "react";
import { memo } from "react";
import { type Options } from "react-markdown";
import { ReactMarkdown } from "../ui/markdown/remark";

export type AIResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
};

export const AIResponse = memo(
  ({ className, options, children, ...props }: AIResponseProps) => (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 max-w-none",
        className
      )}
      {...props}
    >
      <ReactMarkdown {...options}>{children}</ReactMarkdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

AIResponse.displayName = "AIResponse";
