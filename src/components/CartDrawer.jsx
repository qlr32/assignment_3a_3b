import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem.jsx'

export default function CartDrawer({ isOpen, cart, cartTotal, onClose, onChangeQty, onRemove }) {
  const navigate = useNavigate()

  function handleCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div className={isOpen ? 'overlay show' : 'overlay'} onClick={onClose} />
      <aside className={isOpen ? 'drawer open' : 'drawer'} aria-hidden={!isOpen} aria-label="Shopping cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="link-btn" onClick={onClose}>Close</button>
        </div>
        {cart.length === 0 ? (
          <p className="empty">Your cart is empty. Add a record to get started.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onChangeQty={onChangeQty} onRemove={onRemove} />
            ))}
          </ul>
        )}
        <div className="drawer-foot">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <button className="btn wide" onClick={handleCheckout} disabled={cart.length === 0}>
            Go to the checkout
          </button>
        </div>
      </aside>
    </>
  )
}
