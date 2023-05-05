import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null; //children will overwrite this later
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  }

  render() {
    return ( //renders text received from props in designated colour
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p> 
      </div>
    );
  }
} 
// ---------------- Info Alert subclass --------------//
class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'blue';
    }
  }

  export { InfoAlert }