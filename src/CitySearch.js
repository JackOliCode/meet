import React, { Component } from 'react';
import { InfoAlert } from './Alert';



class CitySearch extends Component {
state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText:''
    }

handleInputChanged = (event) => { // event handler for <input> for the change event
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => { //this.props.locations within the function because you’ll be passing it from the App component later on
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
        this.setState({
          query: value,
          infoText: 'We can not find the city you are looking for. Please try another city',
        });
    } else {
        return this.setState({
          query: value,
          suggestions,
          infoText:''
        });
      }
    };

handleItemClicked = (suggestion) => {
    this.setState({
        query: suggestion,
        showSuggestions: false
    });


    this.props.updateEvents(suggestion);
}

render() {
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
            <input
                type='text'
                className='city'
                value={this.state.query}
                onChange={this.handleInputChanged}
                onFocus={() => { this.setState({ showSuggestions: true }) }} 
                placeholder='Search by City'
            />
      
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}> 
            {this.state.suggestions.map((suggestion) => ( //mapping through array and returning singular suggestion
                <li 
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)} // the suggestion being passed to handleItemClicked() is the variable that’s being passed to the map loop function’s callback
                >{suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
                <b>See all cities</b>
            </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;