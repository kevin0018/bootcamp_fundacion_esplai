
export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-secondary">¡Bienvenido, admin!</h1>
        <p className="text-lg text-primary">Has accedido correctamente al panel de administración.</p>
      </div>
    </div>
  );
}
