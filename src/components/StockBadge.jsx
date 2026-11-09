export default function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge badge-danger">Sin stock</span>;
  if (stock <= 5) return <span className="badge badge-warning">Stock bajo: {stock}</span>;
  return <span className="badge badge-success">Disponible: {stock}</span>;
}
