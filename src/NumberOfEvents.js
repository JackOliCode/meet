import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
      numberOfEvents: 32,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
    }

    render() {
        return (
          <div className="NOfE">
            <input
                type="number"
                className="numberInput"
                value={this.state.numberOfEvents}
                onChange={this.handleInputChanged}
            />
          </div>
        );
      }
    }
    
    export default NumberOfEvents;