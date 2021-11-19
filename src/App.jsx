import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from './components/Logo/Logo';
import Telecommande from './components/Telecommande/Telecommande';
import Home from './components/Home/Home';
import Genre from './components/Genre/Genre';
import People from './components/People/People';
import Trend from './components/Trend/Trend';
import Year from './components/Year/Year';
import Movie from './components/Movie/Movie';
import Key from './plop.js';
import Tv from './components/Tv/Tv';

function App() {
  const [toggle, setToggle] = useState(false);
  const [favorite, setFavorite] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [favoriteId, setFavoriteId] = useState(0);
  const [similar, setSimilar] = useState([]);
  const [movieId, setMovieId] = useState(0);
  const [tvId, setTvId] = useState(0);
  const [toggleMedia, setToggleMedia] = useState(false);
  const [media, setMedia] = useState('movie');
  const [viewPort, setViewPort] = useState();

  const onChange = (event) => {
    setFavorite(event.target.value);
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // const req =
  const searchFavorite = `https://api.themoviedb.org/3/search/${media}?api_key=${Key}&language=fr-FR&page=1&include_adult=false&query=${favorite}`;
  const searchSimilar = `https://api.themoviedb.org/3/${media}/${favoriteId}/recommendations?api_key=${Key}&language=fr-FR&page=1`;

  const jumpTo = (hash) => {
    window.location.href = '#' + hash;
  };

  useEffect(() => {
    if (favorite !== '') {
      axios.get(searchFavorite).then(({ data }) => {
        setFavorites(data);
      });
    }
  }, [favorite, media]);

  useEffect(() => {
    if (favoriteId !== 0) {
      axios.get(searchSimilar).then(({ data }) => {
        setSimilar(data);
        jumpTo('reco');
      });
    }
  }, [favoriteId, media]);

  const datas = favorites.results?.filter((item) => item.vote_count > 100);
  const movies = similar.results
    ?.filter((item) => item.vote_count > 100)
    .splice(0, 12);

  return (
    <div className="App">
      <Router>
        <Link to="/">
          <Logo />
        </Link>
        <i
          className={`fas fa-sort-up show ${toggle ? 'move-arrow' : ''}`}
          onClick={handleToggle}
        ></i>
        <Telecommande toggle={toggle} />
        <Switch>
          <Route exact path="/">
            <Home
              onChange={onChange}
              favorites={datas != [] ? datas?.slice(0, 8) : ''}
              setFavoriteId={setFavoriteId}
              favoriteId={favoriteId}
              similar={movies}
              setMovieId={setMovieId}
              media={media}
              tvId={tvId}
              setTvId={setTvId}
              toggleMedia={toggleMedia}
              setMedia={setMedia}
              setToggleMedia={setToggleMedia}
            />
          </Route>
          <Route path="/genre">
            <Genre
              setMovieId={setMovieId}
              media={media}
              setTvId={setTvId}
              tvid={tvId}
              toggleMedia={toggleMedia}
              setMedia={setMedia}
              setToggleMedia={setToggleMedia}
            />
          </Route>
          <Route path="/people">
            <People viewPort={viewPort} setViewPort={setViewPort} />
          </Route>
          <Route path="/trend">
            <Trend
              setMovieId={setMovieId}
              media={media}
              setTvId={setTvId}
              tvid={tvId}
              toggleMedia={toggleMedia}
              setMedia={setMedia}
              setToggleMedia={setToggleMedia}
              tvId={tvId}
            />
          </Route>
          <Route path="/year">
            <Year
              toggle={toggle}
              setMovieId={setMovieId}
              media={media}
              setTvId={setTvId}
              toggleMedia={toggleMedia}
              setMedia={setMedia}
              setToggleMedia={setToggleMedia}
            />
          </Route>
          <Route path="/movie/:id">
            <Movie id={movieId} />
          </Route>
          <Route path="/tv/:id">
            <Tv id={tvId} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
