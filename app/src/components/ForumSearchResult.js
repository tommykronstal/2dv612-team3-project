import React, {Component} from 'react'
import {connect} from 'react-redux'
import Section from '../components/common/Section'
import Title from '../components/common/Title'
import List from '../components/common/List'
import Item from '../components/common/ListItem'
import styled from 'styled-components'
import Link from '../components/common/Link'
import A from '../components/common/A'
import Loading from './common/Loading'

const InfoItem = styled(Item)`
  color: gray;
  font-style: italic;
`

export default connect(state => ({
  searchResults: state.forum.searchResults,
}))(({searchResults}) => {
  return (
    <Section>
      <Title>Search Results</Title>

      {searchResults.length ? (
        searchResults.slice(0, 150).map(({item: {...props}}, i) => {
          return 'posts' in props ? (
            <Presentation
              mainText={props.title}
              infoText={`Thread with ${props.posts.length} posts.`}
              location={`/user/forum/thread/${props._id}`}
            />
          ) : (
            <Presentation
              mainText={`${props.text.substr(0, 30)}...`}
              infoText={`Thread Answer`}
              location={`/user/forum/thread/${props.threadId}`}
            />
          )
        })
      ) : (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Loading />
        </div>
      )}
    </Section>
  )
})

const Presentation = ({mainText, infoText, location}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgb(240, 240, 240)'
      }}
      className="presentation-container"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        className="right-section"
      >
        <InfoItem>{infoText}</InfoItem>
        <Item>{mainText}</Item>
      </div>
      <div className="left-section">
        <Link to={location}>View forum entry</Link>
      </div>
    </div>
  )
}
