import React, {useEffect, useState, useRef } from 'react';
import './App.scss';
import './web-component/AutocompleteSearch';
import { useBouncer } from './utils/useBouncer'
import { API_KEY, URL_BASE } from './constants';
import MovieIcon from './components/MovieIcon'
import SearchIcon from './components/SearchIcon';
import SearchResultItem from './components/SearchResultItem';



function App() {
  const [search, setSearch] = useState('');

  const [movies, setMovies] = useState([]);
  const [display, setDisplay] = useState(false);

  const [requestError, setRequestError] = useState(false);

  const parentRef   = useRef(null);
  const url = `${URL_BASE}${API_KEY}&language=en-US&query=${search}`


  const getDataDebounced = useBouncer(
    async function fetchMovies() {
      if (search.length > 2) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          const moviesWithOnlyPosters =
            data &&
            data.results.map(item => (item != null ? item : null));
            
          setMovies(moviesWithOnlyPosters);
        } catch(error) {
          setRequestError(!requestError)
        }
      }
    }
    , 500
  )

  useEffect(() => {
      getDataDebounced(search)
  }, [search,getDataDebounced])


  
  function updateSearch(e) {
    setSearch(e.target.value);
  }

  function setSearchResult(result) {
    setSearch(result);
    setDisplay(false);
  }

  return (
    <div className="App">
      <h4>Bandymas daryti universalų web componentą(nėra funkcionalumo)</h4>
      <div className='wrapper' >
        <autocomplete-search className="auto-search"></autocomplete-search>
      </div>

      <h4>React componentas</h4>

      <div className='container'>
        <div ref = { parentRef }>
          <div className='input-wrapper'>
            <div className='input-wrapper__icon'>
              <MovieIcon color='#fff' />
            </div>
            <input
              type="text"
              placeholder="Enter movie name"
              className='input-wrapper__search-input'
              id="searchQuery"
              autoComplete='off'
              value={search}
              onChange={updateSearch}
              onClick={() => setDisplay(!display)}
            />
            <button type="submit" className="input-wrapper__btn">
              <SearchIcon />
            </button>
          </div>

          {display && search && 
            <div className='res-container' style={{ width: parentRef.current.offsetWidth}}>
              {movies.map((movie, index) => {
                if(index < 8) {
                  return (
                    <SearchResultItem key={movie.id} movie={movie} setSearchResult={setSearchResult} />
                  )
                }
                return null;
              })}
            </div>
          }
        </div>
      </div>
      {requestError && <p>Įvyko klaida</p>}

    </div>
  );
}

export default App;
