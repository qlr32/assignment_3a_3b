import { Link, useParams } from 'react-router-dom'
import albums from '../data/albums.js'
import AlbumCover from '../components/AlbumCover.jsx'

export default function AlbumDetailPage({ onAddToCart }) {
  const { albumId } = useParams()
  const album = albums.find((a) => String(a.id) === albumId)

  if (!album) {
    return (
      <div className="empty">
        <p>We couldn't find that album.</p>
        <Link to="/">Back to the shop</Link>
      </div>
    )
  }

  return (
    <section className="detail">
      <AlbumCover album={album} large />
      <div className="detail-info">
        <Link to="/" className="back">&larr; Back to the shop</Link>
        <h1>{album.title}</h1>
        <p className="artist">{album.artist}</p>
        <p className="price big">${album.price.toFixed(2)}</p>
        <dl className="specs">
          <dt>Genre</dt><dd>{album.genre}</dd>
          <dt>Year</dt><dd>{album.year}</dd>
          <dt>Pressing weight</dt><dd>{album.pressingWeight}</dd>
          <dt>Catalog number</dt><dd>{album.catalogNumber}</dd>
          <dt>Speed</dt><dd>{album.speed}</dd>
          <dt>Stock</dt><dd>{album.inStock ? 'In stock' : 'Out of stock'}</dd>
        </dl>
        <button className="btn" onClick={() => onAddToCart(album)} disabled={!album.inStock}>
          {album.inStock ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </section>
  )
}
