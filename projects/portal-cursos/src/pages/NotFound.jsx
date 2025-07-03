import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-primary">
      <div className="bg-secondary rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 error-container">
        <h1 className="text-3xl font-bold text-primary">Página no encontrada</h1>
        <p className="text-lg text-primary">La página que buscas no existe.</p>
        <button className="mt-4 px-4 py-2 bg-accent text-secondary font-semibold rounded hover:bg-accent/80 transition-all" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <style jsx="true">
        {`
          .error-container {
              padding: 10px;
          }
          button {
              padding: 0 10px;
          }
        `}
      </style>
    </div>
  );
}
