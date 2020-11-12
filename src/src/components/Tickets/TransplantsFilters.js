import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../actions/index.js';

const actionCreators = {
    setTicketsProfitableFilter: actions.setTicketsProfitableFilter,
  };
  
class TransplantsFilters extends React.Component {

  handleChange = (value) => (event) => {
    console.log(value);
  }
  

    renderCheckboxes = () => {
      const checkboxes = [ {text: 'Все', value: 'all'}, {text: '1 пересадка', value: 1 }, {text: '2 пересадки', value: 2 }, {text: '3 пересадки', value: 3 },];

      return checkboxes.map( (item) => {
        return (
          <label>
            <input type='checkbox' onChange={this.handleChange(item.value)}></input>
            {item.text}
          </label>
        );
      })
    }

  render () {
  
    return (
      
      <div className="tickets-transplants">
      {this.renderCheckboxes()}
      </div>
    );

  };
  
}

export default connect(null, actionCreators)(TransplantsFilters);