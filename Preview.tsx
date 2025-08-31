import React from "react";
import { PortableText } from "@portabletext/react";
import type { PreviewProps } from "sanity";

// Define the structure of the blog document value
interface BlogPreviewValue {
  title?: string;
  body?: any;
}

export default function Preview(props: PreviewProps) {
  const { title, body } = props.value as BlogPreviewValue;

  return (
    <article
      style={{
        padding: "1rem",
        backgroundColor: "#1a1a2e",
        borderRadius: "8px",
        color: "#e0e0ff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      aria-label={title ? `Preview of ${title}` : "Preview with no title"}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        {title ?? "No Title"}
      </h1>
      <div>{body ? <PortableText value={body} /> : <em>No content available</em>}</div>
    </article>
  );
}
