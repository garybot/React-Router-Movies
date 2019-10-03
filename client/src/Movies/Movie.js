import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.js';
import { Link } from "react-router-dom";

const Movie = (props) => {
  const [movie, setMovie] = useState();
 
  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
        });
  },[props]);
  
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(<Link to={`/${movie.id}`} key={movie.id}>{movie.title}</Link>);
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie}/>
    <div onClick={saveMovie} className="save-button">Save</div>
    </div>
  );
}

export default Movie;
