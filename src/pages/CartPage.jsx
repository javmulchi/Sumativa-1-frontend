import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { formatCurrency } from '../components/formatters';
import EmptyState from '../components/EmptyState';

export default function CartPage() {
  const { state, dispatch } = useInventory();
  const cartItems = state.cart.map((cartItem) => ({
    ...cartItem,
    product: state.products.find((product) => product.id === cartItem.productId)
  })).filter((item) => item.product);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <section>
        <p className="eyebrow">Selección de artículos</p>
        <h1 className="page-title">Carrito de compras</h1>
        <p className="mt-2 text-sm text-slate-500">Ajusta las cantidades. Cada cambio actualiza automáticamente el inventario.</p>
      </section>

      {cartItems.length === 0 ? (
        <div className="panel">
          <EmptyState icon="🛒" title="Tu carrito está vacío" description="Agrega artículos desde el inventario. Las unidades seleccionadas se descontarán del stock disponible.">
            <Link to="/productos" className="btn-primary inline-flex">Explorar inventario</Link>
          </EmptyState>
        </div>
      ) : (
        <div className="grid items-start gap-6 xl:grid-cols-[1fr_320px]">
          <section className="panel overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="section-title">Artículos seleccionados</h2>
              <p className="mt-1 text-xs text-slate-500">{totalUnits} unidad(es) en {cartItems.length} producto(s).</p>
            </div>
            <div className="divide-y divide-slate-100">
              {cartItems.map(({ product, quantity }) => (
                <article key={product.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="min-w-0 flex-1">
                    <Link to={`/productos/${product.id}`} className="font-semibold text-slate-800 hover:text-brand-700">{product.name}</Link>
                    <p className="mt-1 text-xs text-slate-500">{product.brand} · {product.category}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">{formatCurrency(product.price)} <span className="font-normal text-slate-400">por unidad</span></p>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="flex items-center rounded-xl border border-slate-200">
                      <button type="button" className="quantity-button" aria-label={`Disminuir ${product.name}`} onClick={() => dispatch({ type: 'DECREASE_CART_ITEM', payload: { productId: product.id } })}>−</button>
                      <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                      <button type="button" className="quantity-button" aria-label={`Aumentar ${product.name}`} onClick={() => dispatch({ type: 'INCREASE_CART_ITEM', payload: { productId: product.id } })} disabled={product.stock === 0}>＋</button>
                    </div>
                    <div className="min-w-24 text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(product.price * quantity)}</p>
                      <button type="button" className="mt-1 text-xs font-medium text-red-500 hover:text-red-700" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: product.id } })}>Quitar</button>
                    </div>
                  </div>
                  {product.stock === 0 ? <p className="text-xs text-amber-700">No quedan unidades adicionales en inventario.</p> : null}
                </article>
              ))}
            </div>
            <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
              <Link to="/productos" className="text-sm font-semibold text-brand-700 hover:text-brand-900">＋ Seguir agregando artículos</Link>
            </div>
          </section>

          <aside className="panel p-5 sm:p-6">
            <h2 className="section-title">Resumen del carrito</h2>
            <div className="mt-5 flex justify-between text-sm text-slate-500"><span>Productos</span><span>{cartItems.length}</span></div>
            <div className="mt-2 flex justify-between text-sm text-slate-500"><span>Unidades</span><span>{totalUnits}</span></div>
            <div className="my-5 border-t border-slate-100" />
            <div className="flex items-end justify-between gap-3"><span className="text-sm font-semibold text-slate-700">Total</span><span className="text-2xl font-bold text-brand-700">{formatCurrency(total)}</span></div>
            <p className="mt-4 rounded-xl bg-brand-50 p-3 text-xs leading-5 text-brand-800">El stock ya fue actualizado al agregar o modificar las cantidades. Al quitar un producto, sus unidades regresan al inventario.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
