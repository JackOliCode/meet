import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';


describe('<Event /> component', () => { // scope only check Event component
    test('render correct elements for event with no details shown', () => {
        const event = mockData[0]; //select first event in mockData
        const EventWrapper = shallow(<Event event={event} />); // pass the selected event to the Event component
        expect(EventWrapper.find('.event')).toHaveLength(1); // make sure the event has the correct CSS class
        expect(EventWrapper.find('.event_time')).toHaveLength(1); // make sure the event has a time element
        expect(EventWrapper.find('.event_summary')).toHaveLength(1); // make sure the event has a summary element
        expect(EventWrapper.find('.event_location')).toHaveLength(1); // make sure the event has a location element  
});
});