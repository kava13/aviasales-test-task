import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../actions/index.js';

const actionCreators = {
    setTicketsProfitableFilter: actions.setTicketsProfitableFilter,
  };
  
class ProfitableFilters extends React.Component {

    handleSetTicketsProfitableFilter = (filterName) => () => {
        const { setTicketsProfitableFilter } = this.props;
        setTicketsProfitableFilter({ filterName });
    }

  render () {
  
    return (
      <div className="tickets-buttons">
          <button className="tickets-button" onClick={this.handleSetTicketsProfitableFilter('cheapest')}>ДЕШЕВЫЕ</button>
          <button className="tickets-button" onClick={this.handleSetTicketsProfitableFilter('fastest')}>БЫСТРЫЕ</button>
      </div>
    );

  };
  
}

export default connect(null, actionCreators)(ProfitableFilters);