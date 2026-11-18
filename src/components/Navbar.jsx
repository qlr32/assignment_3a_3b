import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ cartCount, onToggleCart }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo">VinylVault</Link>
      <nav className="nav-links">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
      <button className="cart-btn" onClick={onToggleCart} aria-label={`Open cart, ${cartCount} items`}>
        Cart
        <span className="badge">{cartCount}</span>
      </button>
    </header>
  )
}
