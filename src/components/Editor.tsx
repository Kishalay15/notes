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
    // <div className="h-full flex flex-col">
    //   <input
    //     type="text"
    //     className="p-3 sm:p-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none text-lg sm:text-xl font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 border-b border-slate-200 dark:border-slate-700"
    //     value={note.title}
    //     onChange={handleTitleChange}
    //     placeholder="Note Title"
    //   />
    //   <textarea
    //     className="flex-grow p-3 sm:p-6 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500"
    //     value={note.content}
    //     onChange={handleContentChange}
    //     placeholder="Start writing your note..."
    //     spellCheck="false"
    //     autoFocus
    //     style={{
    //       fontFamily:
    //         '"JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    //     }}
    //   />
    // </div>
    <div className="h-full flex flex-col bg-white">
      <input
        type="text"
        className="p-3 sm:p-4 bg-gray-100 text-black focus:outline-none text-lg sm:text-xl font-mono font-bold placeholder:text-gray-600 border-b-4 border-black"
        value={note.title}
        onChange={handleTitleChange}
        placeholder="NOTE TITLE..."
      />
      <textarea
        className="flex-grow p-3 sm:p-6 bg-white text-black focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-gray-500"
        value={note.content}
        onChange={handleContentChange}
        placeholder="START TYPING YOUR NOTE..."
        spellCheck="false"
        autoFocus
        style={{
          fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
        }}
      />
    </div>
  );
}
