import type { EditorProps } from "./Editor.types";

export default function Editor({ note, onChange }: EditorProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...note,
      title: e.target.value,
      lastModified: Date.now(),
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...note,
      content: e.target.value,
      lastModified: Date.now(),
    });
  };

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

      {/* Content Textarea */}
      <div className="flex-1 relative">
        <textarea
          className="w-full h-full px-6 py-6 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none resize-none text-[15px] leading-relaxed placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors"
          value={note.content}
          onChange={handleContentChange}
          placeholder="Start writing your thoughts..."
          spellCheck="false"
          autoFocus
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, "Liberation Mono", Menlo, monospace',
            lineHeight: '1.7',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(161 161 170 / 0.3) transparent',
          }}
        />

        {/* Subtle Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent dark:from-zinc-900/80 pointer-events-none" />
      </div>

      {/* Character Count (Optional Enhancement) */}
      {note.content.length > 500 && (
        <div className="flex justify-end px-6 py-2 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-200/40 dark:border-zinc-800/40">
          {note.content.length.toLocaleString()} characters
        </div>
      )}
    </div>
  );
}
