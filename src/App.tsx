import { useEffect, useState } from "react";
import CombinedContainer from "./components/CombinedContainer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* ✅ 해(☀️) → 달(🌙) 아이콘 적용된 다크 모드 버튼 */}
      <button
        className="toggle-dark-mode"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        <div className="toggle-slider"></div>
      </button>

      <CombinedContainer darkMode={darkMode} />
    </div>
  );
}

export default App;
