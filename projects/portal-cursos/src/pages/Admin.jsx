import { useSearchParams, Navigate } from 'react-router-dom';

export default function Admin() {
  const [searchParams] = useSearchParams();
  const isAuth = searchParams.get('auth') === 'true';
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-secondary rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-accent">¡Bienvenido, admin!</h1>
        <p className="text-lg text-primary">Has accedido correctamente al panel de administración.</p>
      </div>
    </div>
  );
}
