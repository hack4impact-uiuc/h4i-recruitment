import initialState from '../reducers/initialState.js'

const STATE_STORAGE = 'recruitment_tool_state'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_STORAGE)
    if (serializedState === undefined || serializedState === null) {
      localStorage.setItem(STATE_STORAGE, initialState)
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return initialState
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STATE_STORAGE, serializedState)
  } catch (err) {
    // fill
  }
}
