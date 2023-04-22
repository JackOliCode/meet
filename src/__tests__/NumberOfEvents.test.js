import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });


    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });
    test('rendered number input is equal to 32', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(numberOfEvents);
    });
    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: 32
        });
        const eventObject = { target: { value: 16 }};
        NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
});
});