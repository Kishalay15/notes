import type { Note } from "../types/note";

export type FormattedEditorProps = {
  note: Note;
  onChange: (updatedNote: Note) => void;
};
