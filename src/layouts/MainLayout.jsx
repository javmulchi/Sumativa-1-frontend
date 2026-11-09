import { NavLink, Outlet } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

const navigation = [
  { to: '/dashboard', label: 'Resumen', icon: '▦' },
  { to: '/productos', label: 'Inventario', icon: '▤', end: true },
  { to: '/productos/nuevo', label: 'Agregar artículo', icon: '+' },
  { to: '/carrito', label: 'Carrito', icon: '🛒', cart: true }
];

export default function MainLayout() {
  const { state } = useInventory();
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <NavLink to="/dashboard" className="flex items-center gap-3 no-underline">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-2xl text-white" aria-hidden="true">⌂</span>
            <span>
              <span className="block text-lg font-bold tracking-tight text-slate-900">Mercado Central</span>
              <span className="block text-xs font-medium text-slate-500">Gestión de inventario</span>
            </span>
          </NavLink>

          <nav className="flex flex-wrap items-center gap-1" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end || item.to === '/dashboard'}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
                {item.cart && cartCount > 0 ? <span className="ml-1 rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">{cartCount}</span> : null}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>Mercado Central · Sistema de gestión de inventario</span>
          <span>Desarrollo Frontend II · PFY2202</span>
        </div>
      </footer>
    </div>
  );
}
