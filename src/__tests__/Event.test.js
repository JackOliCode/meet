import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';


describe('<Event /> component', () => { // scope only check Event component
    test('render correct elements for event with no details shown', () => {
        const event = mockData[0]; //select first event in mockData
        const EventWrapper = shallow(<Event event={event} />); // pass the selected event to the Event component
        expect(EventWrapper.find('.event')).toHaveLength(1); // make sure the event has the correct CSS class
        expect(EventWrapper.find('.event_name')).toHaveLength(1); // make sure the event has a name element
        expect(EventWrapper.find('.event_time')).toHaveLength(1); // make sure the event has a time element
        expect(EventWrapper.find('.event_summary')).toHaveLength(1); // make sure the event has a summary element
        expect(EventWrapper.find('.event_location')).toHaveLength(1); // make sure the event has a location element
        expect(EventWrapper.find('.event_details')).toHaveLength(1); // make sure the "Details" button is present  
    });
    test('renders extra info when "details" button clickeed', () => {
        const event = mockData[0];
        const EventWrapper = shallow(<Event event={event} />);
        expect(EventWrapper.state('showDetails')).toBe(false); // make sure showDetails state is initially false
        EventWrapper.find('.event_details').simulate('click'); // simulate a click on the "Details" button
        expect(EventWrapper.state('showDetails')).toBe(true); // make sure showDetails state is now true
        expect(EventWrapper.find('h1')).toHaveLength(1); // make sure the "About Event" heading is present
        expect(EventWrapper.find('.event_link')).toHaveLength(1); // make sure the link to Google Calendar is present
        expect(EventWrapper.find('.event_description')).toHaveLength(1); // make sure the description element is present
    });
});