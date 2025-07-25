import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Optional: change theme if desired
import type { PreviewProps } from "./Preview.types";

export default function Preview({ content }: PreviewProps) {

  const processedContent = content.replace(/^--"+?$/gm, "<hr />");

  const markdownClasses = `
    font-mono prose prose-slate dark:prose-invert max-w-none prose-sm
    prose-headings:font-semibold prose-headings:tracking-tight
    prose-h1:text-xl sm:prose-h1:text-2xl
    prose-h2:text-lg sm:prose-h2:text-xl
    prose-h3:text-base sm:prose-h3:text-lg
    prose-p:leading-relaxed prose-a:no-underline hover:prose-a:underline
    prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
    prose-pre:overflow-x-auto
  `;

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="p-3 sm:p-6">
        <div className="bg-white dark:bg-gray-800 p-4 border-4 border-black min-h-full shadow-inner ">
          <div className={markdownClasses}>
            <ReactMarkdown
              children={processedContent}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

