export type Note = {
  id: string;
  title: string;
  content: string;
  docType: "txt" | "md" | "formatted";
  lastModified: number;
};
