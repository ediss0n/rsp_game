import React, { Component } from 'react';

class IconCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content center-align">
          <span className="card-title">{this.props.type}</span>
          <p>
            <i className="large material-icons">{this.props.icon ? this.props.icon : ((this.props.type === 'Computer') ? 'laptop_windows':'face')}</i>
          </p>
        </div> 
      </div>      
    );
  }
}

export default IconCard;