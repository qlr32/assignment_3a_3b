import AlbumCard from './AlbumCard.jsx'

export default function AlbumGrid({ albums, onAddToCart }) {
  if (albums.length === 0) {
    return <p className="empty">No albums in this genre yet.</p>
  }
  return (
    <div className="grid">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
