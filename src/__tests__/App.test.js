import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';


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

});