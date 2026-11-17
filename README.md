# VinylVault: Indie Record Online Store

---

## 1. Project Setup Instructions

### Prerequisites
- **Node.js 21 or higher**
- **npm**
- Git
- A web browser

### Installation
```bash
# 1. Clone the repository
git clone <YOUR-PUBLIC-GITHUB-REPO-URL>
cd <repo-folder-name>

# 2. Install dependencies
npm install
```

### Run the development server
```bash
npm run dev
```
Vite prints the local address, `http://localhost:5173/`. Open it in a browser
1. The VinylVault header and the album grid appear.
2. Clicking a genre chip filters the grid.
3. Clicking an album opens `/album/<id>` without a page reload.
4. "Add to cart" opens the cart drawer and updates the header badge.

Stop the server with `Ctrl + C`. To check a production build, run `npm run build` and then `npm run preview`.

### Directory structure overview
`src/` holds all of application code: `components/` contains reusable UI pieces (navbar, cart drawer, album cards), `pages/` contains the three routed views (catalog, album detail, checkout), and `data/albums.js` is the provided dataset. `App.jsx` owns the shared cart state and defines the routes, `main.jsx` mounts the app inside `BrowserRouter`, and `styles.css` holds all styling. Configuration files (`index.html`, `vite.config.js`, `package.json`) live in the project root.

---

## 2. React Component Hierarchy & State Flow Architecture

### Component Tree

Legend: **State** = `useState` owned by that component. **Props** = values received from the parent. **Callbacks** = functions passed down, with the event they handle. **Route** = path where the component renders as a routed page.

