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
      minWidth: '75px',
      alignSelf: 'flex-start'
    };

    const busNameStyle: React.CSSProperties = {
      marginLeft: '8px',
      flexGrow: 1
    };
    let secondDepartureElement = secondDeparture ? (
      <p style={{ marginRight: '16px' }}>{secondDeparture}</p>
    ) : (
      <></>
    );

    return (
      <div className={`TimeSlot ${color}`}>
        <div style={busColorStyle}>
          <p>{busNumber}</p>
        </div>
        <p style={busNameStyle}>{direction}</p>
        <p style={{ marginRight: '16px' }}>{firstDeparture}</p>
        {secondDepartureElement}
      </div>
    );
  }
}

export default TimeSlot;
