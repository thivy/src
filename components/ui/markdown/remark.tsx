"use client";

import { cn } from "@/components/lib/utils";
import { PropsWithChildren } from "react";
import Markdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockItem,
  type CodeBlockProps,
} from "./code-block";

const components: Options["components"] = {
  img: ({ src, alt, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("max-w-full h-auto rounded-md my-2", className)}
      {...props}
    />
  ),
  ol: ({ children, className, ...props }) => (
    <ol className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, className, ...props }) => (
    <li className={cn("py-1", className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ children, className, ...props }) => (
    <ul className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, className, ...props }) => (
    <span className={cn("font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  a: ({ children, className, ...props }) => (
    <a
      className={cn("font-medium text-primary underline", className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children, className, ...props }) => (
    <h1
      className={cn("mt-6 mb-2 font-semibold text-3xl", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 font-semibold text-2xl", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 font-semibold text-xl", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }) => (
    <h4 className={cn("mt-6 mb-2 font-semibold text-lg", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }) => (
    <h5
      className={cn("mt-6 mb-2 font-semibold text-base", className)}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }) => (
    <h6 className={cn("mt-6 mb-2 font-semibold text-sm", className)} {...props}>
      {children}
    </h6>
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-4", className)} {...props} />
  ),
  pre: ({ node, className, children }) => {
    const childrenIsCode =
      typeof children === "object" &&
      children !== null &&
      "type" in children &&
      children.type === "code";

    if (!childrenIsCode) {
      return <pre>{children}</pre>;
    }

    let language = "javascript";

    if (node?.children) {
      const children = node.children;

      if (children.length > 0) {
        const firstChild = children[0];

        if (firstChild.type === "element") {
          const firstNode = firstChild.properties["className"];
          if (Array.isArray(firstNode)) {
            language = `${firstNode[0]}`.replace("language-", "");
          }
        }
      }
    }

    const data: CodeBlockProps["data"] = [
      {
        language,
        code: (children.props as { children: string }).children,
      },
    ];

    return (
      <CodeBlock
        className={cn("my-4 h-auto", className)}
        data={data}
        defaultValue={data[0].language}
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
              {data[0].code}
            </CodeBlockContent>
          </CodeBlockItem>
        </CodeBlockBody>
      </CodeBlock>
    );
  },
};

export type ReactMarkdownProps = PropsWithChildren & {
  options?: Options;
  children: Options["children"];
};

export const ReactMarkdown = ({ options, children }: ReactMarkdownProps) => {
  return (
    <Markdown components={components} remarkPlugins={[remarkGfm]} {...options}>
      {children}
    </Markdown>
  );
};
