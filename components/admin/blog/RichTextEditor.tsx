"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
} from "lucide-react";
import { uploadBlogImage } from "@/lib/blog-storage";
import { legacyTextToHtml } from "@/lib/blog-content";

type Props = {
  value: string;
  onChange: (html: string) => void;
  label?: string;
};

const ALLOWED_TAGS = new Set([
  "P", "BR", "H1", "H2", "H3", "H4", "STRONG", "B", "EM", "I", "U", "S",
  "STRIKE", "A", "BLOCKQUOTE", "HR", "PRE", "CODE", "UL", "OL", "LI", "TABLE",
  "THEAD", "TBODY", "TR", "TH", "TD", "FIGURE", "FIGCAPTION", "IMG", "SPAN",
]);
const DROP_TAGS = new Set(["SCRIPT", "STYLE", "META", "LINK", "IFRAME", "OBJECT", "EMBED"]);

function safeUrl(value: string, allowRelative = true): string {
  const url = value.trim();
  if (!url) return "";
  if (allowRelative && (url.startsWith("/") || url.startsWith("#"))) return url;
  return /^(?:https?:|mailto:|tel:)/i.test(url) ? url : "";
}

/** Keeps useful Word/Docs formatting while removing scripts, classes and unsafe URLs. */
export function sanitizeEditorHtml(html: string): string {
  if (typeof DOMParser === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const elements = Array.from(doc.body.querySelectorAll("*"));

  for (const element of elements) {
    if (DROP_TAGS.has(element.tagName)) {
      element.remove();
      continue;
    }
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }

    const oldStyle = (element as HTMLElement).style;
    const textAlign = /^(left|right|center|justify)$/.test(oldStyle.textAlign)
      ? oldStyle.textAlign
      : "";
    const isBold = /^(bold|[6-9]00)$/.test(oldStyle.fontWeight);
    const isItalic = oldStyle.fontStyle === "italic";
    const decoration = oldStyle.textDecorationLine || oldStyle.textDecoration;
    const safeStyle: string[] = [];
    if (textAlign && ["P", "H1", "H2", "H3", "H4", "BLOCKQUOTE", "TH", "TD"].includes(element.tagName)) {
      safeStyle.push(`text-align:${textAlign}`);
    }
    if (element.tagName === "SPAN") {
      if (isBold) safeStyle.push("font-weight:bold");
      if (isItalic) safeStyle.push("font-style:italic");
      if (decoration.includes("underline")) safeStyle.push("text-decoration:underline");
      if (decoration.includes("line-through")) safeStyle.push("text-decoration:line-through");
    }

    const id = element.getAttribute("id") || "";
    const href = element.tagName === "A" ? safeUrl(element.getAttribute("href") || "") : "";
    const src = element.tagName === "IMG" ? safeUrl(element.getAttribute("src") || "", false) : "";
    const alt = element.tagName === "IMG" ? element.getAttribute("alt") || "" : "";
    const title = ["A", "IMG"].includes(element.tagName) ? element.getAttribute("title") || "" : "";
    const colSpan = ["TH", "TD"].includes(element.tagName) ? element.getAttribute("colspan") || "" : "";
    const rowSpan = ["TH", "TD"].includes(element.tagName) ? element.getAttribute("rowspan") || "" : "";

    for (const attr of Array.from(element.attributes)) element.removeAttribute(attr.name);
    if (id && /^[-_a-zA-Z0-9]+$/.test(id)) element.setAttribute("id", id);
    if (href) element.setAttribute("href", href);
    if (src) element.setAttribute("src", src);
    if (alt) element.setAttribute("alt", alt);
    if (title) element.setAttribute("title", title);
    if (colSpan && /^\d{1,2}$/.test(colSpan)) element.setAttribute("colspan", colSpan);
    if (rowSpan && /^\d{1,2}$/.test(rowSpan)) element.setAttribute("rowspan", rowSpan);
    if (safeStyle.length) element.setAttribute("style", safeStyle.join(";"));
  }

  return doc.body.innerHTML
    .replace(/<p>(?:\s|<br\s*\/?\s*>)*<\/p>/gi, "<p><br></p>")
    .trim();
}

