import {
  PlusIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import type { ToolbarProps } from "./Toolbar.types";

export default function Toolbar({
  onNewNote,
  onDeleteNote,
  onDocTypeChange,
  onDownload,
  activeNote,
  isPreviewVisible,
  onTogglePreview,
  saveStatus,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      {/* Left Actions */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onNewNote}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
          title="New Note"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onDeleteNote}
          disabled={!activeNote}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Delete Note"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Center Status */}
      <div className="flex items-center">
        {saveStatus === "saving" && (
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Saving...</span>
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="flex items-center space-x-2 text-sm text-emerald-600 dark:text-emerald-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Saved</span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        <select
          value={activeNote?.docType || "txt"}
          onChange={(e) => onDocTypeChange(e.target.value as "txt" | "md")}
          disabled={!activeNote}
          className="px-3 py-1.5 text-sm font-medium bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="txt">Plain Text (.txt)</option>
          <option value="md">Markdown (.md)</option>
        </select>

        <div className="flex items-center space-x-1">
          <button
            onClick={onDownload}
            disabled={!activeNote}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            title="Download Note"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onTogglePreview}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
            title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
          >
            {isPreviewVisible ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
