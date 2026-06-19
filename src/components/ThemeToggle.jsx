import { useTheme } from "../contexts/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;