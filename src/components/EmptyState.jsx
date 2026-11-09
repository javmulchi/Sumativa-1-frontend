export default function EmptyState({ icon = '📦', title, description, children }) {
  return (
    <div className="empty-state">
      <span className="text-4xl" aria-hidden="true">{icon}</span>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
