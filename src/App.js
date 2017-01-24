import React, { Component } from 'react';
import Matchbox, { Match } from './Matchbox';
import matchboxPicture from './img/matchbox.png';
import './App.css';

class App extends Component {
  render() {
    let matchboxes = [9, 8, 12];
    return (
      <div className="App">
        <AppHeader/>
        <div className="App-intro">
          {matchboxes.map((val, index) => 
            <Matchbox key={index}
              value={val} />
          )}
          {[...Array(10)].map((x, i) =>
            <Match key={i + 1} />
          )}
        </div>
      </div>
    );
  }
}

function AppHeader(props) {
  return (
    <div className="App-header">
      <img src={matchboxPicture} className="App-logo" alt="logo" />
      <Title text="Matchbox"/>
    </div>
  );
}

function Title(props) {
  return <h1>{props.text}</h1>;
}

export default App;
