import type { Note } from "../types/note";

export interface ToolbarProps {
  onNewNote: () => void;
  onDeleteNote: () => void;
  onDocTypeChange: (docType: "txt" | "md" | "formatted") => void;
  onDownload: () => void;
  activeNote: Note | undefined;
  isPreviewVisible: boolean;
  onTogglePreview: () => void;
  saveStatus: "saving" | "saved" | "unsaved";
  onToggleSidebar: () => void;
}
