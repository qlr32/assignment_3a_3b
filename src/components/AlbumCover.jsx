// Generates a simple sleeve graphic from the album id (no image files needed)
export default function AlbumCover({ album, large = false }) {
  const hue = (Number(album.id) * 47) % 360
  return (
    <div
      className={large ? 'cover large' : 'cover'}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 30%), hsl(${(hue + 40) % 360} 55% 55%))` }}
      role="img"
      aria-label={`Cover of ${album.title}`}
    >
      <span className="disc" />
    </div>
  )
}
