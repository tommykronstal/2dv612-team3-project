
const initialState = {
  threads: [
    {
      _id: 'rgiit904kpoegkeop',
      title: 'Question about an iphone?',
      user: {
        firstName: 'john'
      }
    },
    {
      _id: 'dir392ir9032i0g',
      title: 'Question about something else',
      user: {
        firstName: 'paul'
      }
    }
  ]
}

export default function forum (state = initialState, action = {}) {
  switch (action.type) {
  case '':
    return {
      ...state
    }
  default:
    return state
  }
}
