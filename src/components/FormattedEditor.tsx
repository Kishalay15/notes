import { useEffect, useRef, useState } from "react";
import type { ContentEditableEvent } from 'react-contenteditable';
import TurndownService from "turndown";
import { marked } from "marked";
import ContentEditable from "react-contenteditable";
import type { FormattedEditorProps } from "./FormattedEditor.types";

const turndownService = new TurndownService();

export default function FormattedEditor({ note, onChange }: FormattedEditorProps) {
    const [html, setHtml] = useState<string>("");
    const htmlRef = useRef("");

    useEffect(() => {
        const renderMarkdown = async () => {
            const newHtml = await marked(note.content || "");
            setHtml(newHtml);
            htmlRef.current = newHtml;
        };
        renderMarkdown();
    }, [note.id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...note,
            title: e.target.value,
            lastModified: Date.now(),
        });
    };

    const handleChange = (e: ContentEditableEvent) => {
        const target = e.target;

        if (target instanceof HTMLElement) {
            const updatedHtml = target.innerHTML;
            setHtml(updatedHtml);
            htmlRef.current = updatedHtml;

            const updatedMarkdown = turndownService.turndown(updatedHtml);

            onChange({
                ...note,
                content: updatedMarkdown,
                lastModified: Date.now(),
            });
        };
    };

    const applyFormat = (tag: keyof HTMLElementTagNameMap) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selected = range.extractContents();

        const el = document.createElement(tag);
        el.appendChild(selected);
        range.insertNode(el);
    };

    const applyHighlight = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";

        const selectedText = range.extractContents();
        span.appendChild(selectedText);
        range.insertNode(span);
    };

    const applyList = () => {
        document.execCommand?.("insertUnorderedList");
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900">
            {/* Title input */}
            <input
                type="text"
                className="p-3 sm:p-4 bg-gray-100 dark:bg-slate-700 dark:text-white text-black focus:outline-none text-lg sm:text-xl font-mono font-bold placeholder:text-gray-600 dark:placeholder:text-gray-400 border-b-4 border-black"
                value={note.title}
                onChange={handleTitleChange}
                placeholder="NOTE TITLE..."
            />

            {/* Formatting buttons */}
            <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                    <button onClick={() => applyFormat("strong")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Bold</button>
                    <button onClick={() => applyFormat("em")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Italic</button>
                    <button onClick={() => applyFormat("u")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Underline</button>
                    <button onClick={() => applyFormat("s")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Strikethrough</button>
                    <button onClick={() => applyFormat("h1")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">H1</button>
                    <button onClick={() => applyFormat("h2")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">H2</button>
                    <button onClick={applyHighlight} className="px-2 py-1 rounded bg-yellow-300 text-black hover:bg-yellow-400">Highlight</button>
                    <button onClick={applyList} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">• List</button>
                </div>
            </div>

            {/* Editable content area */}
            <div className="flex-grow p-4 sm:p-6">
                <ContentEditable
                    html={html}
                    onChange={handleChange}
                    className="w-full min-h-[80vh] outline-none text-black dark:text-white prose dark:prose-invert"
                    tagName="div"
                />
            </div>
        </div>
    );
}
