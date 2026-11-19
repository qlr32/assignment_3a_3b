import { Link, useParams } from 'react-router-dom'
import { ALBUMS } from '../data/albums.js'
import AlbumCover from '../components/AlbumCover.jsx'

export default function AlbumDetailPage({ onAddToCart }) {
  const { albumId } = useParams()
  const album = ALBUMS.find((a) => a.id === albumId)

  if (!album) {
    return (
      <div className="empty">
        <p>We couldn't find that album.</p>
        <Link to="/">Back to the shop</Link>
      </div>
    )
  }

  const inStock = album.stock > 0

  return (
    <section className="detail">
      <AlbumCover album={album} large />
      <div className="detail-info">
        <Link to="/" className="back">&larr; Back to the shop</Link>
        <h1>{album.title}</h1>
        <p className="artist">{album.artist}</p>
        <p className="price big">${album.price.toFixed(2)}</p>
        <p>{album.description}</p>
        <dl className="specs">
          <dt>Genre</dt><dd>{album.genre}</dd>
          <dt>Label</dt><dd>{album.specs.label}</dd>
          <dt>Pressing weight</dt><dd>{album.specs.weight}</dd>
          <dt>Catalog number</dt><dd>{album.specs.catalogNumber}</dd>
          <dt>Speed</dt><dd>{album.specs.speed}</dd>
          <dt>Stock</dt><dd>{inStock ? `In stock (${album.stock} left)` : 'Out of stock'}</dd>
        </dl>
        <h2>Tracklist</h2>
        <ol className="tracklist">
          {album.tracklist.map((track) => (
            <li key={track}>{track}</li>
          ))}
        </ol>
        <button className="btn" onClick={() => onAddToCart(album)} disabled={!inStock}>
          {inStock ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </section>
  )
}