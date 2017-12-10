import React, {Component} from 'react'
import styled from 'styled-components'
import Button from './common/Button'

const AnnotationContainer = styled.div`
  height: 512px;
  width: 750px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

class Annotation extends Component {
  constructor(props) {
    super(props)
    this.state = {annotation: this.props.annotation || '', isEditing: false}
  }

  render() {
    const {isEditing, annotation} = this.state
    return (
      <AnnotationContainer className="annotation-container">
        <div className="top-section">
          {!isEditing ? (
            <div
              onClick={e => {
                e.stopPropagation()
                this.setState({isEditing: !isEditing})
              }}
              className="passive-layout"
            >
              <p>{annotation}</p>
            </div>
          ) : (
            <div className="editing">
              <input
                type={'text'}
                value={annotation}
                onChange={e => this.setState({annotation: e.target.value})}
              />
            </div>
          )}
        </div>
        <div className='bottom-section'>
          <div className='button-container' style={{
            display: 'flex',
            justifyContent: 'space-between',
            // height: 56,
          }}>
          <Button primary  onClick={() => this.props.toggleOverlay()}>
            Cancel
          </Button>
          <Button primary onClick={() => console.log('Save if updated here...')}>
            Save
          </Button>
          </div>
        </div>
      </AnnotationContainer>
    )
  }
}

export default Annotation
