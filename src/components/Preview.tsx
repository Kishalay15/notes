// import ReactMarkdown from "react-markdown";
// import type { PreviewProps } from "./Preview.types";

// export default function Preview({ content }: PreviewProps) {
//   const markdownClasses = `
//     font-mono prose prose-slate dark:prose-invert max-w-none prose-sm
//     prose-headings:font-semibold prose-headings:tracking-tight
//     prose-h1:text-xl sm:prose-h1:text-2xl
//     prose-h2:text-lg sm:prose-h2:text-xl
//     prose-h3:text-base sm:prose-h3:text-lg
//     prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
//     prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
//     prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
//     prose-code:text-sm prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
//     prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-pre:text-sm prose-pre:overflow-x-auto
//     prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
//     prose-ul:space-y-1 prose-ol:space-y-1
//     prose-li:text-slate-700 dark:prose-li:text-slate-300
//     prose-table:text-sm prose-th:px-2 prose-td:px-2
//   `;

//   return (
//     <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900">
//       <div className="p-3 sm:p-6">
//         <div className="bg-white dark:bg-gray-800 p-4 border-4 border-black min-h-full shadow-inner">
//           <div className={markdownClasses}>
//             <ReactMarkdown>{content}</ReactMarkdown>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

