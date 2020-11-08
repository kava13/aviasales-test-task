import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


const mapStateToProps = (state) => {
    const props = {
        tickets: state.tickets
    }
    return props;
}

class TicketsList extends React.Component {

  


  render () {
    const { tickets } = this.props;
    

    return (
      <div className="tickets">
        ff
      </div>
    );

  };
  
}

export default connect(mapStateToProps, null)(TicketsList);