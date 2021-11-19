import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';
import Clock from '../../assets/images/horloge.svg';
import Pointer from '../../assets/images/heures.png';
import Minutes from '../../assets/images/minutes.png';
import Pendule from '../../assets/images/pendule.png';
import Cadran from '../../assets/images/cadran.png';
import clock from '../../assets/clock.ogg';
import Media from '../Media/Media';
import Key from '../../plop';
import './Year.css';
import Pagination from '../Pagination/Pagination';

const Year = ({
  toggle,
  setMovieId,
  media,
  setTvId,
  toggleMedia,
  setMedia,
  setToggleMedia,
}) => {
  const [movies, setMovies] = useState([]);
  const [lte, setLte] = useState('');
  const [gte, setGte] = useState('');
  const [rotate, setRotate] = useState(0);
  const [toggleAnim, setToggleAnim] = useState(false);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(0);

  const searchMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${Key}&language=fr-FR&primary_release_date.lte=${lte}&primary_release_date.gte=${gte}&vote_average.gte=6&vote_count.gte=100&sort_by=popularity.desc&page=${page}`;
  const searchTv = `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&language=fr-FR&sort_by=popularity.desc&first_air_date.gte=${gte}&first_air_date.lte=${lte}&vote_count.gte=100&vote_average.gte=6&page=${page}`;

  useEffect(() => {
    if (lte && gte) {
      axios.get(media === 'movie' ? searchMovie : searchTv).then(({ data }) => {
        setMovies(data);
      });
    }
  }, [lte, page, media]);

  const play = () => {
    const audio = new Audio();
    audio.src = clock;
    audio.play();
  };

  const handleSwitchFork = (gte, lte, rotate) => {
    setGte(gte);
    setLte(lte);
    setRotate(rotate);
    setToggleAnim(true);
    setTimeout(() => {
      setToggleAnim(false);
    }, 3000);
    setPage(1);
  };

  const handleChange = (event) => {
    event.preventDefault();
    play();
    switch (event.target.value) {
      case '1':
        handleSwitchFork('1870-01-01', '1890-01-01', 0);
        break;
      case '2':
        handleSwitchFork('1890-01-01', '1910-01-01', 30);
        break;
      case '3':
        handleSwitchFork('1910-01-01', '1930-01-01', 60);
        break;
      case '4':
        handleSwitchFork('1930-01-01', '1950-01-01', 90);
        break;
      case '5':
        handleSwitchFork('1950-01-01', '1960-01-01', 120);
        break;
      case '6':
        handleSwitchFork('1960-01-01', '1970-01-01', 150);
        break;
      case '7':
        handleSwitchFork('1970-01-01', '1980-01-01', 180);
        break;
      case '8':
        handleSwitchFork('1980-01-01', '1990-01-01', 210);
        break;
      case '9':
        handleSwitchFork('1990-01-01', '2000-01-01', 240);
        break;
      case '10':
        handleSwitchFork('2000-01-01', '2010-01-01', 270);
        break;
      case '11':
        handleSwitchFork('2010-01-01', '2020-01-01', 300);
        break;
      case '12':
        handleSwitchFork('2020-01-01', '2021-12-31', 330);
        break;
    }
  };

  const handleBlur = () => {};

  return (
    <main className="Year">
      <h1>Années</h1>
      <Media
        toggleMedia={toggleMedia}
        setMedia={setMedia}
        setToggleMedia={setToggleMedia}
      />
      <div className="films">
        {movies.length !== 0 ? (
          <>
            <div className="not-mobile">
              {page !== movies.total_pages ? (
                <p>{`${20 * page} / ${movies.total_results}`}</p>
              ) : (
                <p>Dernière Page</p>
              )}
            </div>
            <Pagination page={page} setPage={setPage} items={movies} />
            <Carousel
              current={current}
              setCurrent={setCurrent}
              items={movies}
              setId={setMovieId}
              media={media}
              setTvId={setTvId}
            />
          </>
        ) : (
          ''
        )}
      </div>
      <div className="horloge-wrapper">
        <span className={`display ${toggleAnim ? 'display-anim' : ''}`}>
          {movies.length !== 0 ? `${gte.slice(0, 4)} - ${lte.slice(0, 4)}` : ''}
        </span>
        <select value={lte} onBlur={handleBlur} onChange={handleChange}>
          <option value="">
            {gte
              ? `${gte.slice(0, 4)} - ${lte.slice(0, 4)}`
              : "--Choisissez Une Fourchette d'Année--"}
          </option>
          <option value="1">1870-90</option>
          <option value="2">1890-1910</option>
          <option value="3">1910-30</option>
          <option value="4">1930-50</option>
          <option value="5">1950-60</option>
          <option value="6">1960-70</option>
          <option value="7">1970-80</option>
          <option value="8">1980-90</option>
          <option value="9">1990-2000</option>
          <option value="10">2000-10</option>
          <option value="11">2010-20</option>
          <option value="12">2021</option>
        </select>
        <div className={`horloge ${toggle ? 'move-horloge' : ''}`}>
          <img
            src={Clock}
            alt="Horloge ancienne en bois"
            className="structure"
          />
          <img
            src={Pendule}
            alt="Horloge ancienne en bois"
            className="pendule"
          />
          <img src={Cadran} alt="Horloge" className="structure" />
          <img
            src={Pointer}
            alt="Horloge ancienne en bois"
            className="pointer"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            }}
          />
          <img
            src={Minutes}
            alt="Horloge ancienne en bois"
            className="minutes"
            style={{ animationName: `${toggleAnim ? 'toggleAnim' : ''}` }}
          />
        </div>
      </div>
    </main>
  );
};

export default Year;
