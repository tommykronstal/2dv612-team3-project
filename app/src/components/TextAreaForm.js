import React, {Component} from 'react'
import Button from '../components/common/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  margin: 0px !important;
`

class TextAreaForm extends Component {
  state = {
    value: '',
  }

  render() {
    return (
      <div>
        <textarea
          style={{width: 352, height: 100, fontFamily: 'Helvetica'}}
          placeholder={this.props.placeholderValue}
          value={this.state.value}
          onChange={e =>
            this.setState({
              value: e.target.value,
            })
          }
        >
        </textarea>
        <StyledButton
          disabled={!this.state.value}
          primary
          onClick={() => {
            if (!this.state.value) return
            this.setState(() => ({value:  ''}))
            this.props.onClickAction(this.state.value)}}
        >
          {this.props.buttonValue}
        </StyledButton>
      </div>
    )
  }
}

export default TextAreaForm
