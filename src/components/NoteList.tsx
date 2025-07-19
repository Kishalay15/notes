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
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Notes ({notes.length})
        </h2>
      </div>

      <div className="px-2">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`group p-3 mb-1 rounded-lg cursor-pointer transition-all duration-150 ${
              note.id === activeNoteId
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
            }`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="flex items-start justify-between mb-1">
              <h3
                className={`font-medium text-sm truncate pr-2 ${
                  note.id === activeNoteId
                    ? "text-blue-900 dark:text-blue-100"
                    : "text-slate-900 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-slate-50"
                }`}
              >
                {note.title || "Untitled Note"}
              </h3>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${
                  note.docType === "md"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {note.docType.toUpperCase()}
              </span>
            </div>

            {getContentPreview(note.content) && (
              <p
                className={`text-xs mb-2 line-clamp-2 ${
                  note.id === activeNoteId
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {getContentPreview(note.content)}...
              </p>
            )}

            <p
              className={`text-xs ${
                note.id === activeNoteId
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {formatDate(note.lastModified)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
