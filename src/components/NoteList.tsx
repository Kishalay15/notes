import type { NoteListProps } from "./NoteList.types";

export default function NoteList({
  notes,
  onSelectNote,
  activeNoteId,
}: NoteListProps) {
  const sortedNotes = [...notes].sort(
    (a, b) => b.lastModified - a.lastModified
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getContentPreview = (content: string) => {
    // Remove markdown headers and get first line of actual content
    const lines = content
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"));
    return lines[0]?.substring(0, 60) || "";
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-200 dark:bg-slate-900">
      <div className="p-4 bg-gray-400 dark:bg-slate-800 border-b-4 border-black">
        <h2 className="text-sm font-mono font-bold text-black dark:text-white tracking-wider">
          NOTES ({notes.length})
        </h2>
      </div>
      <div className="p-2">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`group p-3 mb-2 cursor-pointer border-2 border-black transition-all duration-150 ${note.id === activeNoteId
              ? "bg-black text-white shadow-inner"
              : "bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-black dark:text-white"
              }`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-mono font-bold text-sm truncate pr-2">
                {note.title || "UNTITLED NOTE"}
              </h3>
              <span
                className={`text-xs font-mono font-bold px-2 py-1 border-2 border-black flex-shrink-0 ${note.docType === "md"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-black dark:bg-slate-700 dark:text-white"
                  }`}
              >
                {note.docType.toUpperCase()}
              </span>
            </div>
            {getContentPreview(note.content) && (
              <p className={`text-xs mb-2 font-mono ${note.id === activeNoteId
                ? "text-gray-300"
                : "text-gray-600 dark:text-gray-400"
                }`}>
                {getContentPreview(note.content)}...
              </p>
            )}
            <p className={`text-xs font-mono ${note.id === activeNoteId
              ? "text-gray-400"
              : "text-gray-500 dark:text-gray-400"
              }`}>
              {formatDate(note.lastModified)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
