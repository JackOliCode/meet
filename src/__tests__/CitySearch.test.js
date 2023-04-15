import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    test('render text input', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        expect(CitySearchWrapper.find('.city')).toHaveLength(1); //checks whether an element with the class name city exists within the CitySearchWrapper
    });
    test('renders a list of suggestions', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });
    test('renders text input correctly', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        const query = CitySearchWrapper.state('query'); // sets query to the city that is typed into search box
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });
    test('change state when text input changes', () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        CitySearchWrapper.setState({
            query: 'Munich'
        });
        const eventObject = { target: { value: 'Berlin' }};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });
    test('render list of suggestions correctly', () => {
        const locations = extractLocations(mockData); //This variable will contain the set of distinct locations from the mockData events list
        const CitySearchWrapper = shallow(<CitySearch />);
        CitySearchWrapper.setState({ suggestions: locations }); // set the suggestions state to the full list of mock locations + 1
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) { //loops through all the suggestions and compares the items in suggestions one by one. 
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
          }
    });
});