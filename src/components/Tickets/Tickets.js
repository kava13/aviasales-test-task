import React from 'react';
import { connect } from 'react-redux';

import ProfitableFilters from './ProfitableFilters';
import TransplantsFilters from './TransplantsFilters';
import TicketsList from './TicketsList';

import '../../css/tickets.css';

class Tickets extends React.Component {
  render() {
    return (
      <section className="tickets">
        <div className="container">
          <div className="tickets-block">
            <TransplantsFilters />
            <div className="tickets-info">
              <ProfitableFilters />
              <TicketsList />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, null)(Tickets);
