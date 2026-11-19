import { useState } from 'react'
import { Link } from 'react-router-dom'

const EMPTY_FORM = { fullName: '', address: '', city: '', postalCode: '', cardNumber: '' }

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.'
  if (!form.address.trim()) errors.address = 'Enter your street address.'
  if (!form.city.trim()) errors.city = 'Enter your city.'
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.postalCode.trim())) errors.postalCode = 'Enter a valid postal code.'
  if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Card number must be 16 digits.'
  return errors
}

export default function CheckoutPage({ cart, cartTotal, onClearCart }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null) // { name, total, count } or null

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setConfirmation({
      name: form.fullName.trim(),
      total: cartTotal,
      count: cart.reduce((sum, item) => sum + item.qty, 0),
    })
    onClearCart()
    setForm(EMPTY_FORM)
  }

  if (confirmation) {
    return (
      <section className="confirmation">
        <h1>Order confirmed</h1>
        <p>
          Thanks, {confirmation.name}. Your {confirmation.count} record{confirmation.count === 1 ? '' : 's'} (${confirmation.total.toFixed(2)}) will ship soon.
        </p>
        <Link to="/" className="btn">Keep browsing</Link>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="empty">
        <p>Your cart is empty, so there's nothing to check out.</p>
        <Link to="/">Browse the shop</Link>
      </div>
    )
  }

  const fields = [
    ['fullName', 'Full name'],
    ['address', 'Address'],
    ['city', 'City'],
    ['postalCode', 'Postal code'],
    ['cardNumber', 'Card number'],
  ]

  return (
    <section className="checkout">
      <div className="order-summary">
        <h1>Review your order</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.title} &times; {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="subtotal"><span>Total</span><strong>${cartTotal.toFixed(2)}</strong></p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <h2>Shipping and payment</h2>
        {fields.map(([name, label]) => (
          <label key={name}>
            {label}
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              aria-invalid={Boolean(errors[name])}
              inputMode={name === 'cardNumber' ? 'numeric' : undefined}
            />
            {errors[name] && <span className="error">{errors[name]}</span>}
          </label>
        ))}
        <button type="submit" className="btn wide">Place order</button>
      </form>
    </section>
  )
}
