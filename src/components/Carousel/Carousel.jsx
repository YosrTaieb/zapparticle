import React from 'react';
import { Link } from 'react-router-dom';
import Poster from '../Poster/Poster';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './Carousel.css';

const Carousel = ({ current, setCurrent, items, setId, media, setTvId }) => {
  const rotateCarousel = () => {
    const carousel = document.querySelector('.carousel');
    const cell = document.querySelector('.carousel__cell');
    const cellCount = 20;
    const angle = (current / cellCount) * -360;
    const width = cell.offsetWidth;
    const tz = Math.round(width / 2 / Math.tan(Math.PI / 20));
    carousel.style.transform = `translateZ(-${tz}px) rotateY(${angle}deg)`;
  };

  const prev = () => {
    if (current === 1) {
      setCurrent(20);
    } else {
      setCurrent(current - 1);
    }
    rotateCarousel();
  };

  const next = () => {
    if (current === 20) {
      setCurrent(1);
    } else {
      setCurrent(current + 1);
    }
    rotateCarousel();
  };
  return (
    <div className="Carousel">
      <div className="scene">
        <div className="carousel">
          {items.length !== 0
            ? items.results?.map((film) =>
                film.poster_path ? (
                  <Link
                    to={
                      media === 'movie' ? `/movie/${film.id}` : `/tv/${film.id}`
                    }
                    key={film.id}
                    className="carousel__cell"
                    onClick={
                      media === 'movie'
                        ? () => setId(film.id)
                        : () => setTvId(film.id)
                    }
                  >
                    <Poster item={film} />
                    <span className="date">
                      {film.release_date?.slice(0, 4)}
                      {film.first_air_date?.slice(0, 4)}
                    </span>
                  </Link>
                ) : (
                  ''
                )
              )
            : ''}
        </div>
      </div>
      <div className="button-container">
        <button className="movie-prev" onClick={prev}>
          <HiOutlineChevronLeft />
        </button>
        <button className="movie-next" onClick={next}>
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
