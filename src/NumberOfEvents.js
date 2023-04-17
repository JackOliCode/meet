import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 32,
    }

    render() {
        return (
          <div className="NOfE">
            <input
                type="number"
                className="numberInput"
                value={this.state.query}
            />
          </div>
        );
      }
    }
    
    export default NumberOfEvents;