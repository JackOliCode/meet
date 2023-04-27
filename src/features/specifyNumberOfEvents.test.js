import { loadFeature, defineFeature } from 'jest-cucumber';
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the app is launched or opened', () => {
            AppWrapper = mount(<App />);
        });

        when('the user can see a list of events', () => {
            AppWrapper.update();
        });

        then('The default number of events is 32', () => {

        });
    });
    test('User can change the number of events they want to see via the Number Of Events component', ({ given, when, then }) => {
        given('the user can see a list of events', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });

        when('The user specifies the number events that they want to see', () => {
            AppWrapper.update();
            let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.numberInput').simulate('change', { target: { value: 16 } });         
        });
        then('The specified number of events is shown to the user', () => {
            expect(AppWrapper.state('numberOfEvents')).toEqual(16);
        });
    });
    });
