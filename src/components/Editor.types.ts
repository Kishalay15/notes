import type { Note } from "../types/note";

export interface EditorProps {
  note: Note;
  onChange: (note: Note) => void;
}
