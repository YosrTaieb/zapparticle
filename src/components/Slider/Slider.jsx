import React, { useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './Slider.css';

const Slider = ({
  peoples,
  setPeopleId,
  current,
  setCurrent,
  viewPort,
  setViewPort,
}) => {
  const prev = () => {
    if (current === 1) {
      setCurrent(5);
    } else {
      setCurrent(current - 1);
    }
  };
  const next = () => {
    if (current === 5) {
      setCurrent(1);
    } else {
      setCurrent(current + 1);
    }
  };
  const ids = peoples.results?.slice(0, 5).map((people) => people.id);

  useEffect(() => {
    setViewPort(window.innerWidth);

    if (viewPort > 1366) {
      if (peoples.results) {
        const wrapper = document.querySelector('.slider-wrapper');

        switch (current) {
          case 1:
            wrapper.style.transform = 'translateX(0)';
            setPeopleId(ids[0]);
            break;
          case 2:
            wrapper.style.transform = 'translateX(-20vw)';
            setPeopleId(ids[1]);
            break;
          case 3:
            wrapper.style.transform = 'translateX(-40vw)';
            setPeopleId(ids[2]);
            break;
          case 4:
            wrapper.style.transform = 'translateX(-60vw)';
            setPeopleId(ids[3]);
            break;
          case 5:
            wrapper.style.transform = 'translateX(-80vw)';
            setPeopleId(ids[4]);
            break;
          default:
            setPeopleId(ids[0]);
        }
      }
    } else {
      if (peoples.results) {
        const wrapper = document.querySelector('.slider-wrapper');

        switch (current) {
          case 1:
            wrapper.style.transform = 'translateX(0)';
            setPeopleId(ids[0]);
            break;
          case 2:
            wrapper.style.transform = 'translateX(-65vw)';
            setPeopleId(ids[1]);
            break;
          case 3:
            wrapper.style.transform = 'translateX(-130vw)';
            setPeopleId(ids[2]);
            break;
          case 4:
            wrapper.style.transform = 'translateX(-195vw)';
            setPeopleId(ids[3]);
            break;
          case 5:
            wrapper.style.transform = 'translateX(260vw)';
            setPeopleId(ids[4]);
            break;
          default:
            setPeopleId(ids[0]);
        }
      }
    }
  }, [ids]);
  return (
    <div className="Slider">
      <div className="button-container">
        <span className="slider-prev" onClick={prev}>
          <HiOutlineChevronLeft />
        </span>
        <span className="slider-next" onClick={next}>
          <HiOutlineChevronRight />
        </span>
      </div>
      <div className="slider-container">
        <div className="slider-wrapper">
          {peoples.length !== 0 ? (
            peoples.results?.slice(0, 5).map((people) =>
              people.profile_path ? (
                <div className="slider_cell" key={people.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`}
                    alt={people.name}
                  />
                  <span className="name">{people.name && people.name}</span>
                </div>
              ) : (
                ''
              )
            )
          ) : (
            <p className="void">
              Veuillez entrez un nom pour choisir une personnalité
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
