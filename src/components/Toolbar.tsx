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
    <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-gray-800 border-b-4 border-black shadow-lg">
      {/* Left Actions */}
      <div className="flex items-center space-x-2">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden inline-flex items-center justify-center w-10 h-8 bg-gray-200 hover:bg-white text-black border-2 border-black font-mono font-bold text-sm transition-colors duration-150"
          title="Toggle Sidebar"
        >
          ≡
        </button>

        <button
          onClick={onNewNote}
          className="inline-flex items-center justify-center px-3 py-1 bg-white hover:bg-gray-100 text-black border-2 border-black font-mono font-bold text-xs transition-colors duration-150 shadow-md"
          title="New Note"
        >
          NEW
        </button>
        <button
          onClick={onDeleteNote}
          disabled={!activeNote}
          className="inline-flex items-center justify-center px-3 py-1 bg-gray-300 hover:bg-gray-200 disabled:bg-gray-500 disabled:text-gray-700 text-black border-2 border-black disabled:border-gray-600 font-mono font-bold text-xs transition-colors duration-150 shadow-md disabled:cursor-not-allowed"
          title="Delete Note"
        >
          DEL
        </button>
      </div>

      {/* Center Status & Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-mono font-black text-xl sm:text-2xl text-white tracking-wider drop-shadow-lg">
          NOTEY
        </h1>

        {saveStatus === "saving" && (
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="hidden sm:inline font-mono font-bold">SAVING...</span>
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="hidden sm:inline font-mono font-bold">SAVED</span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        <select
          value={activeNote?.docType || "txt"}
          onChange={(e) => onDocTypeChange(e.target.value as "txt" | "md" | "formatted")}
          disabled={!activeNote}
          className="px-2 sm:px-3 py-1 text-xs font-mono font-bold bg-gray-200 text-black border-2 border-black focus:outline-none focus:bg-white disabled:bg-gray-500 disabled:text-gray-700 disabled:border-gray-600 disabled:cursor-not-allowed"
        >
          <option value="txt">TXT</option>
          <option value="md">MD</option>
          <option value="formatted">FORM</option>
        </select>

        <button
          onClick={onDownload}
          disabled={!activeNote}
          className="inline-flex items-center justify-center px-3 py-1 bg-gray-400 hover:bg-gray-300 disabled:bg-gray-500 disabled:text-gray-700 text-black border-2 border-black disabled:border-gray-600 font-mono font-bold text-xs transition-colors duration-150 shadow-md disabled:cursor-not-allowed"
          title="Download Note"
        >
          SAVE
        </button>
        {activeNote?.docType !== "formatted" && (
          <button
            onClick={onTogglePreview}
            className={`inline-flex items-center justify-center px-3 py-1 border-2 border-black font-mono font-bold text-xs transition-colors duration-150 shadow-md ${isPreviewVisible
              ? "bg-white hover:bg-gray-100 text-black"
              : "bg-gray-600 hover:bg-gray-500 text-white"
              }`}
            title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
          >
            {isPreviewVisible ? "HIDE" : "SHOW"}
          </button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
