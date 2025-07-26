import type { ToolbarProps } from "./Toolbar.types";
import ThemeToggle from "./ThemeToggle";

export default function Toolbar({
  onNewNote,
  onDeleteNote,
  onDocTypeChange,
  onDownload,
  activeNote,
  isPreviewVisible,
  onTogglePreview,
  onToggleSidebar,
  saveStatus,
}: ToolbarProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
      {/* Left - Menu & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200"
          title="Toggle Sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-zinc-100 dark:text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 18.75h-7.5A1.125 1.125 0 0 1 5.625 20.25v-16.5A1.125 1.125 0 0 1 6.75 2.625h7.5A1.125 1.125 0 0 1 15.375 3.75v16.5a1.125 1.125 0 0 1-1.125 1.125Z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hidden sm:block">
            Notey
          </h1>
        </div>
      </div>

      {/* Center - Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewNote}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all duration-200"
          title="New Note"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Save Status */}
        <div className="flex items-center gap-2 px-2">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Saving...</span>
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="hidden sm:inline">Saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Right - Settings & Actions */}
      <div className="flex items-center gap-2">
        {/* Document Type Selector */}
        <div className="relative">
          <select
            value={activeNote?.docType || "txt"}
            onChange={(e) => onDocTypeChange(e.target.value as "txt" | "md" | "formatted")}
            disabled={!activeNote}
            className="appearance-none bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded border-none focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer pr-6"
          >
            <option value="txt">TXT</option>
            <option value="md">MD</option>
            <option value="formatted">RICH</option>
          </select>
          <svg className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Preview Toggle */}
        {activeNote?.docType !== "formatted" && (
          <button
            onClick={onTogglePreview}
            className={`p-1.5 rounded-lg transition-all duration-200 ${isPreviewVisible
                ? "text-zinc-700 bg-zinc-100 dark:text-zinc-200 dark:bg-zinc-800"
                : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              {isPreviewVisible ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              )}
            </svg>
          </button>
        )}

        {/* Download Button */}
        <button
          onClick={onDownload}
          disabled={!activeNote}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          title="Download Note"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={onDeleteNote}
          disabled={!activeNote}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:text-zinc-500 dark:hover:text-red-400 dark:hover:bg-red-950/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          title="Delete Note"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>

        {/* Theme Toggle */}
        <div className="ml-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
