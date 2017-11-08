import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {someText: ''}
  }

  render() {
    const { someText } = this.state
    const text = !someText ? 'This will change when you write.' : someText
    return (
      <div>
        <p>{text}</p>
        <input type='text' placeholder='Some text here' onChange={e => this.setState({someText: e.target.value})} />
      </div>
    )
  }
}

export default App;
