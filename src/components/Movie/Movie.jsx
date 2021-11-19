import React, { useState, useEffect } from "react";
import axios from "axios";
import PopCorn from "../PopCorn/PopCorn";
import Key, { omdbKey } from "../../plop.js";
import { GiDirectorChair } from "react-icons/gi";
import { FaGrinStars, FaTheaterMasks } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import Loader from "../Loader/Loader";
import "./Movie.css";

const Movie = (props) => {
    const [movie, setMovie] = useState([]);
    const [id, setId] = useState(0);
    const [movieOmdb, setMovieOmdb] = useState([]);

    const popcorn = Math.round(movie.vote_average);

    const searchMovie = `https://api.themoviedb.org/3/movie/${props.id}?api_key=${Key}&language=fr-FR`;
    const getId = `https://api.themoviedb.org/3/movie/${movie?.id}/external_ids?api_key=${Key}`;
    const omdbSearch = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${id.imdb_id}`;

    useEffect(() => {
        if (props.id !== 0) {
            axios.get(searchMovie).then(({ data }) => {
                setMovie(data);
            });
        }
    }, [props.id]);

    useEffect(() => {
        if (movie.length !== 0) {
            axios.get(getId).then(({ data }) => {
                setId(data);
            });
        }
    }, [movie]);

    useEffect(() => {
        if (props.id !== 0) {
            axios.get(omdbSearch).then(({ data }) => {
                setMovieOmdb(data);
            });
        }
    }, [id]);

    const director = movieOmdb.Director?.split(", ");
    const actors = movieOmdb.Actors?.split(", ");

    return (
        <div className="Movie">
            <div className="movie">
                {movieOmdb.length === 0 ? (
                    <Loader />
                ) : (
                    <>
                        {movie.length !== 0 ? (
                            <img
                                className="affiche"
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        ) : (
                            ""
                        )}
                        <div className="infos">
                            <h1>{movie.title}</h1>
                            <div className="basics">
                                <span>
                                    <BsCalendar2Date />
                                    {movieOmdb.Year}
                                </span>
                                <span>
                                    <AiOutlineClockCircle />
                                    {movieOmdb.Runtime}
                                </span>
                                <span>
                                    <FaTheaterMasks />
                                    {movieOmdb.Genre}
                                </span>
                            </div>
                            <div className="note">
                                <span>{movie.vote_average}/10</span>
                                <PopCorn pop={popcorn} />
                            </div>
                            <div className="movie-infos">
                                <span className="realisateur">
                                    <GiDirectorChair />
                                    {director?.map((director, index) => (
                                        <p key={index}>{director}</p>
                                    ))}
                                </span>
                                <span className="acteurs">
                                    <FaGrinStars />
                                    {actors?.map((actor, index) => (
                                        <p key={index}>{actor}</p>
                                    ))}
                                </span>
                            </div>
                            <p className="pitch">{movie.overview}</p>
                            <a
                                target="_BLANK"
                                href={`https://www.youtube.com/results?search_query=${movie.title}+Bande+Annonce`}
                                rel="noreferrer"
                                className="centered-button"
                            >
                                <button className="watch">Voir Bande Annonce</button>
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Movie;
