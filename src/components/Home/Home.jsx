import React from 'react';
import { Link } from 'react-router-dom';
import Media from '../Media/Media';
import Poster from '../Poster/Poster';
import './Home.css';

const Home = ({
  media,
  setFavoriteId,
  onChange,
  favorites,
  setMovieId,
  setTvId,
  tvId,
  similar,
  toggleMedia,
  setMedia,
  setToggleMedia,
}) => {
  const handleClick = (id) => {
    setFavoriteId(id);
  };

  return (
    <main className="Home">
      <Media
        toggleMedia={toggleMedia}
        setMedia={setMedia}
        setToggleMedia={setToggleMedia}
      />
      <section>
        <h1>Zap Particle</h1>
        <div className="clap">
          <input
            type="text"
            onChange={onChange}
            className="choice"
            placeholder={
              media === 'movie'
                ? 'Votre Film Préféré ?'
                : 'Votre Série Préférée ?'
            }
          />
        </div>
        <div className="resultsFavorite purpose">
          {favorites ? (
            favorites?.map((film) => (
              <div key={film.id} className="film-container">
                <div className="film">
                  <Poster
                    media={media}
                    item={film}
                    setMovieId={handleClick}
                    setTvId={handleClick}
                  />
                </div>
                <div className="button-container">
                  <Link
                    to={media === 'movie' ? `/movie/${film.id}` : `/tv/${tvId}`}
                    key={film.id}
                  >
                    <button
                      onClick={
                        media === 'movie'
                          ? () => setMovieId(film.id)
                          : () => setTvId(film.id)
                      }
                    >
                      Fiche
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>
              Aucun Film à montrer pour le moment. Veuillez entrer votre film
              préféré.
            </p>
          )}
        </div>
        {similar ? (
          similar.results?.length !== 0 ? (
            <>
              {media === 'movie' ? (
                <h2>Films Similaires</h2>
              ) : (
                <h2>Séries Similaires</h2>
              )}

              <div className="resultsFavorite" id="reco">
                {similar.length != undefined ? (
                  similar?.map((film) => (
                    <Link
                      to={
                        media === 'movie' ? `/movie/${film.id}` : `/tv/${tvId}`
                      }
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
                  ))
                ) : (
                  <p>
                    Veuillez Cliquez sur une image pour afficher des films
                    similaires.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>Il n&apos;existe pas de série de ce nom</p>
          )
        ) : (
          ''
        )}
      </section>
    </main>
  );
};

export default Home;
