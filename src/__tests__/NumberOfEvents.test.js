import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    test('render number input', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });
    test('rendered number input is equal to 32', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        const query = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(query);
    });
    test('change state when number input changes', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        NumberOfEventsWrapper.setState({
            numberOfEvents: 32
        });
        const eventObject = { target: { value: 16 }};
        NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('query')).toBe(16);
});
});



// think I need to extract the li items from EventList and then 