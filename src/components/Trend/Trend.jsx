import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trend.css';
import Key from '../../plop.js';
import TrendImage from '../TrendImage/TrendImage';
import Neon from '../../assets/images/neon4.png';
import CheckBox from '../CheckBox/CheckBox';
import Poster from '../Poster/Poster';
import Pagination from '../Pagination/Pagination';
import Media from '../Media/Media';
import { FaThumbsDown, FaThumbsUp, FaGlobeAfrica } from 'react-icons/fa';
import { GiRooster } from 'react-icons/gi';
import { RiNumber6, RiNumber0 } from 'react-icons/ri';
import { Link } from 'react-router-dom';
//import Pagination from '../Pagination/Pagination';

const Trend = ({
  setMovieId,
  media,
  setTvId,
  toggleMedia,
  setMedia,
  setToggleMedia,
  tvId,
}) => {
  const [result, setResult] = useState([]);
  const [sort, setSort] = useState(false);
  const [language, setLanguage] = useState(false);
  const [average, setAverage] = useState(false);
  const [page, setPage] = useState(1);

  const fr = '&with_original_language=fr';
  const note = '&vote_average.gte=6';

  const search = `https://api.themoviedb.org/3/discover/${media}?api_key=${Key}&language=fr-FR&vote_count.gte=100&sort_by=popularity.${
    sort ? 'asc' : 'desc'
  }${language ? fr : ''}${average ? note : ''}&page=${page}`;

  const thumbD = <FaThumbsDown />;
  const thumbUp = <FaThumbsUp />;
  const rooster = <GiRooster />;
  const world = <FaGlobeAfrica />;
  const six = <RiNumber6 />;
  const zero = <RiNumber0 />;

  const handleSort = () => {
    setSort(!sort);
  };

  const handleLanguage = () => {
    setLanguage(!language);
  };

  const handleAverage = () => {
    setAverage(!average);
  };

  useEffect(() => {
    axios.get(search).then(({ data }) => {
      setResult(data);
    });
  }, [page]);

  useEffect(() => {
    axios.get(search).then(({ data }) => {
      setResult(data);
      setPage(1);
    });
  }, [average, language, sort, media]);

  return (
    <section className="Trend">
      <Media
        toggleMedia={toggleMedia}
        setMedia={setMedia}
        setToggleMedia={setToggleMedia}
      />
      <h1>Tendances</h1>
      <img src={Neon} alt="Neon" className="neon not-mobile" />
      <TrendImage />
      <div>
        <div className="checkbox-container">
          <CheckBox
            onChange={handleSort}
            name="trend"
            icon={thumbUp}
            icon2={thumbD}
            desktop="Tendances Inversées"
          />
          <CheckBox
            onChange={() => handleLanguage()}
            name="fr"
            icon={world}
            icon2={rooster}
            desktop="Francais Exclusivement"
          />
          <CheckBox
            onChange={handleAverage}
            name="6"
            icon={zero}
            icon2={six}
            desktop="Note superieur à 6"
          />
        </div>
      </div>
      <Pagination page={page} setPage={setPage} items={result} />
      <div className="films-container">
        {result ? (
          result.results?.map((movie) =>
            movie.poster_path ? (
              <Link
                to={media === 'movie' ? `/movie/${movie.id}` : `/tv/${tvId}`}
                key={movie.id}
              >
                <div className="film">
                  <Poster
                    media={media}
                    item={movie}
                    setMovieId={setMovieId}
                    setTvId={setTvId}
                  />
                </div>
              </Link>
            ) : (
              ''
            )
          )
        ) : (
          <p>nothing to show</p>
        )}
      </div>
    </section>
  );
};

export default Trend;
