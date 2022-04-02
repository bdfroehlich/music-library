import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'


const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([null])


  useEffect(() => {
      if(search) {
        setData(fetchData(search))
      }
  }, [search])

  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  return (
      <div>
        {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    //shorthand Fragment to place more than one element in a component <></>
                    <>
                        <SearchBar handleSearch={handleSearch} />
                        <Gallery data={data} />
                    </>
                } />
                <Route path="/album/:id" element={
                    <AlbumView />
                } />
                 <Route path="/artist/:id" element={
                    <ArtistView />
                } />
            </Routes>
        </Router>
      </div>
  )
}

export default App

