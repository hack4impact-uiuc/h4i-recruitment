import {
  NEW_MATCH,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_STATUS,
  RESET_FILTERS
} from './actionTypes.js'
import { getAllCandidates } from '../utils/api'
// Action Creators

export const fetchCandidatesFailure = error => ({ type: FETCH_CANDIDATES_FAILURE, payload: error })
export const fetchCandidatesBegin = () => ({ type: FETCH_CANDIDATES_BEGIN })
export const setStatus = (candidateId, status) => ({
  type: SET_STATUS,
  payload: {
    candidateId: candidateId,
    status: status
  }
})
export const fetchCandidatesSuccess = candidates => ({
  type: FETCH_CANDIDATES_SUCCESS,
  payload: candidates
})
export const addFilter = (category, filter) => ({
  type: ADD_FILTER,
  payload: {
    category: category,
    filter: filter
  }
})

export const resetFilters = () => ({
  type: RESET_FILTERS
})

export const removeFilter = (category, filter) => ({
  type: REMOVE_FILTER,
  payload: {
    category: category,
    filter: filter
  }
})
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

export const fetchCandidates = () => {
  return dispatch => {
    dispatch(fetchCandidatesBegin())
    return getAllCandidates()
      .then(json => {
        dispatch(fetchCandidatesSuccess(json.result))
      })
      .catch(error => dispatch(fetchCandidatesFailure(error)))
  }
}
