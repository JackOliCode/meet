import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: this.props.numberOfEvents //sets the initial value of numberOfEvents in the component's state to the value passed in as a prop, so it is not null or undefined
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateNumberOfEvents(value);
    this.setState({ numberOfEvents: value }); //The handleInputChanged function also updates the state when the input changes.
  };

  render() {
    return (
      <div className="NOfE">
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