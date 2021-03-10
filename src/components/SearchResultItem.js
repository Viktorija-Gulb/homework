import React from 'react'


const SearchResultItem = ({movie, setSearchResult})=> {
  return (
    <div className='res-container__search-results' tabIndex={0} key={movie.id} onClick={() => setSearchResult(movie.title)}>
      <p className='res-container__title'>{movie.title}</p>
      <p className='res-container__subtitle'>{`${movie.vote_average} Raiting, ${movie.release_date}`}</p>
    </div>
  )
}


export default SearchResultItem
