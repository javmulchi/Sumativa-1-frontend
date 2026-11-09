import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="panel mx-auto max-w-xl p-10 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-3 text-xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-sm text-slate-500">La dirección ingresada no corresponde a una sección disponible.</p>
      <Link to="/dashboard" className="btn-primary mt-6 inline-flex">Ir al inicio</Link>
    </div>
  );
}
