import { createSelector } from 'reselect';

export const getTickets = (state) => state.tickets.allTickets;
export const getProfitableFilterName = (state) => state.tickets.profitableFilterName;
export const getTransplantsValues = (state) => state.tickets.transplantsFilterValues;


export const filteredTicketsSelector = createSelector(
    [getTickets,
    getProfitableFilterName,
    getTransplantsValues],
    (tickets, filterName, transplantsValues) => {

        const ticketsSortedByTransplants = transplantsValues.reduce( (acc, value) => {
            return tickets.filter( (ticket) => {
                // console.log('THIS IS TICKET', ticket);
                const allTicketTransplants = ticket.segments.reduce ( (acc, segment) => [...acc, segment.stops.length], []);
                // console.log(allTicketTransplants);
                return allTicketTransplants.every( (t) => t === value);
            })
        }, []);

        console.log('tttttttttttttttttttttttttt', ticketsSortedByTransplants);




        switch (filterName) {
            case 'all':
                console.log("Сейчас все билеты")
                return ticketsSortedByTransplants
            case 'cheapest':
                console.log("Сейчас дешевые билеты билеты")
                return ticketsSortedByTransplants.slice().sort((t1, t2) => t1.price - t2.price);
            case'fastest':
                return ticketsSortedByTransplants.slice().sort((t1, t2) => {
                    const t1Duration = t1.segments.reduce((acc, segment) => acc + segment.duration, 0);
                    const t2Duration = t2.segments.reduce((acc, segment) => acc + segment.duration, 0);
                    return t1Duration - t2Duration;
                });
            default:
                return tickets;
            
        }
        
    }
);