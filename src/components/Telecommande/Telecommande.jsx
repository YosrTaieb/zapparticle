import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Zap from '../../assets/zap.ogg';
import './Telecommande.css';

const Telecommande = ({ toggle }) => {
  const [toggleLight, setToggleLight] = useState(false);

  const lightTrue = () => {
    setToggleLight(true);
  };
  const lightFalse = () => {
    setToggleLight(false);
  };

  const play = () => {
    const audio = new Audio();
    audio.src = Zap;
    audio.play();
  };

  return (
    <nav className={`menu ${toggle ? 'move-telecommande' : ''}`}>
      <div
        className={`led ${toggle ? 'move-led' : ''} ${
          toggleLight ? 'light' : ''
        }`}
      ></div>
      <div className="telecommande">
        <ul>
          <Link to="/people">
            <li>
              <span
                onClick={play}
                onMouseDown={lightTrue}
                onMouseUp={lightFalse}
              >
                <i className="fas fa-star"></i>
              </span>
            </li>
          </Link>
          <Link to="/trend">
            <li>
              <span
                onClick={play}
                onMouseDown={lightTrue}
                onMouseUp={lightFalse}
              >
                <i className="fas fa-chart-bar"></i>
              </span>
            </li>
          </Link>
          <Link to="/genre">
            <li>
              <span
                onClick={play}
                onMouseDown={lightTrue}
                onMouseUp={lightFalse}
              >
                <i className="fas fa-theater-masks"></i>
              </span>
            </li>
          </Link>
          <Link to="/year">
            <li>
              <span
                onClick={play}
                onMouseDown={lightTrue}
                onMouseUp={lightFalse}
              >
                <i className="fas fa-clock"></i>
              </span>
            </li>
          </Link>
        </ul>
        <div className="bas" onMouseDown={lightTrue} onMouseUp={lightFalse}>
          <Link to="/">ZP</Link>
        </div>
        <div className="reflet"></div>
      </div>
    </nav>
  );
};

export default Telecommande;
