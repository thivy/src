"use client";

import "katex/dist/katex.min.css";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { components } from "./markdown-nodes";

interface Props {
  content: string;
}

export const Markdown: FC<Props> = (props) => {
  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
    >
      {props.content}
    </ReactMarkdown>
  );
};
