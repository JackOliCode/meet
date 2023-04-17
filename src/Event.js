import React, { Component } from "react";

class Event extends Component {
  render() {
    return (
    <div className="event">
        <div className="event_name"></div>;
        <div className="event_time"></div>;
        <div className="event_summary"></div>;
        <div className="event_location"></div>;
        <button className="event_details">Details</button>
    </div>
  );
}
}
export default Event;