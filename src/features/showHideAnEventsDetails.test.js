import { loadFeature, defineFeature } from 'jest-cucumber'; 
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;

    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the app is launched or opened', () => {
            AppWrapper = mount(<App />);
        });

        when('the user can see a list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
          });

        then('the user cannot see the details of the event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .expanded_event')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the user can see a list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
          });

        when('the User can click ‘show details’ to expand event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .event_details_btn').at(0).simulate('click');
        });

        then('the event details are visible in expanded window', () => {
            expect(AppWrapper.find('.event .expanded_event')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        given('the user has clicked \'details\' to expand event', async () => {
            AppWrapper = await mount(<App />)
            AppWrapper.update();
            AppWrapper.find('.event .event_details_btn').at(0).simulate('click');
        });

        and('the event details are visible in expanded window', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .expanded_event')).toHaveLength(1);
        });

        when('The user clicks ‘hide details’ to close expanded event', () => {
            AppWrapper.find('.event .event_details_btn').at(0).simulate('click');
        });

        then('the expanded event is closed and the user can see a list of visible events', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });


});