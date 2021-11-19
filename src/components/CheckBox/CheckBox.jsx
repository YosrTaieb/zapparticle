import './CheckBox.css';

const CheckBox = ({ onChange, name, icon, icon2, desktop }) => {
  return (
    <div className="CheckBox">
      <input type="checkbox" name={name} id={name} onClick={onChange} />
      <label htmlFor={name}>
        {icon}
        {icon2}
        <span>{desktop}</span>
      </label>
    </div>
  );
};

export default CheckBox;
