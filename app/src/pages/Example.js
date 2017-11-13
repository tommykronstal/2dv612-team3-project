import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateText, updateWelcomeMessage} from '../actions/example'
import {setStatus} from '../actions/status'
import Content from '../components/Content'
import Input from '../components/Input'
import Button from '../components/Button'
import Title from '../components/Title'
import Text from '../components/Text'

// Maps the state to App component properties
function mapStateToProps({example}) {
  return example
}

// Maps functions to update state to properties
function mapDispatchToProps(dispatch) {
  return {
    updateText: text => dispatch(updateText(text)),
    updateWelcomeMessage: () => dispatch(updateWelcomeMessage()),
    setStatus: message => dispatch(setStatus(message)),
    updateText: text => dispatch(updateText(text)),
  }
}

class Example extends Component {
  render() {
    {
      const {text, updateText, message, setStatus} = this.props
      return (
        <Content>
          <Title center>
            Result from server<br />
            {message}
          </Title>
          <Text center>
            {!text ? 'This will change when you write.' : text}
          </Text>
          <Input
            type="text"
            value={text}
            label="Some text there"
            onChange={e => updateText(e.target.value)}
          />
          <Button primary onClick={() => setStatus(text || 'Success')}>
            Set Status
          </Button>
        </Content>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)
