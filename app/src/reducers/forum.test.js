import reducer, {initialState} from './forum'
import {SET_FORUM_THREADS, SET_THREAD, ADD_ANSWER} from '../actions/types'

describe('Forum reducer test', () => {
  it('Should return default state when case for action is missing', () => {
    const action = {type: 'This-action-is-not-present'}
    const state = {foo: 1}

    expect(reducer(state, action)).toEqual(state)
  })

  it('Should return defaultstate when no action or state is provided', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('Should update threads when threads are added', () => {
    const threads = [
      {title: 'Fake Thread Title 1'},
      {title: 'Fake Thread Title 2'},
    ]
    const result = reducer(initialState, {type: SET_FORUM_THREADS, threads})
    expect(result.threads).toEqual(threads)
  })

  it('Should add a new thread when provided with action and thread', () => {
    const thread = {title: 'I am a thread title'}
    const result = reducer(initialState, {type: SET_THREAD, thread})
    expect(result.thread).toEqual(thread)
  })

  it('Should add answer to thread when provided', () => {
    const thread = {answers: [{name: 'Kalle', answer: 'Answer one'}]}
    const answer = {name: 'Superman', answer: 'Answer two'}
    const result = reducer(
      {thread: {answers: [{name: 'Kalle', answer: 'Answer one'}]}},
      {
        type: ADD_ANSWER,
        answer,
      },
    )

    expect(result.thread.answers.length).toEqual(2)
  })
})
