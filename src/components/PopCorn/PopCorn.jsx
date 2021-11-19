import React, { useEffect, useState } from 'react';
import './PopCorn.css';

function PopCorn(props) {
  const [popCorn, setPopCorn] = useState();
  useEffect(() => {
    setPopCorn(document.getElementById('PopCorn'));
  }, [props.pop]);

  PopCorn.propTypes = {
    pop: PopCorn.id,
  };

  useEffect(() => {
    for (var i = 0; i < parseInt(props.pop); i++) {
      const pop = document.createElement('img');
      pop.src = 'https://cdn-icons-png.flaticon.com/512/659/659414.png';
      popCorn?.appendChild(pop);
    }
    for (var j = 0; j < 10 - props.pop; j++) {
      const pop = document.createElement('img');
      pop.src = 'https://cdn-icons-png.flaticon.com/512/659/659414.png';
      pop.style.opacity = '.5';
      popCorn?.appendChild(pop);
    }
  }, [props.pop]);
  return <div id="PopCorn"></div>;
}

export default PopCorn;
