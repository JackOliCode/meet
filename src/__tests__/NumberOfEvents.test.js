import React from 'react';
import { shallow, mount } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import App from '../App';

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
    // ------- INTEGRATION TESTS START HERE --------- //
    describe('<NumberOfEvents /> integration', () => {
        test('NumberOfEvents passes "numberOfEvents" as a prop to App', () => {
            const NumberOfEventsWrapper = mount(<NumberOfEvents />);
            const NOEnumberOfEventsState = NumberOfEventsWrapper.state('numberOfEvents');
            expect(NOEnumberOfEventsState).not.toEqual(undefined);
            expect(NumberOfEventsWrapper.find(App).props().numberOfEvents).toEqual(NOEnumberOfEventsState);
            NumberOfEventsWrapper.unmount();
            });
        });
    });