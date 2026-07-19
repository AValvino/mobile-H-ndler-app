import { useState } from 'react';
import { PRODUCTS } from '../data/route';
import { useApp } from '../context/AppContext';

export default function PreorderForm() {
  const { addOrder } = useApp();
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [binding, setBinding] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === productId);
    addOrder({
      productName: product.name,
      quantity,
      unit: product.unit,
      binding,
    });
    setConfirmation(
      binding
        ? `Vorbestellung für ${quantity}× ${product.name} aufgegeben.`
        : `Interesse an ${quantity}× ${product.name} vermerkt.`
    );
    setQuantity(1);
    setTimeout(() => setConfirmation(null), 4000);
  }

  return (
    <form className="preorder-form" onSubmit={handleSubmit}>
      <h3>Vorbestellen</h3>

      <label className="field">
        <span>Produkt</span>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Menge</span>
        <input
          type="number"
          min="1"
          max="20"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
      </label>

      <div className="binding-toggle">
        <span>Unverbindliches Interesse</span>
        <button
          type="button"
          role="switch"
          aria-checked={binding}
          className={`switch ${binding ? 'switch--on' : ''}`}
          onClick={() => setBinding((b) => !b)}
        >
          <span className="switch__knob" />
        </button>
        <span>Verbindliche Vorbestellung</span>
      </div>

      <button type="submit" className="btn btn--primary">
        {binding ? 'Verbindlich vorbestellen' : 'Interesse bekunden'}
      </button>

      {confirmation && <p className="form-confirmation">{confirmation}</p>}
    </form>
  );
}
