import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchThread, saveAnswer} from '../actions/forum'
import Loading from '../components/common/Loading'
import Header from '../components/common/Header'
import Headline from '../components/common/Headline'
import Content from '../components/common/Content'
import Text from '../components/common/Text'
import styled from 'styled-components'
import Answer from '../components/Answer'
import TextAreaForm from '../components/TextAreaForm'
import InformationHeader from '../components/common/InformationHeader'

const StyledText = styled(Text)`
  color: rgb(145, 145, 145) !important;
`

class Thread extends Component {
  componentDidMount() {
    const {postId} = this.props.match.params
    this.props.getThread(postId)
  }

  onSaveAnswer(answer) {
    console.log('Adding an answer...')
    this.props.saveAnswer({answer, postId: this.props.match.params.postId})
  }

  render() {
    const {thread} = this.props
    return (
      <Content>
        {!Object.keys(thread).length ? (
          <Loading />
        ) : (
          <div>
            <InformationHeader
              showUnderline
              fadedTextStyle={'italic'}
              mainText={`${thread.creator} asked -`}
              fadedText={thread.title}
            />
            <div
              style={{
                minHeight: 512,
              }}
            >
              {thread.posts.length ? (
                thread.posts.map((answer, i) => (
                  <Answer {...answer} key={i} />
                ))
              ) : (
                <Headline>
                  There are currently no answers for this post, be the first
                  one!
                </Headline>
              )}
            </div>

            <TextAreaForm
              buttonValue='Save Answer'
              placeholderValue="Type thread post here."
              onClickAction={this.onSaveAnswer.bind(this)}
            />
          </div>
        )}
      </Content>
    )
  }
}

export default connect(
  ({forum}) => ({
    thread: forum.thread,
  }),
  dispatch => ({
    getThread: postId => dispatch(fetchThread(postId)),
    saveAnswer: answerDetails => dispatch(saveAnswer(answerDetails)),
  }),
)(Thread)
