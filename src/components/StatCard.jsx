export default function StatCard({ label, value, detail, icon }) {
  return (
    <article className="stat-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-xl" aria-hidden="true">{icon}</span>
      </div>
    </article>
  );
}
