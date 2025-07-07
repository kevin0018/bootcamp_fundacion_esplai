import { useEffect, useState } from "react";
import { useTranslation } from "../utils/hooks.js";
import { getCourseHistory, clearCourseHistory } from "../utils/history.js";

import { useNavigate } from "react-router-dom";

export default function History() {
  const { translate } = useTranslation();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getCourseHistory());
  }, []);

  const handleClear = () => {
    clearCourseHistory();
    setHistory([]);
  };

  if (!history.length) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-lg bg-primary rounded-xl shadow-lg p-8 border-4 border-secondary flex flex-col gap-8 items-center">
          <h1 className="text-3xl font-extrabold text-secondary text-center mb-4">{translate("history")}</h1>
          <p className="text-secondary text-lg">{translate("noRecentCourses")}</p>
          <button className="px-4 py-2 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity" onClick={() => navigate("/courses")}>{translate("viewCourses")}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-primary rounded-xl shadow-lg p-8 border-4 border-secondary flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-extrabold text-secondary text-center mb-4">{translate("history")}</h1>
        <ul className="w-full flex flex-col gap-2 mb-4">
          {history.map((course) => (
            <li key={course.id} className="flex justify-between items-center bg-secondary rounded-lg px-4 py-2 shadow">
              <span className="text-primary font-semibold">{course.titulo}</span>
              <button
                className="ml-4 px-3 py-1 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {translate("viewAgain")}
              </button>
            </li>
          ))}
        </ul>
        <button className="px-4 py-2 bg-secondary text-primary rounded font-bold hover:opacity-80 transition-opacity border border-accent" onClick={handleClear}>
          {translate("clearHistory")}
        </button>
      </div>
    </section>
  );
}
