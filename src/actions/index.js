import axios from 'axios';
import { createAction } from 'redux-actions';

export const fetchTicketsSuccess = createAction('TICKETS_GET');
export const setTicketsProfitableFilter = createAction(
  'TICKETS_PROFITABLE_FILTER_SET'
);
export const setTicketsTransplantsFilter = createAction(
  'TICKETS_TRANSPLANTS_FILTER_SET'
);

export const fetchTiskets = () => async (dispatch) => {
  const responseSearchId = await axios.get(
    'https://front-test.beta.aviasales.ru/search'
  );
  const { searchId } = responseSearchId.data;
  const responseData = await axios.get(
    `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
  );
  const { tickets } = responseData.data;
  dispatch(fetchTicketsSuccess({ tickets: tickets }));
};
