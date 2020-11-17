import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tickets = handleActions(
  {
    [actions.fetchTicketsSuccess](state, { payload: { tickets } }) {
      console.log(tickets);
      return {
        ...state,
        allTickets: tickets,
      };
    },
    [actions.setTicketsProfitableFilter](state, { payload: { filterName } }) {
      console.log('newFilterName ', filterName);
      return { ...state, profitableFilterName: filterName };
    },
    [actions.setTicketsTransplantsFilter](
      state,
      { payload: { name, checked } }
    ) {
      console.log(name);
      console.log(checked);
      return {
        ...state,
        transplantsFilterValues: {
          ...state.transplantsFilterValues,
          [name]: checked,
        },
      };
    },
  },
  {
    allTickets: [],
    profitableFilterName: 'all',
    transplantsFilterValues: { all: true, 1: false, 2: false, 3: false },
  }
);

export default combineReducers({
  tickets,
});