function ToolButton({
  title,
  onRun,
  children,
  disabled = false,
}: {
  title: string;
  onRun: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onRun}
      className="grid h-8 min-w-8 place-items-center rounded-md border border-transparent px-1.5 text-slate-400 transition hover:border-white/10 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, label = "Article content" }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const lastEmittedRef = useRef("");
  const focusedRef = useRef(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || focusedRef.current || value === lastEmittedRef.current) return;
    const html = sanitizeEditorHtml(legacyTextToHtml(value));
    if (editor.innerHTML !== html) editor.innerHTML = html;
    lastEmittedRef.current = value;
  }, [value]);

  function rememberSelection() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) selectionRef.current = range.cloneRange();
  }

  function restoreSelection() {
    const selection = window.getSelection();
    if (!selection || !selectionRef.current) return;
    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
  }

  function emit({ sanitise = false } = {}) {
    const editor = editorRef.current;
    if (!editor) return;
    const html = sanitise ? sanitizeEditorHtml(editor.innerHTML) : editor.innerHTML;
    if (sanitise && html !== editor.innerHTML) editor.innerHTML = html;
    lastEmittedRef.current = html;
    onChange(html);
  }

  function command(name: string, argument?: string) {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    restoreSelection();
    document.execCommand(name, false, argument);
    rememberSelection();
    emit();
  }

  function addLink() {
    restoreSelection();
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setUploadError("Select the words you want to link first.");
      return;
    }
    const entered = window.prompt("Link URL (https://…, /internal-page, or #anchor)");
    if (entered === null) return;
    const href = safeUrl(entered);
    if (!href) {
      setUploadError("That link is not a supported URL.");
      return;
    }
    setUploadError("");
    command("createLink", href);
  }

  async function uploadInlineImage(file: File) {
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadBlogImage(file);
      const alt = window.prompt("Describe this image for screen readers (alt text)", "") || "";
      const caption = window.prompt("Optional image caption", "") || "";
      const safeAlt = alt.replace(/[<>&"']/g, "");
      const safeCaption = caption.replace(/[<>&]/g, "");
      const html = `<figure style="width:100%"><img src="${url}" alt="${safeAlt}">${safeCaption ? `<figcaption>${safeCaption}</figcaption>` : ""}</figure><p><br></p>`;
      command("insertHTML", html);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const sourceHtml = event.clipboardData.getData("text/html");
    if (sourceHtml) {
      command("insertHTML", sanitizeEditorHtml(sourceHtml));
      return;
    }
    const text = event.clipboardData.getData("text/plain");
    command("insertHTML", legacyTextToHtml(text));
  }

  return (
    <div className="overflow-visible rounded-xl border border-white/10 bg-[#030810]/70 focus-within:border-[#FF6B00]/50">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-white/10 bg-[#07101f]/95 p-2 backdrop-blur-xl">
        <select
          aria-label="Text style"
          defaultValue="p"
          onMouseDown={rememberSelection}
          onChange={(event) => {
            command("formatBlock", event.target.value);
            event.currentTarget.value = "p";
          }}
          className="mr-1 h-8 rounded-md border border-white/10 bg-white/5 px-2 text-xs font-semibold text-slate-300 outline-none [&>option]:bg-[#07101f]"
        >
          <option value="p">Paragraph</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
        </select>
        <ToolButton title="Bold (Ctrl+B)" onRun={() => command("bold")}><Bold size={15} /></ToolButton>
        <ToolButton title="Italic (Ctrl+I)" onRun={() => command("italic")}><Italic size={15} /></ToolButton>
        <ToolButton title="Underline (Ctrl+U)" onRun={() => command("underline")}><Underline size={15} /></ToolButton>
        <ToolButton title="Strikethrough" onRun={() => command("strikeThrough")}><Strikethrough size={15} /></ToolButton>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <ToolButton title="Align left" onRun={() => command("justifyLeft")}><AlignLeft size={15} /></ToolButton>
        <ToolButton title="Align center" onRun={() => command("justifyCenter")}><AlignCenter size={15} /></ToolButton>
        <ToolButton title="Align right" onRun={() => command("justifyRight")}><AlignRight size={15} /></ToolButton>
        <ToolButton title="Justify" onRun={() => command("justifyFull")}><AlignJustify size={15} /></ToolButton>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <ToolButton title="Bulleted list" onRun={() => command("insertUnorderedList")}><List size={15} /></ToolButton>
        <ToolButton title="Numbered list" onRun={() => command("insertOrderedList")}><ListOrdered size={15} /></ToolButton>
        <ToolButton title="Blockquote" onRun={() => command("formatBlock", "blockquote")}><Quote size={15} /></ToolButton>
        <ToolButton title="Code block" onRun={() => command("formatBlock", "pre")}><Code2 size={15} /></ToolButton>
        <ToolButton title="Horizontal divider" onRun={() => command("insertHorizontalRule")}><Minus size={15} /></ToolButton>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <ToolButton title="Insert link" onRun={addLink}><Link2 size={15} /></ToolButton>
        <ToolButton title="Remove link" onRun={() => command("unlink")}><Unlink size={15} /></ToolButton>
        <ToolButton title="Upload image at cursor" onRun={() => { rememberSelection(); fileRef.current?.click(); }} disabled={uploading}>
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <ToolButton title="Undo (Ctrl+Z)" onRun={() => command("undo")}><Undo2 size={15} /></ToolButton>
        <ToolButton title="Redo (Ctrl+Y)" onRun={() => command("redo")}><Redo2 size={15} /></ToolButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadInlineImage(file);
          }}
        />
      </div>

      <div
        ref={editorRef}
        role="textbox"
        aria-label={label}
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Start writing…"
        onFocus={() => { focusedRef.current = true; }}
        onBlur={() => { focusedRef.current = false; emit({ sanitise: true }); }}
        onInput={() => emit()}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
        onSelect={rememberSelection}
        onPaste={handlePaste}
        className="blog-editor-content min-h-56 px-4 py-4 text-sm leading-7 text-slate-200 outline-none"
      />
      <div className="flex min-h-7 items-center justify-between border-t border-white/5 px-3 py-1 text-[10px] text-slate-500">
        <span>Formatting and undo history stay native while you type.</span>
        {uploadError && <span className="font-semibold text-red-300">{uploadError}</span>}
      </div>
    </div>
  );
}
