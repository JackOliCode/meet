import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';


describe('<Event /> component', () => { // scope only check Event component
    let event;
    let EventWrapper;

    beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
    
    test('render correct elements for event with no details shown', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1); // make sure the event has the correct CSS class
        expect(EventWrapper.find('.event_name')).toHaveLength(1); // make sure the event has a name element
        expect(EventWrapper.find('.event_time')).toHaveLength(1); // make sure the event has a time element
        expect(EventWrapper.find('.event_summary')).toHaveLength(1); // make sure the event has a summary element
        expect(EventWrapper.find('.event_location')).toHaveLength(1); // make sure the event has a location element
        expect(EventWrapper.find('.event_details_btn')).toHaveLength(1); // make sure the "Details" button is present  
    });
    test('renders extra info when "details" button clicked', () => {
        expect(EventWrapper.state('showDetails')).toBe(false); // make sure showDetails state is initially false
        EventWrapper.find('.event_details_btn').simulate('click'); // simulate a click on the "Details" button
        expect(EventWrapper.state('showDetails')).toBe(true); // make sure showDetails state is now true
        expect(EventWrapper.find('.aboutEvent')).toHaveLength(1); // make sure the "About Event" heading is present
        expect(EventWrapper.find('.event_link')).toHaveLength(1); // make sure the link to Google Calendar is present
        expect(EventWrapper.find('.event_description')).toHaveLength(1); // make sure the description element is present
    });
    test('hide extra info when "hide details" button clicked', () => {
        expect(EventWrapper.state('showDetails')).toBe(true); 
        expect(EventWrapper.find('.aboutEvent')).toHaveLength(1); 
        expect(EventWrapper.find('.event_link')).toHaveLength(1); 
        expect(EventWrapper.find('.event_description')).toHaveLength(1); 
        EventWrapper.find('.event_details_btn').simulate('click'); // re-sim another click to hide details (need to add another button)
        expect(EventWrapper.state('showDetails')).toBe(false); // make sure showDetails state is now false
        expect(EventWrapper.find('.aboutEvent')).toHaveLength(0); // make sure the "About Event" heading is not present
        expect(EventWrapper.find('.event_link')).toHaveLength(0); // make sure the link to Google Calendar is not present
        expect(EventWrapper.find('.event_description')).toHaveLength(0); // make sure the description element is not present
    });
});