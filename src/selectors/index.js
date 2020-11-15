import { createSelector } from 'reselect';
import * as _ from 'lodash';

export const getTickets = (state) => state.tickets.allTickets;
export const getProfitableFilterName = (state) => state.tickets.profitableFilterName;
export const getTransplantsValues = (state) => state.tickets.transplantsFilterValues;

export const getTransplantsSelector = createSelector(
    [getTransplantsValues],
    (transplantsValues) => {
        let trueValues = Object.keys(transplantsValues).filter( (key) => transplantsValues[key] === true);

        if (trueValues.includes('all') || trueValues.length === 0) {
            trueValues = [1, 2, 3]
        } else {
            trueValues = trueValues.map( (item) => Number(item));
        }
        return trueValues;
    }
)


export const filteredTicketsSelector = createSelector(
    [getTickets,
    getProfitableFilterName,
    getTransplantsSelector],
    (tickets, filterName, transplants) => {

        console.log('ПРОВЕРЯЕМ', transplants);
        
        let ticketsSortedByTransplants = [];

        
        
        if (transplants.length !== 3) {
            ticketsSortedByTransplants = transplants.reduce( (acc, value) => {
                return tickets.filter( (ticket) => {
                    // console.log('THIS IS TICKET', ticket);
                    const allTicketTransplants = ticket.segments.reduce ( (acc, segment) => [...acc, segment.stops.length], []);
                    // console.log(allTicketTransplants);
    
                    let ticketIsCorrect = false;
                    
                    for (let i = 0; i < allTicketTransplants.length; i++) {
                        if (transplants.indexOf(allTicketTransplants[i])  === -1) {
                            ticketIsCorrect = false;
                            break;
                        } else {
                            ticketIsCorrect = true;
                        }
                    }
    
                    // console.log('ticketIsCorrect', ticketIsCorrect);
    
                    return ticketIsCorrect;
                    
    
                    // return allTicketTransplants.every( (t) => t === value);
                })
            }, []);
        } else {
            ticketsSortedByTransplants = tickets;
        }
        

        console.log('tttttttttttttttttttttttttt', ticketsSortedByTransplants);


        switch (filterName) {
            case 'all':
                console.log("Сейчас все билеты")
                return ticketsSortedByTransplants
            case 'cheapest':
                console.log("Сейчас дешевые билеты билеты")
                return ticketsSortedByTransplants.slice().sort((t1, t2) => t1.price - t2.price);
            case'fastest':
                return _.sortBy(ticketsSortedByTransplants.slice(), (item) => {
                    const duration = item.segments.reduce((acc, segment) => acc + segment.duration, 0);
                    console.log('Duration of Ticket', duration);
                    return duration;
                })

                
            default:
                return tickets;
            
        }
        
    }
);