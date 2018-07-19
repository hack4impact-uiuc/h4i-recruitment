import initialState from '../reducers/initialState.js'

const STATE_STORAGE = 'recruitment_tool_state'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_STORAGE)
    if (serializedState === undefined || serializedState === null) {
      localStorage.setItem(STATE_STORAGE, initialState)
      return initialState
    }
    let savedState = JSON.parse(serializedState)
    initialState.facemash.candidates = savedState.facemash.candidates
    initialState.facemash.matchID = savedState.facemash.matchID
  } catch (err) {
    console.log('Unable to load data from Local Storage')
    return initialState
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STATE_STORAGE, serializedState)
  } catch (err) {
    console.log('Unable to save data to Local Storage')
  }
}
