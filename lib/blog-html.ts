import sanitizeHtml from "sanitize-html";

/** Server-side defence in depth for HTML stored by the blog editor. */
export function sanitizeBlogHtml(value: string): string {
  return sanitizeHtml(value || "", {
    allowedTags: [
      "p", "br", "h1", "h2", "h3", "h4", "strong", "b", "em", "i", "u",
      "s", "strike", "a", "blockquote", "hr", "pre", "code", "ul", "ol", "li",
      "table", "thead", "tbody", "tr", "th", "td", "figure", "figcaption", "img", "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      h1: ["id", "style"],
      h2: ["id", "style"],
      h3: ["id", "style"],
      h4: ["id", "style"],
      p: ["style"],
      blockquote: ["style"],
      td: ["colspan", "rowspan", "style"],
      th: ["colspan", "rowspan", "scope", "style"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      figure: ["style"],
      span: ["style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^(?:left|right|center|justify)$/],
      },
      figure: {
        width: [/^(?:40|60|80|100)%$/],
      },
      span: {
        "font-weight": [/^(?:bold|[6-9]00)$/],
        "font-style": [/^italic$/],
        "text-decoration": [/^(?:underline|line-through)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href || "");
        return {
          tagName: "a",
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
      img: (_tagName, attribs) => ({
        tagName: "img",
        attribs: { ...attribs, loading: "lazy", alt: attribs.alt || "" },
      }),
    },
  });
}
