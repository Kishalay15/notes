import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import NoteList from "./components/NoteList";
import Preview from "./components/Preview";
import Toolbar from "./components/Toolbar";
import type { Note } from "./types/note";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
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
        docType: "md",
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
      docType: "md",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = () => {
    if (!activeNoteId) return;
    const updatedNotes = notes.filter((note) => note.id !== activeNoteId);
    setNotes(updatedNotes);
    setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
  };

  const onNoteChange = (updatedNote: Note) => {
    setSaveStatus("saving");
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setTimeout(() => setSaveStatus("saved"), 1000);
  };

  const onDocTypeChange = (docType: "txt" | "md") => {
    if (!activeNote) return;
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
    <main className="bg-slate-50 dark:bg-slate-900 h-screen flex flex-col font-inter antialiased">
      <Toolbar
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        onDocTypeChange={onDocTypeChange}
        onDownload={handleDownload}
        activeNote={activeNote}
        isPreviewVisible={isPreviewVisible}
        onTogglePreview={() => setIsPreviewVisible(!isPreviewVisible)}
        saveStatus={saveStatus}
      />
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
          <NoteList
            notes={notes}
            onSelectNote={setActiveNoteId}
            activeNoteId={activeNoteId}
          />
        </div>

        {/* Main Content */}
        {activeNote ? (
          <div className="flex-grow flex min-w-0">
            {/* Editor */}
            <div
              className={`${
                isPreviewVisible ? "flex-1" : "flex-grow"
              } bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700`}
            >
              <Editor note={activeNote} onChange={onNoteChange} />
            </div>

            {/* Preview */}
            {isPreviewVisible && (
              <div className="flex-1 bg-slate-50 dark:bg-slate-900 min-w-0">
                <Preview content={activeNote.content} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-white dark:bg-slate-800">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-slate-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Select a note to start editing
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
