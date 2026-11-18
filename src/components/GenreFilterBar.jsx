export default function GenreFilterBar({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by genre">
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === selectedGenre ? 'chip active' : 'chip'}
          aria-pressed={genre === selectedGenre}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
