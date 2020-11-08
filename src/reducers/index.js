import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tickets = handleActions({
    [actions.getTickets](state, { payload: { tickets } }) {
        console.log(tickets);
        return tickets
    }
  }, []);

export default combineReducers({
    tickets,
  });