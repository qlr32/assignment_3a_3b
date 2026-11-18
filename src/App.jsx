import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import AlbumDetailPage from './pages/AlbumDetailPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

export default function App() {
  // Lifted state shared by Navbar, CartDrawer, catalog, detail and checkout
  const [cart, setCart] = useState([]) // [{ id, title, artist, price, qty }]
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function handleAddToCart(album) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === album.id)
      if (existing) {
        return prev.map((item) =>
          item.id === album.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [
        ...prev,
        { id: album.id, title: album.title, artist: album.artist, price: album.price, qty: 1 },
      ]
    })
    setIsCartOpen(true)
  }

  function handleChangeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function handleClearCart() {
    setCart([])
  }

  function handleToggleCart() {
    setIsCartOpen((open) => !open)
  }

  function handleCloseCart() {
    setIsCartOpen(false)
  }

  return (
    <>
      <Navbar cartCount={cartCount} onToggleCart={handleToggleCart} />
      <main className="page">
        <Routes>
          <Route path="/" element={<CatalogPage onAddToCart={handleAddToCart} />} />
          <Route path="/album/:albumId" element={<AlbumDetailPage onAddToCart={handleAddToCart} />} />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} cartTotal={cartTotal} onClearCart={handleClearCart} />}
          />
          <Route path="*" element={<p className="empty">That page doesn't exist.</p>} />
        </Routes>
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        onClose={handleCloseCart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
      />
    </>
  )
}
