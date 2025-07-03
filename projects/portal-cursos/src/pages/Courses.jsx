import { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json';
import { getOptimalCourseSelection } from '../utils/courseOptimizer.js';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('categoria') || '';
  const [maxHours, setMaxHours] = useState(20);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const levelDropdownRef = useRef(null);

  // Support filtering by category and level from query params
  const level = searchParams.get('nivel') || '';
  let filteredCourses = coursesData;
  if (category) filteredCourses = filteredCourses.filter(c => c.categoria === category);
  if (level) filteredCourses = filteredCourses.filter(c => c.nivel === level);

  // Only use optimizer if category is set, otherwise show all filtered
  const optimal = category ? getOptimalCourseSelection(filteredCourses, category, maxHours) : filteredCourses;
  const totalHours = optimal.reduce((sum, c) => sum + c.duracion, 0);
  const totalValue = optimal.reduce((sum, c) => sum + c.valor, 0);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-primary rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-secondary">
        <h2 className="text-3xl font-extrabold mb-8 text-secondary text-center drop-shadow">Lista de cursos</h2>
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-center w-full relative">
          <button
            className={`custom-btn-courses rounded-xl bg-accent shadow transition-all duration-150 hover:bg-accent/80 flex font-bold ${!category && !level ? 'text-primary underline underline-offset-4' : 'text-secondary'}`}
            onClick={() => setSearchParams({})}
          >Todos</button>
          <button
            className={`custom-btn-courses rounded-xl bg-accent shadow transition-all duration-150 hover:bg-accent/80 flex font-bold ${category === 'frontend' ? 'text-primary underline underline-offset-4' : 'text-secondary'}`}
            onClick={() => {
              const params = Object.fromEntries(searchParams.entries());
              params.categoria = 'frontend';
              // Remove empty or undefined params to avoid ?categoria=frontend&nivel=
              if (params.nivel === undefined || params.nivel === null || params.nivel === '') delete params.nivel;
              setSearchParams(params);
            }}
          >Frontend</button>
          <button
            className={`custom-btn-courses rounded-xl bg-accent shadow transition-all duration-150 hover:bg-accent/80 flex font-bold ${category === 'backend' ? 'text-primary underline underline-offset-4' : 'text-secondary'}`}
            onClick={() => {
              const params = Object.fromEntries(searchParams.entries());
              params.categoria = 'backend';
              if (params.nivel === undefined || params.nivel === null || params.nivel === '') delete params.nivel;
              setSearchParams(params);
            }}
          >Backend</button>
          <div className="relative" ref={levelDropdownRef}>
            <button
              className={`custom-btn-courses rounded-xl bg-accent text-secondary font-bold shadow transition-all duration-150 hover:bg-accent/80 hover:text-secondary flex items-center gap-2 ${level ? 'underline underline-offset-4' : ''}`}
              onClick={() => setLevelDropdownOpen((open) => !open)}
              type="button"
            >
              Nivel
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {levelDropdownOpen && (
              <div className="absolute left-0 mt-2 w-32 bg-accent border border-secondary rounded shadow-lg z-10">
                <button
                  className={`block w-full text-left px-4 py-2 rounded-t font-bold ${level === 'basico' ? 'text-primary' : 'text-secondary hover:bg-primary/30'}`}
                  onClick={() => { setSearchParams({ ...Object.fromEntries(searchParams.entries()), nivel: 'basico' }); setLevelDropdownOpen(false); }}
                >Básico</button>
                <button
                  className={`block w-full text-left px-4 py-2 font-bold ${level === 'avanzado' ? 'text-primary' : 'text-secondary hover:bg-primary/30'}`}
                  onClick={() => { setSearchParams({ ...Object.fromEntries(searchParams.entries()), nivel: 'avanzado' }); setLevelDropdownOpen(false); }}
                >Avanzado</button>
                <button
                  className={`block w-full text-left px-4 py-2 rounded-b font-bold ${!level ? 'text-primary' : 'text-secondary hover:bg-primary/30'}`}
                  onClick={() => { const params = Object.fromEntries(searchParams.entries()); delete params.nivel; setSearchParams(params); setLevelDropdownOpen(false); }}
                >Todos los niveles</button>
              </div>
            )}
          </div>
          <label className="font-medium ml-4">Horas disponibles:</label>
          <input
            type="number"
            min={1}
            max={40}
            className="border-2 border-secondary rounded px-5 py-2 w-28 focus:outline-accent bg-primary/10"
            value={maxHours}
            onChange={e => setMaxHours(Number(e.target.value))}
          />
        </div>
        <ul className="mb-8 w-full space-y-5">
          {optimal.map(course => (
            <li
              key={course.id}
              className="p-7 border-b-2 border-secondary rounded-lg bg-primary/10 cursor-pointer transition-all duration-200 flex items-center justify-between shadow-sm hover:bg-accent/90 hover:scale-[1.025] hover:shadow-md group"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <span className="font-semibold text-lg text-secondary group-hover:text-secondary transition-colors duration-200">{course.titulo}</span>
              <span className="text-base text-accent pl-6 group-hover:text-secondary transition-colors duration-200">{course.duracion}h, valor: {course.valor}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold text-accent text-lg w-full text-right">
          Total: {totalHours}h, valor: {totalValue}
        </div>
      </div>
      <style jsx="true">{`
            .custom-btn-courses {
            padding-left: 10px;
            padding-right: 10px;
            }
    `}</style>
    </div>
  );
}
