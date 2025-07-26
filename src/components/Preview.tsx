// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css";
// import type { PreviewProps } from "./Preview.types";

// export default function Preview({ content }: PreviewProps) {
//   const processedContent = content.replace(/^--"+?$/gm, "<hr />");

//   const markdownClasses = `
//     prose prose-gray dark:prose-invert max-w-none prose-sm
//     prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-white
//     prose-h1:text-xl prose-h1:mb-4
//     prose-h2:text-lg prose-h2:mb-3
//     prose-h3:text-base prose-h3:mb-2
//     prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-3
//     prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
//     prose-code:text-sm prose-code:px-1 prose-code:py-0.5 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:font-mono
//     prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-md
//     prose-blockquote:border-l-2 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic
//     prose-ul:mb-3 prose-ol:mb-3 prose-li:mb-1
//     prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-6
//   `;

//   return (
//     <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
//       <div className="p-6">
//         <div className={markdownClasses}>
//           <ReactMarkdown
//             children={processedContent}
//             remarkPlugins={[remarkGfm]}
//             rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
//           />
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
import "highlight.js/styles/github.css";
import type { PreviewProps } from "./Preview.types";

export default function Preview({ content }: PreviewProps) {
  const processedContent = content.replace(/^--"+?$/gm, "<hr />");

  const markdownClasses = `
    prose prose-zinc dark:prose-invert max-w-none prose-base
    prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-headings:tracking-tight
    prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-0
    prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-8
    prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6
    prose-h4:text-base prose-h4:mb-2 prose-h4:mt-4
    prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-7 prose-p:mb-4
    prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-zinc-400 dark:prose-a:decoration-zinc-500 hover:prose-a:decoration-zinc-600 dark:hover:prose-a:decoration-zinc-400 prose-a:transition-colors
    prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-semibold
    prose-em:text-zinc-800 dark:prose-em:text-zinc-200
    prose-code:text-sm prose-code:px-2 prose-code:py-1 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:text-zinc-900 dark:prose-code:text-zinc-100 prose-code:rounded-md prose-code:font-mono prose-code:font-medium
    prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:shadow-sm
    prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-sm
    prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 prose-blockquote:bg-zinc-50/50 dark:prose-blockquote:bg-zinc-800/30 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
    prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-2 prose-li:text-zinc-700 dark:prose-li:text-zinc-300
    prose-ul:prose-li:marker:text-zinc-400 dark:prose-ul:prose-li:marker:text-zinc-500
    prose-ol:prose-li:marker:text-zinc-500 dark:prose-ol:prose-li:marker:text-zinc-400 prose-ol:prose-li:marker:font-medium
    prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 prose-hr:my-8
    prose-table:text-sm prose-table:border-collapse
    prose-th:border prose-th:border-zinc-300 dark:prose-th:border-zinc-700 prose-th:bg-zinc-50 dark:prose-th:bg-zinc-800 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-zinc-900 dark:prose-th:text-zinc-100
    prose-td:border prose-td:border-zinc-300 dark:prose-td:border-zinc-700 prose-td:px-4 prose-td:py-2 prose-td:text-zinc-700 dark:prose-td:text-zinc-300
    prose-img:rounded-lg prose-img:shadow-sm prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
  `;

  return (
    <div className="h-full overflow-y-auto bg-zinc-50 dark:bg-zinc-950 custom-scrollbar">
      <div className="px-8 py-8 max-w-4xl mx-auto">
        {content.trim() ? (
          <div className={markdownClasses}>
            <ReactMarkdown
              children={processedContent}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-zinc-400 dark:text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Preview appears here
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Start typing in the editor to see your content
              </p>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgb(161 161 170 / 0.3) transparent;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgb(161 161 170 / 0.3);
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgb(161 161 170 / 0.5);
          }
        `
      }} />
    </div>
  );
}
