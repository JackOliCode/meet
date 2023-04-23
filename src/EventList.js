import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
    render() {
        const { events, numberOfEvents } = this.props; //take NOE as a prop
        const slicedEvents = events.slice(0, numberOfEvents); // The slice method returns a new array with the first numberOfEvents elements of the original events array.
        return (
            <ul className='EventList'>
                {slicedEvents.map(event => //maps all events and returns each as a li
                    <li key={event.id} className="list_container">
                        <Event event={event}
                        />
                    </li>
                )}
            </ul>
        );
    }
}

export default EventList;