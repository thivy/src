"use client";

import { cn } from "@/components/lib/utils";
import { Config, Node, Tag } from "@markdoc/markdoc";
import { FC, memo } from "react";
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockItem,
} from "./code-block";

interface CustomCodeBlockProps {
  language: string;
  children: string;
}

export const CustomCodeBlock: FC<CustomCodeBlockProps> = memo(
  ({ language, children }) => {
    return (
      <CodeBlock
        className={cn("my-4 h-auto", "className")}
        code={children}
        language={language}
        defaultValue={language}
      >
        <CodeBlockHeader>
          <CodeBlockFilename key={language} value={language}>
            {language}
          </CodeBlockFilename>

          <CodeBlockCopyButton
            onCopy={() => console.log("Copied code to clipboard")}
            onError={() => console.error("Failed to copy code to clipboard")}
          />
        </CodeBlockHeader>
        <CodeBlockBody>
          <CodeBlockItem value={language}>
            <CodeBlockContent language={language as BundledLanguage}>
              {children}
            </CodeBlockContent>
          </CodeBlockItem>
        </CodeBlockBody>
      </CodeBlock>
    );
  }
);

CustomCodeBlock.displayName = "CustomCodeBlock";

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="group-[.is-assistant]:my-4">{children}</p>;
};

Paragraph.displayName = "Paragraph";

export const Hr = ({}: { children: React.ReactNode }) => {
  return <hr className="my-4" />;
};

Hr.displayName = "Hr";

export const Image = ({
  src,
  alt,
  className,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("max-w-full h-auto rounded-md my-2", className)}
      {...props}
    />
  );
};

Image.displayName = "Image";

export const List = ({
  children,
  className,
  ordered,
  ...props
}: React.HTMLAttributes<HTMLOListElement> & { ordered?: boolean }) => {
  if (ordered) {
    return (
      <ol
        className={cn("ml-4 list-outside list-decimal", className)}
        {...props}
      >
        {children}
      </ol>
    );
  }

  return (
    <ul className={cn("ml-4 list-outside list-disc", className)} {...props}>
      {children}
    </ul>
  );
};
List.displayName = "List";

export const ListItem = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn("py-3", className)} {...props}>
    {children}
  </li>
);
ListItem.displayName = "ListItem";

export const Strong = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("font-semibold", className)} {...props}>
    {children}
  </span>
);
Strong.displayName = "Strong";

export const Anchor = ({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn("font-medium text-primary underline", className)}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children}
  </a>
);
Anchor.displayName = "Anchor";

export const heading = {
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    // Define classNames for each heading level
    const headingClassNames: Record<number, string> = {
      1: "mt-6 mb-2 font-semibold text-3xl",
      2: "mt-6 mb-2 font-semibold text-2xl",
      3: "mt-6 mb-2 font-semibold text-xl",
      4: "mt-6 mb-2 font-semibold text-lg",
      5: "mt-6 mb-2 font-semibold text-base",
      6: "mt-6 mb-2 font-semibold text-sm",
    };

    const level = node.attributes["level"] as number;
    const className = headingClassNames[level] || "";

    // Merge with any existing className
    const mergedClassName = [attributes.className, className]
      .filter(Boolean)
      .join(" ");

    return new Tag(
      `h${level}`,
      { ...attributes, className: mergedClassName },
      children
    );
  },
};

export const componentConfig: Config = {
  nodes: {
    strong: {
      render: Strong.displayName,
    },
    link: {
      render: Anchor.displayName,
      attributes: {
        href: { type: String, required: true },
        title: { type: String, required: false },
      },
    },
    image: {
      render: Image.displayName,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: false },
        title: { type: String, required: false },
      },
    },
    hr: {
      render: Hr.displayName,
    },
    paragraph: {
      render: Paragraph.displayName,
    },
    fence: {
      render: CustomCodeBlock.displayName,
      attributes: {
        language: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    },
    heading: heading,
    list: {
      render: List.displayName,
      attributes: {
        ordered: { type: Boolean, default: false },
      },
    },
  },
  tags: {},
};
