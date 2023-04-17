import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} />); 
    }); //locations; the superset of all locations; has been passed to the shallow CitySearch component

    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1); //checks whether an element with the class name city exists within the CitySearchWrapper
    });
    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });
    test('renders text input correctly', () => {
        const query = CitySearchWrapper.state('query'); // sets query to the city that is typed into search box
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });
    test('change state when text input changes', () => {
        CitySearchWrapper.setState({
            query: 'Munich'
        });
        const eventObject = { target: { value: 'Berlin' }};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });
    test('render list of suggestions correctly', () => {
        const locations = extractLocations(mockData); //This variable will contain the set of distinct locations from the mockData events list
        CitySearchWrapper.setState({ suggestions: locations }); // set the suggestions state to the full list of mock locations + 1
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) { //loops through all the suggestions and compares the items in suggestions one by one. 
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
          }
    });
    test('suggestion list match the query when changed', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] }); // query and suggestion set to null/empty
        CitySearchWrapper.find(".city").simulate("change", {
          target: { value: "Berlin" },
        });
        const query = CitySearchWrapper.state("query");
        const filteredLocations = locations.filter((location) => {
          return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations); // toEqual()because the values being compared are categorized as complex data types
    });
      test("selecting a suggestion should change query state", () => {
        CitySearchWrapper.setState({
            query: 'Berlin' });
            const suggestions = CitySearchWrapper.state('suggestions');
            CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
            expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
    });
});
