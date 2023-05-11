import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import WarningAlert from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { checkToken } from './api';
import { getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    isOffline: !navigator.onLine, // Add a flag to track the online/offline status
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;

      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });

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

  // --- GET DATA FUNCTION -- //
  getData = () => {
    const {locations, events} = this.state; // uses the locations and events saved in your state
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length // map the locations and filter the events by each location to get the length of the resulting array.
      const city = location.split(', ').shift() //.shift =  shorten the location and remove any unnecessary information
      return {city, number};
    })
    return data;
  };

  render() {
      if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        {this.state.isOffline && <WarningAlert />}
        <div className='search_inputs'>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        </div>
      
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                      getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;


