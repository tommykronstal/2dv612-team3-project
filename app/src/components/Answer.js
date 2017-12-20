import React from 'react'
import MaterialIcon from 'material-icons-react'
import Text from './common/Text'
import Headline from './common/Headline'
import {format} from 'date-fns'

export default ({isRepresentative, text, user: {firstName}, date}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 8,
        wordBreak: 'break-all',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: 12,
      }}
      className="answer-container"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <div
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
          className="answer-user-details"
        >
          <Headline style={{fontSize: 14}}>{firstName} - </Headline>
          <Headline
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgb(140, 140, 140)',
              marginLeft: 8,
            }}
          >
            {format(new Date(date), 'MM/DD hh:mm')}
          </Headline>
        </div>
        <div
          style={{marginLeft: 4, display: 'flex', alignItems: 'center'}}
          className="is-rep-container"
        >
          {isRepresentative && (
            <MaterialIcon
              icon="check_circle"
              color="rgb(110,160,220)"
              size={20}
            />
          )}
        </div>
      </div>
      <div className="user-answer-container">
        <Text>{text}</Text>
      </div>
    </div>
  )
}
