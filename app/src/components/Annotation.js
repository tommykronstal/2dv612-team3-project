import React, {Component} from 'react'
import styled from 'styled-components'
import Button from './common/Button'

const AnnotationContainer = styled.div`
  height: 412px;
  width: 750px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

class Annotation extends Component {
  constructor(props) {
    super(props)
    this.state = {annotation: this.props.annotation || ''}
  }

  saveAnnotation = () => {
    console.log('saving', this.state.annotation)
  }

  render() {
    const {annotation} = this.state
    return (
      <AnnotationContainer className="annotation-container">
        <div
          className="top-section"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 2,
          }}
        >
          <div
            className="editing"
            style={{display: 'flex', justifyContent: 'flex-start'}}
          >
            <textarea
              placeholder={'Write a annotation for the product here.'}
              style={{
                height: 256,
                width: 600,
                display: 'flex',
                justifyContent: 'flex-start',
                fontFamily: 'Helvetica',
                padding: 4,
              }}
              onChange={e => this.setState({annotation: e.target.value})}
              value={annotation}
            />
          </div>
        </div>
        <div className="bottom-section">
          <div
            className="button-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button primary onClick={() => this.props.toggleOverlay()}>
              Cancel
            </Button>
            <Button
              primary
              onClick={() => this.saveAnnotation()}
            >
              Save
            </Button>
          </div>
        </div>
      </AnnotationContainer>
    )
  }
}

export default Annotation

{
  /* <input
type={'text'}
value={annotation}
onChange={e => this.setState({annotation: e.target.value})}
/> */
}
