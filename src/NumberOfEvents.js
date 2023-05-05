import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: this.props.numberOfEvents //sets the initial value of numberOfEvents in the component's state to the value passed in as a prop, so it is not null or undefined
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateNumberOfEvents(value);
    if (value < 0) {
      this.setState({
        numberOfEvents: value,
        errorText: 'Please enter a number greater than 0.'
      });
    } else {
    
    return this.setState({ 
      numberOfEvents: value,
      errorText: ''
    }); //The handleInputChanged function also updates the state when the input changes.
  }
};

  render() {
    return (
      <div className="NOfE">
        <ErrorAlert text={this.state.errorText} />
        <input
          type="number"
          className="numberInput"
          value={this.props.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}


export default NumberOfEvents;