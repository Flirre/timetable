import React, { Component } from 'react';
import './TimeSlot.css';

class TimeSlot extends Component<
  {
    color: string;
    busColor: string;
    busNumber: number | string;
    direction: string;
    firstDeparture: number;
    lateness: number;
    secondDeparture?: number | null;
  },
  {}
> {
  render() {
    const {
      color,
      busColor,
      busNumber,
      direction,
      firstDeparture,
      lateness,
      secondDeparture
    } = this.props;
    const busColorStyle: React.CSSProperties = {
      backgroundColor: busColor,
      display: 'block',
      textAlign: 'center',
      minWidth: '6rem',
      alignSelf: 'flex-start',
      borderBottom: '1px solid black'
    };

    const busNameStyle: React.CSSProperties = {
      marginLeft: '8px',
      flexGrow: 1
    };

    const departureTimeStyle: React.CSSProperties = {
      marginRight: '16px',
      paddingLeft: '16px'
    };

    let secondDepartureElement = secondDeparture ? (
      <p style={departureTimeStyle}>{secondDeparture}</p>
    ) : (
      <></>
    );

    return (
      <div className={`TimeSlot ${color}`}>
        <div style={busColorStyle}>
          <p>{busNumber}</p>
        </div>
        <p style={busNameStyle}>{direction}</p>
        <p style={departureTimeStyle}>{firstDeparture}</p>
        {secondDepartureElement}
      </div>
    );
  }
}

export default TimeSlot;
