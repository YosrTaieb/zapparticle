import { useEffect, useState } from 'react';
import Key from '../../plop';
import axios from 'axios';
import icons from '../../icons.jsx';
import iconsTv from '../../iconsTv.jsx';
import './Genre.css';
import { Link } from 'react-router-dom';
import Poster from '../Poster/Poster';
import Media from '../Media/Media';
import Pagination from '../Pagination/Pagination';

const Genre = ({
  media,
  setTvId,
  setMovieId,
  tvId,
  toggleMedia,
  setMedia,
  setToggleMedia,
}) => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(0);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  const urlGenre = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${Key}&language=fr-FR`;
  const search = `https://api.themoviedb.org/3/discover/${media}?api_key=${Key}&language=fr-FR&sort_by=popularity.desc&with_genres=${genreId}&vote_count.gte=100&vote_average.gte=6&page=${page}`;

  useEffect(() => {
    axios.get(urlGenre).then(({ data }) => {
      setGenres(data);
    });
  }, [media]);

  useEffect(() => {
    axios.get(search).then(({ data }) => {
      setFilms(data);
    });
  }, [genreId, media, page]);
  return (
    <main className="Genre">
      <Media
        toggleMedia={toggleMedia}
        setMedia={setMedia}
        setToggleMedia={setToggleMedia}
      />
      <h1>Genre</h1>
      <div className="genres">
        {genres.genres?.map((genre, index) => (
          <div
            onClick={() => setGenreId(genre.id)}
            className="genre"
            key={genre.id}
          >
            {media === 'movie' ? (
              <span className="genre-icon">{icons[index]?.icon}</span>
            ) : (
              <span className="genre-icon">{iconsTv[index]?.icon}</span>
            )}

            <span className="genre-name">{genre.name}</span>
          </div>
        ))}
      </div>
      {films.results?.length !== 0 ? (
        <div className="genre-films-container">
          <Pagination page={page} setPage={setPage} items={films} />
          <div className="genres-films">
            {films.results?.map((film) => (
              <Link
                to={media === 'movie' ? `/movie/${film.id}` : `/tv/${tvId}`}
                key={film.id}
              >
                <div className="film">
                  <Poster
                    media={media}
                    item={film}
                    setMovieId={setMovieId}
                    setTvId={setTvId}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </main>
  );
};
export default Genre;
