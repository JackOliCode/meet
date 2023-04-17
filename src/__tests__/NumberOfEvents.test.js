import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { Component } from 'react';

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
});

/* tests to make;
There needs to be 32 events displayed 'render 32 events as default' - eventList

number 32 needs to be displayed on NOE component - NOE

*/