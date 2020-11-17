import { createSelector } from "reselect";
import * as _ from "lodash";

export const getTickets = (state) => state.tickets.allTickets;
export const getProfitableFilterName = (state) =>
  state.tickets.profitableFilterName;
export const getTransplantsValues = (state) =>
  state.tickets.transplantsFilterValues;

export const getTransplantsSelector = createSelector(
  [getTransplantsValues],
  (transplantsValues) => {
    let trueValues = Object.keys(transplantsValues).filter(
      (key) => transplantsValues[key] === true
    );

    if (trueValues.includes("all") || trueValues.length === 0) {
      trueValues = [0, 1, 2, 3];
    } else {
      trueValues = trueValues.map((item) => Number(item));
    }
    return trueValues;
  }
);

export const filteredTicketsSelector = createSelector(
  [getTickets, getProfitableFilterName, getTransplantsSelector],
  (tickets, filterName, transplants) => {
    let ticketsSortedByTransplants = [];

    if (transplants.length !== 4) {
      ticketsSortedByTransplants = tickets.filter((ticket) => {
        const allTicketTransplants = ticket.segments.reduce(
          (acc, segment) => [...acc, segment.stops.length],
          []
        );

        let ticketIsCorrect = false;

        for (let i = 0; i < allTicketTransplants.length; i++) {
          if (transplants.indexOf(allTicketTransplants[i]) === -1) {
            ticketIsCorrect = false;
            break;
          } else {
            ticketIsCorrect = true;
          }
        }
        return ticketIsCorrect;
      });
    } else {
      ticketsSortedByTransplants = tickets;
    }

    switch (filterName) {
      case "all":
        return ticketsSortedByTransplants;
      case "cheapest":
        return ticketsSortedByTransplants
          .slice()
          .sort((t1, t2) => t1.price - t2.price);
      case "fastest":
        return _.sortBy(ticketsSortedByTransplants.slice(), (item) => {
          const duration = item.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0
          );
          return duration;
        });
      default:
        return tickets;
    }
  }
);
