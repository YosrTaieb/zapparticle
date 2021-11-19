import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopCorn from '../PopCorn/PopCorn';
import Key from '../../plop.js';
import { GiDirectorChair } from 'react-icons/gi';
import { FaFolder } from 'react-icons/fa';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineNumber } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import './Tv.css';

const Tv = (props) => {
  const [tv, setTv] = useState([]);

  Tv.propTypes = {
    id: Tv.int,
  };

  const popcorn = Math.round(tv.vote_average);

  const searchTv = `https://api.themoviedb.org/3/tv/${props.id}?api_key=${Key}&language=fr-FR`;

  useEffect(() => {
    if (props.id !== 0) {
      axios.get(searchTv).then(({ data }) => {
        setTv(data);
      });
    }
  }, [props.id]);

  return (
    <div className="Movie">
      <div className="movie">
        <>
          <img
            className="affiche"
            src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
            alt={tv.name}
          />
          <div className="infos">
            <h1>{tv.name}</h1>
            <div className="basics">
              <span>
                <BsCalendar2Date />
                {tv.first_air_date}
              </span>
              <span>
                <FaFolder />
                {`${tv.number_of_seasons} saison/s`}
              </span>
              <span>
                <AiOutlineNumber />
                {`${tv.number_of_episodes} Épisodes`}
              </span>
            </div>
            <div className="note">
              <span>{tv.vote_average}/10</span>
              <PopCorn pop={popcorn} />
            </div>
            <div className="movie-infos">
              <span className="realisateur">
                <GiDirectorChair />
                {tv.created_by?.map((person) => person.name)}
              </span>
              <span className="saisons">
                <GiMagnifyingGlass />
                {tv.seasons?.map((season) => (
                  <div key={season.id}>
                    <span>{season.season_number} - </span>
                    <span>{season.name} - </span>
                    <span>({season.air_date?.slice(0, 4)}) - </span>
                    <span>{season.episode_count} épisodes</span>
                  </div>
                ))}
              </span>
            </div>
            <p className="pitch">{tv.overview}</p>
            <div className="button-container">
              {tv.homepage ? (
                <a
                  target="_BLANK"
                  href={tv.homepage}
                  rel="noreferrer"
                  className="watch"
                >
                  Accéder au Site
                </a>
              ) : (
                <a
                  target="_BLANK"
                  href={`https://www.youtube.com/results?search_query=${tv.name}+Bande+Annonce`}
                  rel="noreferrer"
                  className="watch"
                >
                  Voir Bande Annonce
                </a>
              )}
              {tv.networks ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tv.networks[0].logo_path}`}
                  alt="company logo"
                  className="company"
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Tv;
