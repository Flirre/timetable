import React, { Component } from 'react';
import './Timetable.css';
import TimeSlot from '../../components/TimeSlot/TimeSlot';
import axios from 'axios';
import { differenceInMinutes, format, parse } from 'date-fns';
import authToken from '../../token';

class Timetable extends Component {
  state = {
    departures: []
  };

  componentWillMount() {
    this.fetchData();
    setInterval(() => this.fetchData(), 1000);
  }

  async fetchData() {
    const token = authToken;
    const authStr = 'Bearer '.concat(token);

    const rawDate = new Date();
    const date = format(rawDate, 'y-MM-dd');
    const time = format(rawDate, 'HH:mm');
    try {
      const busDataRaw = await axios.get(
        `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9022014004090002&date=${date}&time=${time}&format=json`,
        {
          headers: {
            Authorization: authStr,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const busData = busDataRaw.data;
      const DepartureBoard = busData.DepartureBoard;

      //TODO: make readable
      //TODO Sort by BusNr
      let allDeps: any[] = [];
      DepartureBoard.Departure.forEach((departure: any) => {
        let existing = allDeps.filter((v, i) => {
          return (
            v.sname === departure.sname && v.direction === departure.direction
          );
        });
        if (existing.length > 0) {
          let existingIndex = allDeps.indexOf(existing[0]);
          allDeps[existingIndex].rtTime = allDeps[existingIndex].rtTime.concat(
            departure.rtTime
          );
        } else {
          if (typeof departure.rtTime === 'string') {
            departure.rtTime = [departure.rtTime];
          }
          allDeps.push(departure);
        }
      });
      this.setState({ departures: allDeps });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="Timetable">
        {this.state.departures.map((departure: any, index: number) => {
          const color = index % 2 === 0 ? 'Light' : 'Dark';
          const timeNow = new Date();
          let firstDepartureTime;
          let secondDepartureTime: any;
          if (departure.rtTime) {
            firstDepartureTime = parse(
              departure.rtTime[0],
              'HH:mm',
              new Date()
            );
            secondDepartureTime = parse(
              departure.rtTime[1],
              'HH:mm',
              new Date()
            );
          } else {
            firstDepartureTime = parse(departure.time, 'HH:mm', new Date());
          }

          let timeLeft = differenceInMinutes(firstDepartureTime, timeNow);
          //TODO FIX, MAKE READABLE
          let timeLeftSecond;
          if (typeof secondDepartureTime !== undefined) {
            timeLeftSecond = differenceInMinutes(secondDepartureTime!, timeNow);
            if (timeLeft > timeLeftSecond) {
              [timeLeft, timeLeftSecond] = [timeLeftSecond, timeLeft];
            }
          } else {
            timeLeftSecond = null;
          }

          const lateness = differenceInMinutes(
            parse(departure.rtTime, 'HH:mm', new Date()),
            (firstDepartureTime = parse(departure.time, 'HH:mm', new Date()))
          );
          return (
            <TimeSlot
              key={`${departure.direction}-${departure.time}-${departure.rtTime}`}
              color={color}
              busColor={departure.fgColor}
              busNumber={departure.sname}
              direction={departure.direction}
              firstDeparture={timeLeft}
              secondDeparture={timeLeftSecond}
              lateness={lateness}
            />
          );
        })}
      </div>
    );
  }
}

export default Timetable;
