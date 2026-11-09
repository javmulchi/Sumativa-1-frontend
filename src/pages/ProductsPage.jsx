import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';
import { formatCurrency } from '../components/formatters';
import StockBadge from '../components/StockBadge';
import EmptyState from '../components/EmptyState';

export default function ProductsPage() {
  const { state } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [search, setSearch] = useState('');

  // Se deriva una lista filtrada; state.products permanece intacto.
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es');
    return state.products.filter((product) => {
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      const matchesSearch = !normalizedSearch || [product.name, product.brand, product.sku]
        .some((value) => value.toLocaleLowerCase('es').includes(normalizedSearch));
      return matchesCategory && matchesSearch;
    });
  }, [state.products, selectedCategory, search]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Productos disponibles</p>
          <h1 className="page-title">Inventario</h1>
          <p className="mt-2 text-sm text-slate-500">Filtra, busca y consulta el detalle de cada artículo.</p>
        </div>
        <Link to="/productos/nuevo" className="btn-primary">＋ Agregar artículo</Link>
      </section>

      <section className="panel p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_250px_auto] md:items-end">
          <label className="field-label">
            Buscar artículo
            <input className="input-field mt-2" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, marca o código..." />
          </label>
          <label className="field-label">
            Filtrar por categoría
            <select className="input-field mt-2" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              <option value="Todas">Todas las categorías</option>
              {PRODUCT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <button type="button" className="btn-secondary" onClick={() => { setSearch(''); setSelectedCategory('Todas'); }}>Limpiar filtros</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">Mostrando <strong className="text-slate-800">{filteredProducts.length}</strong> de {state.products.length} artículos</p>
          <p className="text-xs text-slate-400">Selecciona un artículo para ver su detalle.</p>
        </div>
      </section>

      <section className="panel overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table min-w-[760px]">
              <thead><tr><th>Artículo</th><th>Código</th><th>Marca</th><th>Categoría</th><th>Precio</th><th>Stock</th><th><span className="sr-only">Acción</span></th></tr></thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td><Link to={`/productos/${product.id}`} className="font-semibold text-slate-800 hover:text-brand-700">{product.name}</Link></td>
                    <td className="font-mono text-xs text-slate-500">{product.sku}</td>
                    <td>{product.brand}</td>
                    <td><span className="category-pill">{product.category}</span></td>
                    <td className="font-semibold text-slate-800">{formatCurrency(product.price)}</td>
                    <td><StockBadge stock={product.stock} /></td>
                    <td><Link to={`/productos/${product.id}`} className="text-sm font-semibold text-brand-700 hover:text-brand-900">Ver →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon="⌕" title="No se encontraron artículos" description="Prueba con otro nombre, marca o categoría. El inventario original se mantiene sin cambios.">
            <button type="button" className="btn-secondary" onClick={() => { setSearch(''); setSelectedCategory('Todas'); }}>Restablecer búsqueda</button>
          </EmptyState>
        )}
      </section>
    </div>
  );
}
