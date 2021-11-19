import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../Slider/Slider';
import Key from '../../plop';
import Etoile from '../Etoile/Etoile';
import './People.css';
import Poster from '../Poster/Poster';

const People = ({ viewPort, setViewPort }) => {
  const [people, setPeople] = useState('');
  const [search, setSearch] = useState([]);
  const [infos, setInfos] = useState([]);
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(1);
  const [peopleId, setPeopleId] = useState(0);

  const url = `https://api.themoviedb.org/3/search/person?api_key=${Key}&language=fr-FR&query=${people}`;
  const urlInfo = `https://api.themoviedb.org/3/person/${peopleId}?api_key=${Key}&language=fr-FR`;
  const urlMovies = `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=${Key}&language=fr-FR`;

  useEffect(() => {
    if (people !== '') {
      axios.get(url).then(({ data }) => {
        setSearch(data);
      });
    }
  }, [people]);

  useEffect(() => {
    if (peopleId !== 0) {
      axios.get(urlInfo).then(({ data }) => {
        setInfos(data);
      });
    }
  }, [peopleId]);

  useEffect(() => {
    if (peopleId !== 0) {
      axios.get(urlMovies).then(({ data }) => {
        setMovies(data);
      });
    }
  }, [peopleId]);

  const handleChange = (event) => {
    setPeople(event.target.value);
  };

  return (
    <div className="People">
      <h1>People</h1>
      <div className="people-container">
        <div className="search-container">
          <Etoile />
          <input
            type="text"
            id="name"
            placeholder="Entrez le Nom d'une Célébrité"
            onChange={handleChange}
          />
        </div>
        <div className="peoples">
          {search ? (
            <Slider
              current={current}
              setCurrent={setCurrent}
              peoples={search}
              setPeopleId={setPeopleId}
              id={peopleId}
              viewPort={viewPort}
              setViewPort={setViewPort}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="infos-people">
        <div className="container-infos">
          {infos.length !== 0 ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500/${infos.profile_path}`}
                alt={people.name}
                className="info-profile"
              />
              <div className="infos-text">
                <h2>{infos.name}</h2>
                <p>{infos.known_for_department}</p>
                <p>{infos.biography}</p>
                <div className="infos-films-container">
                  {movies
                    ? movies.cast?.slice(0, 2).map((movie) => (
                        <div className="film-infos" key={movie.id}>
                          <Poster item={movie} />
                        </div>
                      ))
                    : ''}
                  {movies
                    ? movies.crew?.slice(0, 2).map((movie) => (
                        <div className="film-infos" key={movie.id}>
                          <Poster item={movie} />
                        </div>
                      ))
                    : ''}
                </div>
                <a
                  href={`https://www.imdb.com/name/${infos.imdb_id}`}
                  target="_BLANK"
                  rel="noreferrer"
                >
                  <button className="imdb">Voir Profil Complet</button>
                </a>
              </div>
            </>
          ) : (
            'oups'
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
