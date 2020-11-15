import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProfitableFilters from './ProfitableFilters.js'
import TransplantsFilters from './TransplantsFilters.js';
import TicketsList from './TicketsList.js';

import '../../css/tickets.css';


class Tickets extends React.Component {

  render () {
  
    return (
      <section className="tickets">
          <div className="container">
              <div className="tickets-block">
                <TransplantsFilters/>
                <div className="tickets-info">
                  <ProfitableFilters/>
                  <TicketsList/>
                </div>
              </div>
          </div>
      </section>
    );

  };
  
}

export default connect(null, null)(Tickets);