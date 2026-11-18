import { Link } from 'react-router-dom'
import AlbumCover from './AlbumCover.jsx'

export default function AlbumCard({ album, onAddToCart }) {
  return (
    <article className="card">
      <Link to={`/album/${album.id}`} className="card-link">
        <AlbumCover album={album} />
        <h3>{album.title}</h3>
        <p className="artist">{album.artist}</p>
      </Link>
      <div className="card-footer">
        <span className="price">${album.price.toFixed(2)}</span>
        <button
          className="btn"
          onClick={() => onAddToCart(album)}
          disabled={!album.inStock}
        >
          {album.inStock ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
    </article>
  )
}
