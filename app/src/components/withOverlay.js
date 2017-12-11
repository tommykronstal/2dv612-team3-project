import React, {Component} from 'react'
export const withOverlay = (WrappedComponent, ...parentProps) =>
  class extends Component {
    state = {
      displayOverlay: false,
    }

    toggleOverlay = () =>
      this.setState({displayOverlay: !this.state.displayOverlay})

    render() {
      return (
        <WrappedComponent
          {...{
            ...this.props,
            ...parentProps,
            toggleOverlay: () => this.toggleOverlay(),
            displayOverlay: this.state.displayOverlay,
          }}
        />
      )
    }
  }
