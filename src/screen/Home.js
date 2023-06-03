import React from 'react'
import Banner from '../component/Banner'
import MovieList from '../component/MovieList'

function Home() {
  return (
    <div className='w-screen px-1 mr-2  bg-black'>
      {/* Home */}
      <Banner/>
      <MovieList/>
    </div>
  )
}

export default Home
