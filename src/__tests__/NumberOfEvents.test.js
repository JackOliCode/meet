import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { Component } from 'react';

describe('<NumberOfEvents /> component', () => {
    test('render text input', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });
});