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
    <div className="max-w-xl mx-auto p-4">
      <button className="mb-4 px-4 py-2 bg-accent text-white rounded" onClick={() => navigate(-1)}>
        Volver
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-secondary mb-2">{course.titulo}</h2>
        <p className="text-primary mb-2">Categoría: {course.categoria}</p>
        <p className="text-primary mb-2">Nivel: {course.nivel}</p>
        <p className="text-primary mb-2">Duración: {course.duracion}h</p>
        <p className="text-primary mb-2">Valor: {course.valor}</p>
        <p className="text-secondary mt-4">{course.descripcion}</p>
      </div>
    </div>
  );
}
