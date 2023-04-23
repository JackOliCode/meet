import React, { Component } from "react";

class NumberOfEvents extends Component {

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateNumberOfEvents(value);
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