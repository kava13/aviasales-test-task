import axios from 'axios';
import { createAction } from 'redux-actions';

export const getTickets = createAction('TICKETS_GET');

export const fetchTiskets = (state) => async (dispatch) => {
    const response = await axios.get('https://front-test.beta.aviasales.ru/search');
    const searchId = response.data.searchId;
    const response2 = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    console.log(response2.data);
    dispatch(getTickets({tickets: response2.data.tickets}));
    
  }