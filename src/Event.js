import React, { Component } from "react";

class Event extends Component {
    state = {
        showDetails: false, // sets current state to have showDetails hidden
    };

    handleDetailsClick = () => {
        this.setState((previousState) => ({
          showDetails: !previousState.showDetails, //sets the state of showDetails to the opposite of what it was.
        }));
      };


  render() {
    const { event } = this.props; // used to extract the event prop from eventsList
    const { showDetails } = this.state;

    return (
    <div className="event">
        <h1 className="event_name">/</h1>;
        <p className="event_time"></p>;
        <div>
            <span className="event_summary"></span>;
            <span className="event_location"></span>;
        </div>
        {showDetails && ( //conditional rendering statement which lets me conditionally render a block of elements based on a certain condition.
            <>
            <h1 className="aboutEvent">About Event</h1>
            <a
              className="event_link"
              href={event.htmlLink}>
                See details on Google Calendar
              </a>
            <p className="event_description"></p>
            </>
        )} 
        <button className="event_details" onClick={this.handleDetailsClick}>Details</button>
    </div>
  );
}
}
export default Event;