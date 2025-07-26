import { useEffect, useState } from "react";

export default function ThemeToggle() {
    // For Claude.ai artifacts, we'll use React state instead of localStorage
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // In a real app, you'd use localStorage here
        // For artifacts, we'll default to system preference or light mode
        if (typeof window !== "undefined") {
            return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            // In a real app: localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            // In a real app: localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="group relative p-2 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${darkMode
                            ? "opacity-0 rotate-90 scale-75"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>

                {/* Moon Icon */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${darkMode
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-75"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {darkMode ? "Light mode" : "Dark mode"}
                <div className="absolute bottom-full right-2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-zinc-900 dark:border-b-zinc-100"></div>
            </div>
        </button>
    );
}
