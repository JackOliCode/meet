import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';

describe('<EventList /> component', () => { // scope only check EventList component
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={[{}, {}, {}, {}]} />); //four empty objects 'Mock' data
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});