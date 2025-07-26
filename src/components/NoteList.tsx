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

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getContentPreview = (content: string) => {
    // Remove markdown formatting and get clean text
    const cleanContent = content
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
      .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list markers
      .split('\n')
      .filter(line => line.trim())
      .join(' ');

    return cleanContent.substring(0, 80) || "";
  };

  const getDocTypeInfo = (docType: string) => {
    switch (docType) {
      case "md":
        return {
          label: "MD",
          className: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
        };
      case "formatted":
        return {
          label: "RICH",
          className: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
        };
      default:
        return {
          label: "TXT",
          className: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
        };
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Notes
          </h2>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
            {notes.length}
          </span>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        {sortedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-zinc-400 dark:text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504-1.125 1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              No notes yet
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Create your first note to get started
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sortedNotes.map((note) => {
              const isActive = note.id === activeNoteId;
              const docTypeInfo = getDocTypeInfo(note.docType);
              const preview = getContentPreview(note.content);

              return (
                <div
                  key={note.id}
                  className={`group relative p-4 cursor-pointer rounded-xl transition-all duration-200 ${isActive
                    ? "bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 shadow-sm"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                  onClick={() => onSelectNote(note.id)}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-zinc-900 dark:bg-zinc-100 rounded-r-full" />
                  )}

                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-sm font-semibold truncate pr-3 flex-1 ${isActive
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-800 dark:text-zinc-200"
                      }`}>
                      {note.title || "Untitled"}
                    </h3>

                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md flex-shrink-0 ${docTypeInfo.className}`}>
                      {docTypeInfo.label}
                    </span>
                  </div>

                  {/* Content Preview */}
                  {preview && (
                    <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${isActive
                      ? "text-zinc-600 dark:text-zinc-400"
                      : "text-zinc-500 dark:text-zinc-500"
                      }`}>
                      {preview}
                      {preview.length >= 80 && "..."}
                    </p>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-medium ${isActive
                      ? "text-zinc-500 dark:text-zinc-400"
                      : "text-zinc-400 dark:text-zinc-500"
                      }`}>
                      {formatDate(note.lastModified)}
                    </p>

                    {/* Word Count */}
                    {note.content && (
                      <span className={`text-xs ${isActive
                        ? "text-zinc-400 dark:text-zinc-500"
                        : "text-zinc-300 dark:text-zinc-600"
                        }`}>
                        {note.content.split(/\s+/).filter(word => word.length > 0).length} words
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgb(161 161 170 / 0.3) transparent;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgb(161 161 170 / 0.3);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgb(161 161 170 / 0.5);
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </div>
  );
}
