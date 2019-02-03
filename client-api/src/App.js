import React, { Component } from 'react';
import './App.css';

import ImageForm from './components/ImageForm';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <ImageForm/>
      </div>
    );
  }
}

export default App;
