import { useEffect, useRef, useState } from "react";
import TurndownService from "turndown";
import { marked } from "marked";
import ContentEditable, { type ContentEditableEvent } from "react-contenteditable";
import type { FormattedEditorProps } from "./FormattedEditor.types";

const turndownService = new TurndownService();

export default function FormattedEditor({ note, onChange }: FormattedEditorProps) {
    const [html, setHtml] = useState<string>("");
    const htmlRef = useRef("");
    const isUpdatingFromMarkdown = useRef(false);

    useEffect(() => {
        const renderMarkdown = async () => {
            if (isUpdatingFromMarkdown.current) return;

            const newHtml = await marked(note.content || "");
            if (htmlRef.current !== newHtml) {
                setHtml(newHtml);
                htmlRef.current = newHtml;
            }
        };
        renderMarkdown();
    }, [note.id, note.content]); // Added note.content as dependency

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...note,
            title: e.target.value,
            lastModified: Date.now(),
        });
    };

    const handleChange = (e: ContentEditableEvent) => {

        const updatedHtml = e.target.value;

        setHtml(updatedHtml);
        htmlRef.current = updatedHtml;

        // Prevent the useEffect from overriding our changes
        isUpdatingFromMarkdown.current = true;

        const updatedMarkdown = turndownService.turndown(updatedHtml);

        onChange({
            ...note,
            content: updatedMarkdown,
            lastModified: Date.now(),
        });

        // Reset the flag after a short delay
        setTimeout(() => {
            isUpdatingFromMarkdown.current = false;
        }, 100);
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

    const formatButtons = [
        {
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                </svg>
            ),
            action: () => applyFormat("strong"),
            title: "Bold"
        },
        {
            icon: <span className="text-sm italic font-medium">I</span>,
            action: () => applyFormat("em"),
            title: "Italic"
        },
        {
            icon: <span className="text-sm underline font-medium">U</span>,
            action: () => applyFormat("u"),
            title: "Underline"
        },
        {
            icon: <span className="text-sm line-through font-medium">S</span>,
            action: () => applyFormat("s"),
            title: "Strikethrough"
        }
    ];

    const headingButtons = [
        {
            label: "H1",
            action: () => applyFormat("h1"),
            title: "Heading 1"
        },
        {
            label: "H2",
            action: () => applyFormat("h2"),
            title: "Heading 2"
        },
        {
            label: "H3",
            action: () => applyFormat("h3"),
            title: "Heading 3"
        }
    ];

    const utilityButtons = [
        {
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
            ),
            action: applyList,
            title: "Bullet List"
        },
        {
            icon: <span className="text-xs font-medium bg-amber-200 text-amber-800 px-1 rounded">H</span>,
            action: applyHighlight,
            title: "Highlight Text"
        }
    ];

    return (
        <div className="h-full flex flex-col bg-white dark:bg-zinc-900">
            {/* Title Input */}
            <div className="border-b border-zinc-200/60 dark:border-zinc-800/60">
                <input
                    type="text"
                    className="w-full px-6 py-5 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none text-xl font-semibold placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors"
                    value={note.title}
                    onChange={handleTitleChange}
                    placeholder="Untitled"
                    maxLength={100}
                />
            </div>

            {/* Formatting Toolbar */}
            <div className="px-6 py-4 border-b border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-1">
                    {/* Text Formatting */}
                    <div className="flex items-center gap-1">
                        {formatButtons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.action}
                                className="flex items-center justify-center w-8 h-8 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 rounded-lg transition-all duration-200"
                                title={`${button.title}`}
                            >
                                {button.icon}
                            </button>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-2"></div>

                    {/* Headings */}
                    <div className="flex items-center gap-1">
                        {headingButtons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.action}
                                className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 rounded-lg transition-all duration-200"
                                title={button.title}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-2"></div>

                    {/* Utility Tools */}
                    <div className="flex items-center gap-1">
                        {utilityButtons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.action}
                                className="flex items-center justify-center w-8 h-8 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 rounded-lg transition-all duration-200"
                                title={button.title}
                            >
                                {button.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Editable Content Area */}
            <div className="flex-1 px-6 py-6 overflow-y-auto">
                <ContentEditable
                    html={html}
                    disabled={false} // Add this required prop
                    onChange={handleChange}
                    className="whitespace-pre-wrap break-words leading-normal w-full min-h-full outline-none text-zinc-800 dark:text-zinc-200 prose prose-zinc dark:prose-invert max-w-none prose-base focus:outline-none
                        prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
                        prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-7
                        prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
                        prose-em:text-zinc-800 dark:prose-em:text-zinc-200
                        prose-ul:text-zinc-700 dark:prose-ul:text-zinc-300
                        prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-500"
                    tagName="div"
                    data-placeholder={html ? "" : "Start writing your formatted content..."}
                    style={{
                        minHeight: '400px'
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    [data-placeholder]:empty:before {
                        content: attr(data-placeholder);
                        color: rgb(161 161 170);
                        pointer-events: none;
                        font-style: italic;
                    }

                    .dark [data-placeholder]:empty:before {
                        color: rgb(113 113 122);
                    }
                `
            }} />
        </div>
    );
}
