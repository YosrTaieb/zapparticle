import React from 'react';
import loader from '../../assets/images/loader.gif';
import './Loader.css';

const Loader = () => {
  return (
    <div className="Loader">
      <img src={loader} alt="Chargement de la page" />
      <span className="chargement">PopCorn and chill</span>
    </div>
  );
};

export default Loader;
