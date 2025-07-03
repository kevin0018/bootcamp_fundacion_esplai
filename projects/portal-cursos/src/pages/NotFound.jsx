export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
        <span className="material-icons text-accent text-5xl">error_outline</span>
        <h1 className="text-3xl font-bold text-secondary">Página no encontrada</h1>
        <p className="text-lg text-primary">La página que buscas no existe.</p>
      </div>
    </div>
  );
}
