import React from 'react';
import "./App.css";
import Logo from './components/Logo/Logo';
import Tickets from './components/Tickets/Tickets';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <Tickets />
      </div>
    );
  }
}

export default App;
