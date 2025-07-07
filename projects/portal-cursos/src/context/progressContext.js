// Context for managing completed courses (progress tracking)
// All code/comments in English, UI text in Spanish
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  // Persist completed courses in localStorage for demo purposes
  const [completedCourses, setCompletedCourses] = useState(() => {
    const stored = localStorage.getItem('completedCourses');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
  }, [completedCourses]);

  const markCourseCompleted = (courseId) => {
    setCompletedCourses((prev) => prev.includes(courseId) ? prev : [...prev, courseId]);
  };

  const unmarkCourseCompleted = (courseId) => {
    setCompletedCourses((prev) => prev.filter(id => id !== courseId));
  };

  return React.createElement(
    ProgressContext.Provider,
    { value: { completedCourses, markCourseCompleted, unmarkCourseCompleted } },
    children
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
