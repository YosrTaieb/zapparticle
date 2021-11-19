import { useEffect } from 'react';
import { FaTv } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri';
import './Media.css';

const Media = ({ setMedia, toggleMedia, setToggleMedia }) => {
  const handleMedia = () => {
    setToggleMedia(!toggleMedia);
  };

  useEffect(() => {
    if (toggleMedia === true) {
      setMedia('tv');
    } else {
      setMedia('movie');
    }
  }, [toggleMedia]);

  return (
    <div className="Media">
      <input type="checkbox" name="media" id="media" onClick={handleMedia} />
      <label htmlFor="media">
        <RiMovie2Fill />
        <FaTv />
      </label>
    </div>
  );
};

export default Media;
