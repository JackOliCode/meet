import { loadFeature, defineFeature } from 'jest-cucumber'; 
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the app is launched or opened', () => {
        });

        when('the user can see a list of events', () => {

        });

        then('the user cannot see the details of the event', () => {

        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the user can see a list of events', () => {

        });

        when('the User can click ‘show details’ to expand event', () => {

        });

        then('the event details are visible in expanded window', () => {

        });
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        given('the user has clicked \'details\' to expand event', () => {

        });

        and('the event details are visible in expanded window', () => {

        });

        when('The user clicks ‘hide details’ to close expanded event', () => {

        });

        then('the expanded event is closed and the user can see a list of visible events', () => {

        });
    });


});