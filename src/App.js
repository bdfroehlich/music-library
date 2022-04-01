import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './components/helper'
import Spinner from './components/Spinner'

//set states
const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  //
    const renderGallery = () => {
    if(data) {
        return (
            //Gallery component removed from App return to avoid trying to render data before we have it
            //when the component initially renders the value of data is null for a split second
            //but the first action Gallery makes is an attempt to process the result of the data
            //tell the application to wait for data before render by removing it from the App return
            //and sending it down as a function with a conditional to check if there is data and that it is not null
             <Suspense fallback={<Spinner />}>
                 <Gallery data={data} />
                </Suspense>
             )
        }
    }

    useEffect(() => {
        if (search) {
         setData(fetchData(search))
        }
    }, [search])

  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  return (
      <div>
          <SearchBar handleSearch={handleSearch} />
          {message}
          {renderGallery()}
      </div>
  )
}

export default App

