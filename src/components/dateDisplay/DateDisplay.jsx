import "./DateDisplay.css"; // Import the CSS file
import PropTypes from "prop-types";

const DateDisplay = ({ dateTorender, monthTorender, yearToRender }) => {
  return (
    <figure className="date-display-figure">
      <header className="date-display-header">{monthTorender}</header>
      <section className="date-display-day">{dateTorender}</section>
      {/* font-size: 10px;
    position: absolute;
    bottom: 0px;
    height: fit-content;
    padding: 0;
    margin: 0;
    margin-right: 50%;
    width: 100%;
    color: gray; */}
      <section
        style={{
          fontSize: "10px",
          position: "absolute",
          bottom: "1px",
          height: "fit-content",
          margin: "0px",
          width: "100%",
          marginRight: "50%",
          color: "gray",
        }}
      >
        {yearToRender}
      </section>
    </figure>
  );
};
DateDisplay.propTypes = {
  dateTorender: PropTypes.string.isRequired,
  monthTorender: PropTypes.string.isRequired,
  yearToRender: PropTypes.string.isRequired,
};

export default DateDisplay;
