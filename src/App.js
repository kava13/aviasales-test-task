import React from 'react';
import axios from 'axios';
import { Counter } from './features/counter/Counter';
import './App.css';
import TicketsList from './components/TicketsList';

class App extends React.Component {

  constructor() {
    super();
  }


  render () {
    console.log(this.props);
    

    return (
      <div className="App">
        <TicketsList/>
      </div>
    );

  };
  
}

export default App;