```
<main.jsx>  -> src/main.jsx
  Wraps the app in <React.StrictMode> and <BrowserRouter>

└── <App />  -> src/App.jsx
    State (lifted, shared by everything below):
      - cart: Array<{ id: number, title: string, artist: string, price: number, qty: number }>
        (cart line items)
      - isCartOpen: boolean (whether the slide-over drawer is visible)
    Derived (not state): cartCount: number, cartTotal: number
    Handlers defined here: handleAddToCart(album), handleChangeQty(id, delta),
      handleRemove(id), handleClearCart(), handleToggleCart(), handleCloseCart()
    │
    ├── <Navbar />  -> src/components/Navbar.jsx   (sticky header, always visible)
    │     State: none
    │     Props: cartCount: number
    │     Callbacks: onToggleCart() -> fired by the Cart badge button
    │     Contains:
    │       ├── <Link to="/"> logo
    │       ├── <NavLink> "Shop" (to="/") and "Checkout" (to="/checkout")
    │       └── Cart button with count badge
    │
    ├── <Routes>
    │   │
    │   ├── <Route path="/" element={<CatalogPage />}>   [ROUTE: "/"]
    │   │   <CatalogPage />  -> src/pages/CatalogPage.jsx
    │   │     State: selectedGenre: string (default "All"; one of
    │   │            "All" | "Jazz" | "Electronic" | "Rock" | "Classical")
    │   │     Props: onAddToCart(album: object)
    │   │     Derived: visibleAlbums: Album[] (albums.filter by selectedGenre)
    │   │     │
    │   │     ├── <CatalogHero />  -> src/components/CatalogHero.jsx
    │   │     │     State: none | Props: none (static headline and tagline)
    │   │     │
    │   │     ├── <GenreFilterBar />  -> src/components/GenreFilterBar.jsx
    │   │     │     (controlled button group)
    │   │     │     State: none
    │   │     │     Props: genres: string[], selectedGenre: string
    │   │     │     Callbacks: onSelectGenre(genre: string) -> setSelectedGenre
    │   │     │
    │   │     └── <AlbumGrid />  -> src/components/AlbumGrid.jsx
    │   │           (responsive CSS Grid; empty-state message when no results)
    │   │           State: none
    │   │           Props: albums: Album[], onAddToCart(album)
    │   │           │
    │   │           └── <AlbumCard />  -> src/components/AlbumCard.jsx
    │   │                 (rendered once per album via .map(), key={album.id})
    │   │                 State: none
    │   │                 Props: album: object, onAddToCart(album)
    │   │                 Callbacks: onAddToCart(album) -> "Add to cart" button
    │   │                 Navigation: <Link to={`/album/${album.id}`}>
    │   │                 │
    │   │                 └── <AlbumCover />  -> src/components/AlbumCover.jsx
    │   │                       State: none
    │   │                       Props: album: object, large: boolean (optional)
    │   │
    │   ├── <Route path="/album/:albumId" element={<AlbumDetailPage />}>
    │   │   [ROUTE: "/album/:albumId"]
    │   │   <AlbumDetailPage />  -> src/pages/AlbumDetailPage.jsx
    │   │     State: none (reads albumId with useParams(); finds the album in albums.js)
    │   │     Props: onAddToCart(album: object)
    │   │     Callbacks: onAddToCart(album) -> "Add to cart" button
    │   │     Navigation: <Link to="/"> back link
    │   │     Handles: unknown id -> "album not found" message
    │   │     │
    │   │     └── <AlbumCover />  (large)
    │   │           Props: album: object, large: true
    │   │
    │   ├── <Route path="/checkout" element={<CheckoutPage />}>   [ROUTE: "/checkout"]
    │   │   <CheckoutPage />  -> src/pages/CheckoutPage.jsx
    │   │     State:
    │   │       - form: { fullName, address, city, postalCode, cardNumber } (all strings;
    │   │         controlled inputs)
    │   │       - errors: object<string, string> (validation messages per field)
    │   │       - confirmation: null | { name: string, total: number, count: number }
    │   │         (order confirmation snapshot)
    │   │     Props: cart: CartItem[], cartTotal: number
    │   │     Callbacks: onClearCart() -> called after the form validates successfully
    │   │     Local handlers: handleChange(event), handleSubmit(event)
    │   │       (calls event.preventDefault())
    │   │     Renders conditionally: empty-cart message | order summary + form |
    │   │       confirmation view
    │   │     Contains:
    │   │       ├── Order summary list (maps over cart)
    │   │       └── <form> with 5 controlled <input> fields
    │   │
    │   └── <Route path="*"> -> "Page not found" message   [ROUTE: fallback]
    │
    └── <CartDrawer />  -> src/components/CartDrawer.jsx
          (slide-over panel; rendered outside <Routes> so it works on every route)
          State: none (visibility is controlled by the isCartOpen prop)
          Props: isOpen: boolean, cart: CartItem[], cartTotal: number
          Callbacks: onClose(), onChangeQty(id: number, delta: number), onRemove(id: number)
          Navigation: useNavigate() -> navigate("/checkout") from "Go to checkout" button
          │
          └── <CartItem />  -> src/components/CartItem.jsx
                (rendered per cart line via .map(), key={item.id})
                State: none
                Props: item: CartItem
                Callbacks: onChangeQty(id, delta) -> "+" / "−" buttons (delta = +1 / -1),
                           onRemove(id) -> "Remove" button
```

### State Flow Summary

| Data | Owner | Flows down to | Changed by |
|---|---|---|---|
| `cart` | `App` | `CartDrawer` (and `CartItem`), `CheckoutPage`; `cartCount` to `Navbar` | `onAddToCart`, `onChangeQty`, `onRemove`, `onClearCart` |
| `isCartOpen` | `App` | `CartDrawer` via `isOpen` | `onToggleCart`, `onClose`, and `handleAddToCart` (opens drawer) |
| `selectedGenre` | `CatalogPage` | `GenreFilterBar` | `onSelectGenre` |
| `form`, `errors`, `confirmation` | `CheckoutPage` | its own inputs and views | `handleChange`, `handleSubmit` |

**Data flow rules**
- Data flows down through props. Events flow up through callbacks
- `cart` and `isCartOpen` are lifted to `App` so the navbar badge, drawer, catalog and detail "Add to cart" buttons, and checkout page always stay in sync across routes.
- All cart updates are immutable (`.map()`, `.filter()`, spread syntax). Nothing calls `push` or mutates state directly
- Navigation is client-side only (`<Link>`, `<NavLink>`, `useNavigate()`), so no page reloads occur.
