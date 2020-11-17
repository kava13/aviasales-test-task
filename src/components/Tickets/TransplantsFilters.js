import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import * as actions from "../../actions/index.js";

import "../../css/transplantsFilters.css";

const mapStateToProps = (state) => {
  const props = {
    transplantsFilterValues: state.tickets.transplantsFilterValues,
  };
  return props;
};

const actionCreators = {
  setTicketsProfitableFilter: actions.setTicketsProfitableFilter,
  setTicketsTransplantsFilter: actions.setTicketsTransplantsFilter,
};

class TransplantsFilters extends React.Component {
  handleChange = () => (event) => {
    console.log("event!!!", event);
    const { setTicketsTransplantsFilter } = this.props;
    const name = event.target.name;
    const checked = event.target.checked;
    setTicketsTransplantsFilter({ name, checked });
  };

  renderCheckboxes = () => {
    const { transplantsFilterValues } = this.props;
    console.log("checkedItemssssssssssssss", transplantsFilterValues);

    const checkboxes = [
      { text: "Все", name: "all" },
      { text: "Без пересадок", name: 0 },
      { text: "1 пересадка", name: 1 },
      { text: "2 пересадки", name: 2 },
      { text: "3 пересадки", name: 3 },
    ];

    return checkboxes.map((item) => {
      return (
        <label>
          <input
            type="checkbox"
            checked={transplantsFilterValues[item.name]}
            name={item.name}
            onChange={this.handleChange()}
          ></input>
          <span className="tickets-transplants__checkbox"></span>
          {item.text}
        </label>
      );
    });
  };

  render() {
    return (
      <div className="tickets-transplants">
        <span className="tickets-transplants__text">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        {this.renderCheckboxes()}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(TransplantsFilters);
