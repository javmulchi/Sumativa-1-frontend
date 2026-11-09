import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

const initialForm = { name: '', brand: '', category: 'Abarrotes', price: '', stock: '', description: '' };

export default function AddProductPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const { dispatch } = useInventory();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.brand.trim() || !form.category || form.price === '' || form.stock === '') {
      setError('Completa todos los campos obligatorios antes de guardar.');
      return;
    }
    if (Number(form.price) <= 0 || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock))) {
      setError('El precio debe ser mayor que cero y el stock debe ser un número entero igual o superior a cero.');
      return;
    }

    const newProduct = {
      id: `p-${Date.now()}`,
      sku: `SUP-${String(Date.now()).slice(-6)}`,
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim() || 'Sin descripción disponible.'
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate(`/productos/${newProduct.id}`, { state: { created: true } });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link to="/productos" className="back-link">← Volver al inventario</Link>
        <p className="eyebrow mt-5">Administración de productos</p>
        <h1 className="page-title">Agregar artículo</h1>
        <p className="mt-2 text-sm text-slate-500">Registra los datos del nuevo producto para incorporarlo al inventario.</p>
      </div>

      <form className="panel space-y-6 p-5 sm:p-8" onSubmit={handleSubmit}>
        {error ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field-label sm:col-span-2">Nombre del artículo <span className="text-red-500">*</span><input className="input-field mt-2" name="name" value={form.name} onChange={handleChange} placeholder="Ej. Café molido 250 g" maxLength={80} required /></label>
          <label className="field-label">Marca <span className="text-red-500">*</span><input className="input-field mt-2" name="brand" value={form.brand} onChange={handleChange} placeholder="Ej. Nescafé" maxLength={50} required /></label>
          <label className="field-label">Categoría <span className="text-red-500">*</span><select className="input-field mt-2" name="category" value={form.category} onChange={handleChange} required>{PRODUCT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
          <label className="field-label">Precio (CLP) <span className="text-red-500">*</span><input className="input-field mt-2" type="number" name="price" min="1" step="1" value={form.price} onChange={handleChange} placeholder="Ej. 2990" required /></label>
          <label className="field-label">Stock inicial <span className="text-red-500">*</span><input className="input-field mt-2" type="number" name="stock" min="0" step="1" value={form.stock} onChange={handleChange} placeholder="Ej. 20" required /></label>
          <label className="field-label sm:col-span-2">Descripción <span className="font-normal text-slate-400">(opcional)</span><textarea className="input-field mt-2 min-h-28 resize-y" name="description" value={form.description} onChange={handleChange} placeholder="Agrega información adicional del artículo..." maxLength={240} /></label>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Link to="/productos" className="btn-secondary text-center">Cancelar</Link>
          <button type="submit" className="btn-primary">Guardar artículo</button>
        </div>
        <p className="text-xs text-slate-400">Los campos marcados con * son obligatorios. El código del artículo se genera automáticamente.</p>
      </form>
    </div>
  );
}
