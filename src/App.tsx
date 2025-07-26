import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import NoteList from "./components/NoteList";
import Preview from "./components/Preview";
import Toolbar from "./components/Toolbar";
import type { Note } from "./types/note";
import { useLocalStorage } from "./hooks/useLocalStorage";
import FormattedEditor from "./components/FormattedEditor";

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved"
  );

  useEffect(() => {
    if (notes.length > 0 && activeNoteId === null) {
      setActiveNoteId(notes[0].id);
    }
    if (notes.length === 0) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: "Welcome to Notey!",
        content:
          "# Welcome to Notey!\n\nThis is your first note. Feel free to edit it or create a new one.",
        docType: "txt",
        lastModified: Date.now(),
      };
      setNotes([newNote]);
      setActiveNoteId(newNote.id);
    }
  }, [notes, activeNoteId, setNotes]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      docType: "txt",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsSidebarVisible(false);
  };

  const handleDeleteNote = () => {
    if (!activeNoteId) return;
    const updatedNotes = notes.filter((note) => note.id !== activeNoteId);
    setNotes(updatedNotes);
    setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
  };

  const handleSelectNote = (id: string) => {
    setActiveNoteId(id);
    setIsSidebarVisible(false);
  };

  const onNoteChange = (updatedNote: Note) => {
    setSaveStatus("saving");
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setTimeout(() => setSaveStatus("saved"), 1000);
  };

  const onDocTypeChange = (docType: "txt" | "md" | "formatted") => {
    if (!activeNote) return;

    if (docType === "formatted") {
      setIsPreviewVisible(false);
    }

    onNoteChange({ ...activeNote, docType });
  };

  const handleDownload = () => {
    if (!activeNote) return;
    const blob = new Blob([activeNote.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.title}.${activeNote.docType}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 min-h-screen flex flex-col antialiased">
      <Toolbar
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        onDocTypeChange={onDocTypeChange}
        onDownload={handleDownload}
        activeNote={activeNote}
        isPreviewVisible={isPreviewVisible}
        onTogglePreview={() => setIsPreviewVisible(!isPreviewVisible)}
        onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        saveStatus={saveStatus}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200"
            onClick={() => setIsSidebarVisible(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:relative
            fixed left-0 top-0 bottom-0 z-50
            w-80 bg-white dark:bg-zinc-900
            shadow-2xl lg:shadow-none
            border-r border-zinc-200/80 dark:border-zinc-800/80
            transition-all duration-300 ease-out
            pt-16 lg:pt-0
          `}
        >
          <NoteList
            notes={notes}
            onSelectNote={handleSelectNote}
            activeNoteId={activeNoteId}
          />
        </aside>

        {/* Main Content Area */}
        {activeNote ? (
          <div className="flex-1 flex flex-col lg:flex-row min-w-0 bg-white dark:bg-zinc-900">
            {/* Editor Panel */}
            <div
              className={`
                ${isPreviewVisible && activeNote.docType !== "formatted"
                  ? "flex-1"
                  : "flex-1"
                }
                ${isPreviewVisible && activeNote.docType !== "formatted"
                  ? "hidden lg:flex"
                  : "flex"
                }
                flex-col min-h-0
              `}
            >
              {activeNote.docType === "formatted" ? (
                <FormattedEditor note={activeNote} onChange={onNoteChange} />
              ) : (
                <Editor note={activeNote} onChange={onNoteChange} />
              )}
            </div>

            {/* Preview Panel */}
            {isPreviewVisible && activeNote.docType !== "formatted" && (
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 border-l border-zinc-200/60 dark:border-zinc-800/60 min-w-0">
                <Preview content={activeNote.content} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-900">
            <div className="text-center max-w-sm mx-auto px-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-zinc-400 dark:text-zinc-500"
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
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                No note selected
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Choose an existing note from the sidebar or create a new one to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
