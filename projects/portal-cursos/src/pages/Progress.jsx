import { useProgress } from '../context/progressContext.js';
import coursesData from '../data/courses.json';

const Progress = () => {
  const { completedCourses } = useProgress();
  // Get all courses
  const allCourses = coursesData;
  const totalCourses = allCourses.length;
  // Get completed course objects
  const completedCourseObjs = allCourses.filter(c => completedCourses.includes(c.id) || completedCourses.includes(String(c.id)));

  // Calculate progress by category
  const categories = Array.from(new Set(allCourses.map(c => c.categoria)));
  const progressByCategory = categories.map(cat => {
    const catCourses = allCourses.filter(c => c.categoria === cat);
    const completedInCat = catCourses.filter(c => completedCourses.includes(c.id) || completedCourses.includes(String(c.id)));
    const progress = catCourses.length > 0 ? Math.round((completedInCat.length / catCourses.length) * 100) : 0;
    return { name: cat, progress };
  });

  const totalProgress = totalCourses > 0 ? Math.round((completedCourseObjs.length / totalCourses) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center py-8 px-2 sm:px-4 progress-container">
      <div className="w-full max-w-2xl bg-primary rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-black">
        <h1 className="text-3xl font-bold mb-4 text-center">Progreso</h1>
        <div className="mb-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Porcentaje total de progreso</h2>
          <div className="w-full bg-secondary rounded-full h-6 mb-2 border-2 border-accent">
            <div
              className="bg-accent h-6 rounded-full text-secondary flex items-center justify-center text-sm font-bold transition-all"
              style={{ width: `${totalProgress}%` }}
            >
              {totalProgress}%
            </div>
          </div>
        </div>
        <div className="mb-6 w-full">
          <h2 className="text-xl font-semibold mb-2">Lista de cursos completados</h2>
          {completedCourseObjs.length === 0 ? (
            <p>No has completado ningún curso todavía.</p>
          ) : (
            <ul className="pl-0">
              {completedCourseObjs.map((course) => (
                <li key={course.id} style={{ listStyle: 'none', marginLeft: 0 }}>{course.titulo}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Progreso por categoría o nivel</h2>
          {progressByCategory.length === 0 ? (
            <p>No hay datos de progreso por categoría.</p>
          ) : (
            <ul style={{ paddingLeft: 0 }}>
              {progressByCategory.map((cat) => (
                <li key={cat.name} className="flex items-center mb-5" style={{ listStyle: 'none', marginLeft: 0 }}>
                  <span className="font-bold min-w-[110px]">{cat.name}:</span>
                  <div className="bg-secondary rounded-full h-4 inline-block align-middle ml-2 border border-accent flex-1 max-w-[200px]" style={{ padding: '2px 0' }}>
                    <div
                      className="bg-accent h-4 rounded-full transition-all"
                      style={{ width: `${cat.progress}%` }}
                    />
                  </div>
                  <span className="ml-2">{cat.progress}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style jsx="true">{`
        .progress-container {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Progress;
