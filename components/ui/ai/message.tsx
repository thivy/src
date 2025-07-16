import { cn } from "@/components/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ComponentProps, HTMLAttributes } from "react";

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "system" | "user" | "assistant" | "error";
};

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-5 container max-w-3xl mx-auto [scrollbar-gutter:stable_both-edges] overflow-y-auto",
      from === "user" ? "is-user" : "",
      from === "assistant" ? "is-assistant flex-row-reverse justify-end" : "",
      "",
      className
    )}
    {...props}
  />
);
export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>;
export const AIMessageContent = ({
  children,
  className,
  ...props
}: AIMessageContentProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-lg  py-3 text-sm group-[.is-user]:max-w-3/4 group-[.is-assistant]:w-full",
      "text-foreground",
      "group-[.is-user]:bg-input group-[.is-user]:text-foreground group-[.is-user]:px-4",
      className
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const AIMessageAvatar = ({
  src,
  name,
  className,
  ...props
}: AIMessageAvatarProps) => (
  <Avatar className={cn("size-8", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
