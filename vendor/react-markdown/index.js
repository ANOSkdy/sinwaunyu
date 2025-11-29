/* eslint-disable */
const React = require("react");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function transformInline(text) {
  const withLinks = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    const safeUrl = escapeHtml(url);
    return `<a href="${safeUrl}" target="_blank" rel="noreferrer noopener">${escapeHtml(label)}</a>`;
  });
  const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const withItalics = withBold.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return withItalics;
}

function renderBlock(block, index) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
  if (headingMatch) {
    const level = Math.min(headingMatch[1].length, 6);
    const content = transformInline(headingMatch[2]);
    return React.createElement(`h${level}`,
      { key: `h${level}-${index}`, dangerouslySetInnerHTML: { __html: content } }
    );
  }

  const lines = trimmed.split(/\r?\n/);
  const isList = lines.every((line) => /^[-*]\s+/.test(line));
  if (isList) {
    const items = lines.map((line, liIndex) => {
      const content = transformInline(line.replace(/^[-*]\s+/, "").trim());
      return React.createElement("li", {
        key: `li-${index}-${liIndex}`,
        dangerouslySetInnerHTML: { __html: content },
      });
    });
    return React.createElement("ul", { key: `ul-${index}` }, items);
  }

  const content = transformInline(trimmed).replace(/\n/g, "<br />");
  return React.createElement("p", {
    key: `p-${index}`,
    dangerouslySetInnerHTML: { __html: content },
  });
}

function ReactMarkdown({ children, className }) {
  const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  const blocks = text.split(/\n\s*\n/).map(renderBlock).filter(Boolean);
  return React.createElement("div", { className }, blocks);
}

module.exports = ReactMarkdown;
module.exports.default = ReactMarkdown;
