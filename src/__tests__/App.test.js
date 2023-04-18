import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

// ------- UNIT TESTS START HERE --------- //
describe('<App /> component', () => { // new scope 
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    })


    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
      });

      test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
      });

      test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
      });

});

// ------- INTEGRATION TESTS START HERE --------- //
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined); //  test checks whether the state of events isn’t undefined. necessary otherwise comparison below could pass with events being equal
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState); //compare the state of App’s events with EventList's events prop to ensure it’s been passed correctly
    AppWrapper.unmount(); // “clean up” your DOM after each test using a function called unmount()
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); //CitySearch's suggestions state has been set to have all available cities
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length)); //selectedIndex will hold the index of the selected suggestion from the suggestions array because Math.floor(Math.random() * (suggestions.length)) will evaluate to an integer value ranging from 0 to suggestion.length - 1
    const selectedCity = suggestions[selectedIndex]; //Once the index is selected, it’s used to return the actual suggestion
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); //await has been added when handleItemClicked() is called because it’s expected that it will have async code
    const allEvents = await getEvents(); // getEvents to be created in api.js
    const eventsToShow = allEvents.filter(event => event.location === selectedCity); //the list of all events is filtered against the selected location/city in order to find the events that have the same location. These events are stored in eventsToShow.
    expect(AppWrapper.state('events')).toEqual(eventsToShow); //compares whether the state of events actually takes the same array as the events that resulted from the filtering process in the previous step
    AppWrapper.unmount();
});
});