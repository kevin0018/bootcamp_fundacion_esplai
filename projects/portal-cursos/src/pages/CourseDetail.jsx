import coursesData from '../data/courses.json';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => String(c.id) === String(id));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
          <span className="material-icons text-accent text-5xl">error_outline</span>
          <h1 className="text-2xl font-bold text-secondary">Curso no encontrado</h1>
          <button className="mt-4 px-4 py-2 bg-accent text-white rounded" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-primary rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-secondary">
        <button className="mb-6 px-6 py-2 bg-accent text-secondary font-bold rounded-xl shadow hover:bg-accent/80 transition-all self-start" onClick={() => navigate(-1)}>
          Volver
        </button>
        <div className="w-full bg-primary rounded-xl shadow p-8 flex flex-col items-start">
          <h2 className="text-3xl font-extrabold text-secondary mb-4 drop-shadow">{course.titulo}</h2>
          <p className="text-secondary mb-2 font-semibold">Categoría: <span className="text-accent font-semibold">{course.categoria}</span></p>
          <p className="text-secondary mb-2 font-semibold">Nivel: <span className="text-accent font-semibold">{course.nivel}</span></p>
          <p className="text-secondary mb-2 font-semibold">Duración: <span className="text-accent font-semibold">{course.duracion}h</span></p>
          <p className="text-secondary mb-2 font-semibold">Valor: <span className="text-accent font-semibold">{course.valor}</span></p>
          <p className="text-secondary mt-6 font-semibold">{course.descripcion}</p>
        </div>
      </div>
      <style jsx="true">
        {`
          button {
            padding: 0 10px;
        `}
      </style>
    </div>
  );
}
