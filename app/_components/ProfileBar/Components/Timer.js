import React from "react";
import moment, { min } from "moment";

class Countdown extends React.Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate, timeFormat, countdownDuration = 21600 } = this.props;

      // Calculate delta based on countdownDuration prop
      var delta = countdownDuration - Math.abs(Math.floor(Date.now() / 1000) - timeTillDate);

      if (delta < 0) {
        this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        // Calculate days, hours, minutes, seconds
        var days = Math.floor(delta / 86400).toFixed(0);
        delta -= days * 86400;

        var hours = (Math.floor(delta / 3600) % 24).toFixed(0);
        delta -= hours * 3600;

        var minutes = (Math.floor(delta / 60) % 60).toFixed(0);
        delta -= minutes * 60;

        var seconds = (delta % 60).toFixed(0);

        this.setState({ days, hours, minutes, seconds });
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    // // Hide days, hours, minutes individually if they are zero
    // const showDays = days !== '0' && days !== undefined;
    // const showHours = hours !== '0' && hours !== undefined;
    // const showMinutes = minutes !== '0' && minutes !== undefined;

    const showDays = days !== '0' && days !== undefined;
    const showHours = hours !== '0' && days !== undefined;
    const showMinutes = minutes !== '0' && days !== undefined;


    // Mapping the date values to radius values
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    return (
      <div>
        <div className="countdown-wrapper">
          {showHours && (
            <div className="countdown-item">
              <SVGCircle radius={360 - hoursRadius} />
              {hours}h
            </div>
          )}

          {showMinutes && (
            <div className="countdown-item">
              <SVGCircle radius={360 - minutesRadius} />
              {minutes}m
            </div>
          )}

          <div className="countdown-item">
            <SVGCircle radius={360 - secondsRadius} />
            {seconds}s
          </div>
        </div>
      </div>
    );
  }
}

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#D376FF"
      stroke-width="4"
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}
export default Countdown;
