import "./DateDisplay.css"; // Import the CSS file
import PropTypes from "prop-types";

const DateDisplay = ({ dateTorender, monthTorender }) => {
  return (
    <figure className="date-display-figure">
      <header className="date-display-header">{monthTorender}</header>
      <section className="date-display-day">{dateTorender}</section>
    </figure>
  );
};
DateDisplay.propTypes = {
  dateTorender: PropTypes.string.isRequired,
  monthTorender: PropTypes.string.isRequired,
};

export default DateDisplay;
