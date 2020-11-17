import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import addMinutes from "date-fns/addMinutes";
import format from "date-fns/format";

import { filteredTicketsSelector } from "../../selectors/index.js";
import "../../css/ticketsList.css";

const mapStateToProps = (state) => {
  const props = {
    tickets: filteredTicketsSelector(state),
  };
  return props;
};

class TicketsList extends React.Component {
  createDateAsUTC = (date) => {
    const [day, month, year, hours, minutes] = [
      date.getUTCDate(),
      date.getUTCMonth(),
      date.getUTCFullYear(),
      date.getUTCHours(),
      date.getUTCMinutes(),
    ];
    return new Date(year, month, day, hours, minutes);
  };

  formatDate = (date, separator) => {
    return separator
      ? format(date, `HH${separator}mm`)
      : format(date, `HHч mmм`);
  };

  calculateDuration = (duration) => {
    const MINUTES_OF_HOUR = 60;
    const hours = Math.floor(duration / MINUTES_OF_HOUR);
    const minutes = duration % MINUTES_OF_HOUR;
    return [hours, minutes];
  };

  renderTicket = () => (item, index) => {
    if (index > 10) return null;

    console.log(
      "TICKET TRAVEL DURATION",
      item.segments.reduce((acc, segment) => acc + segment.duration, 0)
    );

    return (
      <li className="tickets-list__item">
        <div className="tickets-item__header">
          <p>{item.price} РУБЛЕЙ </p>
          <img src={`https://pics.avs.io/99/36/${item.carrier}.png`}></img>
        </div>
        {item.segments.map((segment) => {
          console.log(segment.date);
          const localDate = new Date(segment.date);
          const dateOrig = this.createDateAsUTC(localDate);
          {
            /* console.log('localData ', localDate);
        console.log('correctData ', dateOrig); */
          }
          const dateDest = addMinutes(dateOrig, segment.duration);
          const [durationHours, durationMinutes] = this.calculateDuration(
            segment.duration
          );
          const dateDuration = new Date(
            2020,
            0,
            1,
            durationHours,
            durationMinutes
          );
          {
            /* console.log('duration ', segment.duration);
        console.log('dateDest', dateDest);
        console.log(segment.stops.join(',')); */
          }

          return (
            <div className="tickets-item__info">
              <p>
                <span>
                  {segment.origin} - {segment.destination}
                </span>
                <span>
                  {this.formatDate(dateOrig, ":")} -{" "}
                  {this.formatDate(dateDest, ":")}
                </span>
              </p>
              <p>
                <span>В ПУТИ</span>
                <span>{`${durationHours}ч ${durationMinutes}м`}</span>
              </p>
              <p>
                <span>ПЕРЕСАДКИ</span>
                <span>{segment.stops.join(",")}</span>
              </p>
            </div>
          );
        })}
      </li>
    );
  };

  render() {
    console.log("Компонент рендерится");
    const { tickets } = this.props;

    console.log("tickets from component TicketsList ", tickets);

    return (
      <div className="tickets-schedule">
        <ul className="tickets-list">{tickets.map(this.renderTicket())}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TicketsList);
