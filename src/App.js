import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'
import LoadBar from './LoadBar'
import { render } from '@testing-library/react'


const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)


  useEffect(() => {
      if(search) {
        setData(fetchData(search))
      }
  }, [search])

  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  //the first action Gallery makes upon the initial render of the page is to render "data"
  //because data has an initial state of "null" we have to tell the application to wait for data
  //before trying to render it by passing a conditional
  const renderGallery = () => {
      if (data) {
          return (
            //wrap gallery in Suspense to declaratively “wait” for data, gallery component will need access to the read()
            //function defined in helper.js
                <Suspense fallback={<LoadBar />}>
                    <Gallery data={data} />
                </Suspense>    
          )
      }
  }

  return (
      <div>
        {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    // shorthand Fragment to place more than one element in a component <></>
                    <>
                        <SearchBar handleSearch={handleSearch} />
                        {renderGallery()}
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

