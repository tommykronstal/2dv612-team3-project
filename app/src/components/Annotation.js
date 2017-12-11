import React, {Component} from 'react'
import styled from 'styled-components'
import Button from './common/Button'
import {connect} from 'react-redux'
import { updateAnnotation } from '../actions/annotation';

const AnnotationContainer = styled.div`
  height: 412px;
  width: 750px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
`

class Annotation extends Component {
  constructor(props) {
    super(props)
    this.state = {annotation: this.props.annotation || ''}
  }

  saveAnnotation = () => {
    this.props.updateAnnotation(this.state.annotation, this.props.materialId)
    this.props.toggleOverlay()
  }

  render() {
    console.log(this.props)
    const {annotation} = this.state
    return (
      <AnnotationContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 2,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <textarea
              placeholder={'Write a annotation for the product here.'}
              style={{
                height: 256,
                width: 600,
                display: 'flex',
                justifyContent: 'flex-start',
                fontFamily: 'Helvetica',
                padding: 4,
                resize: 'none'
              }}
              onChange={e => this.setState({annotation: e.target.value})}
              value={annotation}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button primary onClick={() => this.props.toggleOverlay()}>
              Cancel
            </Button>
            <Button primary onClick={() => this.saveAnnotation()}>
              Save
            </Button>
          </div>
        </div>
      </AnnotationContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateAnnotation: (annotationText, materialId) => dispatch(updateAnnotation(annotationText, materialId))
})

/**
 * Not sure what is needed here yet
 */
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps, mapDispatchToProps)(Annotation)
// export default Annotation
