import { useState } from 'react'
import { ALBUMS } from '../data/albums.js'
import CatalogHero from '../components/CatalogHero.jsx'
import GenreFilterBar from '../components/GenreFilterBar.jsx'
import AlbumGrid from '../components/AlbumGrid.jsx'

const GENRES = ['All', 'Jazz', 'Electronic', 'Rock', 'Classical']

export default function CatalogPage({ onAddToCart }) {
  const [selectedGenre, setSelectedGenre] = useState('All')

  const visibleAlbums =
    selectedGenre === 'All' ? ALBUMS : ALBUMS.filter((a) => a.genre === selectedGenre)

  return (
    <>
      <CatalogHero />
      <GenreFilterBar genres={GENRES} selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
      <AlbumGrid albums={visibleAlbums} onAddToCart={onAddToCart} />
    </>
  )
}