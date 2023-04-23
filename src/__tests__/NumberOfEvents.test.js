import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(
          <NumberOfEvents numberOfEvents={32} updateNumberOfEvents={() => {}} />
        );
      });


    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });
    test('rendered number input is equal to numberOfEvents prop', () => {
        expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(32);
      });
      test('change state when number input changes', () => {
        const eventObject = { target: { value: 16 }};
        NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
        const eventObject2 = { target: { value: 32 }};
        NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject2);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
      });
    });