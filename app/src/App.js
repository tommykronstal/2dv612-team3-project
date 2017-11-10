import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { updateText } from './actions/example';

// Maps the state to App component properties
function mapStateToProps ({example}) {
  return example;
}

// Maps functions to update state to properties
function mapDispatchToProps (dispatch) {
  return {
    updateText: (text) => dispatch(updateText(text))
  };
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      backendResponse: ''
    }
  }

  componentDidMount() {
    fetch('/api')
      .then(result => result.json())
      .then(result => this.setState({ backendResponse: result.message }))
      .catch(console.error);
  }

  render() {
    // Received from react-redux connect
    const { text, updateText, counter } = this.props

    return (
      <div>
        <h1>Result from server: {this.state.backendResponse}</h1>
        <p>{!text ? 'This will change when you write.' : text}</p>
        <input type='text' placeholder='Some text there' onChange={e => updateText(e.target.value)} />
        <p>Number of edits: {counter}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
