export default function AlbumCover({ album, large = false }) {
  return (
    <div className={large ? 'cover large' : 'cover'}>
      <img src={album.image} alt={`Cover of ${album.title}`} loading="lazy" />
    </div>
  )
}
