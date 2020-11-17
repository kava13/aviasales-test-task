import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../../css/profitableFilters.css";

import * as actions from "../../actions/index.js";
import cn from "classnames";

import { getProfitableFilterName } from "../../selectors/index.js";

const mapStateToProps = (state) => {
  const props = {
    profitableFilterName: getProfitableFilterName(state),
  };
  return props;
};

const actionCreators = {
  setTicketsProfitableFilter: actions.setTicketsProfitableFilter,
};

class ProfitableFilters extends React.Component {
  handleSetTicketsProfitableFilter = (filterName) => () => {
    const { setTicketsProfitableFilter, profitableFilterName } = this.props;
    filterName = filterName === profitableFilterName ? "all" : filterName;
    setTicketsProfitableFilter({ filterName });
  };

  render() {
    const { profitableFilterName } = this.props;

    const buttonLeftStyle = cn("tickets-button", {
      "tickets-button__left": true,
      "tickets-button__active": profitableFilterName === "cheapest",
    });

    const buttonRightStyle = cn("tickets-button", {
      "tickets-right": true,
      "tickets-button__active": profitableFilterName === "fastest",
    });

    return (
      <div className="tickets-buttons">
        <button
          className={buttonLeftStyle}
          onClick={this.handleSetTicketsProfitableFilter("cheapest")}
        >
          САМЫЕ ДЕШЕВЫЕ
        </button>
        <button
          className={buttonRightStyle}
          onClick={this.handleSetTicketsProfitableFilter("fastest")}
        >
          САМЫЕ БЫСТРЫЕ
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ProfitableFilters);
