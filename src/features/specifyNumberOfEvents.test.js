import { loadFeature, defineFeature } from 'jest-cucumber';
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the app is launched or opened', () => {
            AppWrapper = mount(<App />);
        });

        when('the user can see a list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('The default number of events is 32', () => {
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });
    });
    test('User can change the number of events they want to see via the Number Of Events component', ({ given, when, then }) => {
        let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
        given('the user can see a list of events', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('The user specifies the number events that they want to see', () => {
            AppWrapper.update();
            NumberOfEventsWrapper.find('.numberInput').simulate('change', { target: { value: 16 } });         
        });
        then('The specified number of events is shown to the user', () => {
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
        });
    });
    });
