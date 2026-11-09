import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { formatCurrency } from '../components/formatters';
import StockBadge from '../components/StockBadge';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { state, dispatch } = useInventory();
  const product = state.products.find((item) => item.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuantity(1);
    setMessage('');
  }, [productId]);

  if (!product) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-4xl">🔎</p>
        <h1 className="mt-3 text-xl font-bold text-slate-900">Artículo no encontrado</h1>
        <p className="mt-2 text-sm text-slate-500">El producto solicitado no existe en el inventario.</p>
        <Link to="/productos" className="btn-primary mt-5 inline-flex">Volver al inventario</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      setMessage('No hay unidades suficientes para esa cantidad.');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, quantity } });
    setMessage(`${quantity} unidad(es) agregada(s) al carrito. El inventario fue actualizado.`);
    setQuantity(1);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link to="/productos" className="back-link">← Volver al inventario</Link>
      {location.state?.created ? <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">Artículo registrado correctamente.</div> : null}
      <section className="panel overflow-hidden">
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 p-8">
            <span className="text-8xl" aria-hidden="true">🛍️</span>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="category-pill">{product.category}</span>
              <StockBadge stock={product.stock} />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">{product.sku}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{product.name}</h1>
            <p className="mt-2 text-sm text-slate-500">Marca: <strong className="text-slate-700">{product.brand}</strong></p>
            <p className="mt-5 text-3xl font-bold text-brand-700">{formatCurrency(product.price)}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <p className="text-sm font-semibold text-slate-800">Agregar al carrito</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-slate-200">
                  <button type="button" className="quantity-button" aria-label="Disminuir cantidad" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity <= 1}>−</button>
                  <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button type="button" className="quantity-button" aria-label="Aumentar cantidad" onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))} disabled={quantity >= product.stock}>＋</button>
                </div>
                <button type="button" className="btn-primary flex-1 sm:flex-none" onClick={handleAddToCart} disabled={product.stock === 0 || quantity > product.stock}>Agregar al carrito</button>
              </div>
              {message ? <p role="status" className="mt-3 text-sm font-medium text-brand-700">{message}</p> : null}
              {product.stock === 0 ? <p className="mt-3 text-sm text-red-600">Este artículo no tiene unidades disponibles.</p> : <p className="mt-3 text-xs text-slate-400">Unidades disponibles: {product.stock}. Al agregar al carrito, el stock se descuenta inmediatamente.</p>}
              <button type="button" className="mt-4 text-sm font-semibold text-slate-500 hover:text-brand-700" onClick={() => navigate('/carrito')}>Ir al carrito →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
