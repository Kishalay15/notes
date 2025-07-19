import type { EditorProps } from "./Editor.types";

export default function Editor({ note, onChange }: EditorProps) {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const newTitle = newContent.split("\n")[0] || "Untitled Note";
    onChange({
      ...note,
      content: newContent,
      title: newTitle,
      lastModified: Date.now(),
    });
  };

  return (
    <div className="h-full flex flex-col">
      <textarea
        className="flex-grow p-6 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500"
        value={note.content}
        onChange={handleContentChange}
        placeholder="Start writing your note..."
        spellCheck="false"
        style={{
          fontFamily:
            '"JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
        }}
      />
    </div>
  );
}
