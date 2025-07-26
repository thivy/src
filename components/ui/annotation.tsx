"use client";

import { cn } from "@/components/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Badge } from "./badge";

export interface AnnotationProps extends PropsWithChildren {
  href: string;
  title?: string;
  className?: string;
  variant?: "outline" | "default" | "secondary" | "destructive";
}

export function Annotation({
  href,
  children,
  title,
  className,
  variant = "outline",
}: AnnotationProps) {
  return (
    <Badge asChild variant={variant} className={cn("ml-0.5", className)}>
      <Link
        href={href}
        title={title}
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:no-underline"
      >
        {children}
      </Link>
    </Badge>
  );
}
