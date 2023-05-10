import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import WarningAlert from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    isOffline: !navigator.onLine, // Add a flag to track the online/offline status
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          isOffline: !navigator.onLine,
        });
      }
    });
  

  // Add an event listener to track the online/offline status
  window.addEventListener('offline', this.handleOfflineStatus);
  window.addEventListener('online', this.handleOnlineStatus);
}

componentWillUnmount() {
  this.mounted = false;
  window.removeEventListener('offline', this.handleOfflineStatus);
  window.removeEventListener('online', this.handleOnlineStatus);
}

handleOfflineStatus = () => {
  this.setState({ isOffline: true });
};

handleOnlineStatus = () => {
  this.setState({ isOffline: false });
};

  updateEvents = (location, eventCount) => { // added eventCount 
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, eventCount || this.state.numberOfEvents);
        this.setState({
          events: filteredEvents,
          location: location || this.state.location,
          numberOfEvents: eventCount || this.state.numberOfEvents
      });
    });
  }


  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({ numberOfEvents });
  };

  render() {
    return (
      <div className="App">
        {this.state.isOffline && <WarningAlert />}
        <div className='search_inputs'>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        </div>
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} />
      </div>
    );
  }
}

export default App;


