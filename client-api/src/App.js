import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const AppContext = React.createContext('light');
const api = '/api/mandelbrot?zoom=%s1&ShiftX=%s2&ShiftY=%s3';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      shiftX: 0,
      shiftY:0
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://localhost:8081/api/mandelbrot?zoom=2&ShiftX=200&ShiftY=10" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >

            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
