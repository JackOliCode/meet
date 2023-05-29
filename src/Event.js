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
        <h1 className="event_name">{event.summary}</h1>
        <p className="event_time">{event.start.dateTime}</p>
        <div>
            <span className="event_summary">{event.summary}</span>;
            <span className="event_location">{event.location}</span>;
        </div>
        {showDetails && ( //conditional rendering statement which lets me conditionally render a block of elements based on a certain condition.
            <div className="expanded_event">
            <h2 className="aboutEvent">About Event</h2>
            <a
              className="event_link"
              href={event.htmlLink}>
                See details on Google Calendar
              </a>
            <p className="event_description">{event.description}</p>
            </div>
        )} 
<       button className="event_details_btn" onClick={this.handleDetailsClick}>
          {showDetails ? "Show Less" : "Details"}
        </button>
    </div>
  );
}
}
export default Event;