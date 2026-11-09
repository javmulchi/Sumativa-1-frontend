import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import StatCard from '../components/StatCard';
import StockBadge from '../components/StockBadge';
import { formatCurrency } from '../components/formatters';

export default function DashboardPage() {
  const { state } = useInventory();
  const totalUnits = state.products.reduce((total, product) => total + product.stock, 0);
  const lowStock = state.products.filter((product) => product.stock <= 5).length;
  const categories = new Set(state.products.map((product) => product.category)).size;
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const recentProducts = [...state.products].slice(-5).reverse();

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Panel principal</p>
          <h1 className="page-title">Resumen del supermercado</h1>
          <p className="mt-2 text-sm text-slate-500">Consulta el estado general del inventario y administra tus artículos.</p>
        </div>
        <Link to="/productos/nuevo" className="btn-primary">＋ Agregar artículo</Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Artículos registrados" value={state.products.length} detail="Productos diferentes" icon="▤" />
        <StatCard label="Unidades disponibles" value={totalUnits} detail="Suma del stock actual" icon="📦" />
        <StatCard label="Categorías" value={categories} detail="Tipos de productos" icon="▦" />
        <StatCard label="En el carrito" value={cartCount} detail={`${lowStock} productos con stock bajo`} icon="🛒" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div>
              <h2 className="section-title">Artículos recientes</h2>
              <p className="mt-1 text-xs text-slate-500">Últimos productos incorporados al inventario.</p>
            </div>
            <Link to="/productos" className="text-sm font-semibold text-brand-700 hover:text-brand-900">Ver inventario →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentProducts.map((product) => (
              <Link key={product.id} to={`/productos/${product.id}`} className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{product.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{product.brand} · {product.category}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-800">{formatCurrency(product.price)}</p>
                  <div className="mt-1"><StockBadge stock={product.stock} /></div>
                </div>
              </Link>
            ))}
            {recentProducts.length === 0 ? <p className="px-6 py-8 text-sm text-slate-500">Todavía no hay artículos registrados.</p> : null}
          </div>
        </div>

        <aside className="panel p-5 sm:p-6">
          <p className="eyebrow">Accesos rápidos</p>
          <h2 className="section-title mt-1">Administración</h2>
          <div className="mt-5 space-y-3">
            <Link to="/productos" className="quick-link"><span className="quick-link-icon">▤</span><span><strong>Revisar inventario</strong><small>Consultar stock y categorías</small></span><span className="ml-auto">→</span></Link>
            <Link to="/productos/nuevo" className="quick-link"><span className="quick-link-icon">＋</span><span><strong>Ingresar artículo</strong><small>Registrar un nuevo producto</small></span><span className="ml-auto">→</span></Link>
            <Link to="/carrito" className="quick-link"><span className="quick-link-icon">🛒</span><span><strong>Ver carrito</strong><small>Modificar cantidades seleccionadas</small></span><span className="ml-auto">→</span></Link>
          </div>
          <div className="mt-6 rounded-2xl bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Control de stock</p>
            <p className="mt-1 text-xs leading-5 text-amber-800">Los productos con cinco unidades o menos se identifican como stock bajo para facilitar su revisión.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
