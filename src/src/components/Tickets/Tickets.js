import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProfitableFilters from './ProfitableFilters.js'
import TransplantsFilters from './TransplantsFilters.js';
import TicketsList from './TicketsList.js';


class Tickets extends React.Component {

  render () {
  
    return (
      <section className="tickets">
          <div className="container">
              <div className="tickets-block">
                <ProfitableFilters/>
                <TransplantsFilters/>
                <TicketsList/>
              </div>
          </div>
      </section>
    );

  };
  
}

export default connect(null, null)(Tickets);