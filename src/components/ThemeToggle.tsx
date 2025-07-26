import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ||
                (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`inline-flex items-center justify-center px-3 py-1 border-2 border-black font-mono font-bold text-xs transition-colors duration-150 shadow-md
    ${darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-white hover:bg-gray-100 text-black"
                }`}
            title="Toggle Dark Mode"
        >
            {darkMode ? "DARK" : "LIGHT"}
        </button>
    );
}
