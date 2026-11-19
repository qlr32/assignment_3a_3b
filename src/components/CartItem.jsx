export default function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <strong>{item.title}</strong>
        <span className="artist">{item.artist}</span>
        <span>${item.price.toFixed(2)} each</span>
      </div>
      <div className="qty">
        <button onClick={() => onChangeQty(item.id, -1)} aria-label={`Decrease ${item.title}`}>−</button>
        <span>{item.qty}</span>
        <button onClick={() => onChangeQty(item.id, 1)} aria-label={`Increase ${item.title}`}>+</button>
      </div>
      <div className="line-total">${(item.price * item.qty).toFixed(2)}</div>
      <button className="link-btn" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}
