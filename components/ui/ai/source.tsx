/* eslint-disable @next/next/no-img-element */
import { Button } from "../button";

type AISource = {
  url: string;
  title?: string;
};

type AIMessageSourcesProps = {
  sources: AISource[];
};

export const AISources = ({ sources }: AIMessageSourcesProps) => {
  if (!sources || sources.length === 0) return null;

  // take the first 5 sources that are unique by URL
  const uniqueSources = filterUniqueSources(sources).slice(0, 5);

  return (
    <Button
      className="flex flex-row items-center gap-2"
      size={"sm"}
      variant={"ghost"}
    >
      <span className="-space-x-2 flex items-center justify-center ">
        {uniqueSources.map((source, index) => (
          <img
            key={index}
            src={getFaviconUrl(source.url)}
            alt=""
            className="size-5 rounded-full bg-foreground p-0.5"
          />
        ))}
      </span>

      <span className="">
        {sources.length} {sources.length > 1 ? "Sources" : "Source"}
      </span>
    </Button>
  );
};

const filterUniqueSources = (sources: AISource[]) => {
  const uniqueUrls = new Set();
  return sources.filter((source) => {
    const url = new URL(source.url);
    if (uniqueUrls.has(url.host)) {
      return false;
    }
    uniqueUrls.add(url.host);
    return true;
  });
};

const getFaviconUrl = (url: string) => {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}`;
};
