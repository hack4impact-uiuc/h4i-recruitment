import { NEW_MATCH } from './actionTypes.js'

// Action Creators

// Function to create action that stores data about new match
function newMatch(candidate1, candidate2, match_id) {
  return {
    type: NEW_MATCH,
    candidates: [candidate1, candidate2],
    matchID: match_id
  }
}

export function generateMatchData(candidate1, candidate2, match_id) {
  return dispatch => dispatch(newMatch(candidate1, candidate2, match_id))
}
