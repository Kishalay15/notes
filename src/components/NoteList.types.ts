import type { Note } from "../types/note";

export interface NoteListProps {
  notes: Note[];
  onSelectNote: (id: string) => void;
  activeNoteId: string | null;
}
