import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tickets = handleActions({
    [actions.fetchTicketsSuccess](state, { payload: { tickets } }) {
        console.log(tickets);
        return { 
          ...state,
          allTickets: tickets
        }
    },
    [actions.setTicketsProfitableFilter](state, { payload: { filterName } }) {
      console.log('newFilterName ', filterName);
      return { ...state,
        profitableFilterName: filterName
      }
    }

  }, { allTickets: [], profitableFilterName: 'all', transplantsFilterValues: ['all', 3]});

export default combineReducers({
    tickets,
  });