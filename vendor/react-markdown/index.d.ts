import * as React from "react";

export interface ReactMarkdownOptions {
  children?: string | string[];
  className?: string;
  remarkPlugins?: unknown[];
}

export default function ReactMarkdown(
  props: ReactMarkdownOptions
): React.ReactElement;
