import React from 'react';
import './Poster.css';

const Poster = ({ media, item, setMovieId, setTvId }) => {
  return (
    <div
      className="Poster"
      onClick={
        media === 'movie' ? () => setMovieId(item.id) : () => setTvId(item.id)
      }
    >
      <span className="title">
        {item.title}
        {item.name}
      </span>
      {item.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
          alt={item.title}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Poster;
