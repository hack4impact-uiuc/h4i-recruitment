import * as action from './actionTypes.js'

// Action Creators

// Function to create action that stores data about new match
function newMatch(id_1, id_2) {
  return {
    type: action.NEW_MATCH,
    candidates: [id_1, id_2]
  }
}

export function generateMatchData(id_1, id_2) {
  return dispatch => dispatch(newMatch(id_1, id_2))
}
