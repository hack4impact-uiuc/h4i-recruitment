import {
  NEW_MATCH,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER
} from './actionTypes.js'
import { getAllCandidates } from '../utils/api'
// Action Creators

export const fetchCandidatesFailure = error => ({ type: FETCH_CANDIDATES_FAILURE, payload: error })
export const fetchCandidatesBegin = () => ({ type: FETCH_CANDIDATES_BEGIN })
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
export const removeFilter = (category, filter) => ({
  type: REMOVE_FILTER,
  payload: {
    category: category,
    filter: filter
  }
})
// Function to create action that stores data about new match
function newMatch(id_1, id_2) {
  return {
    type: NEW_MATCH,
    candidates: [id_1, id_2]
  }
}

export function generateMatchData(id_1, id_2) {
  return dispatch => dispatch(newMatch(id_1, id_2))
}

export const fetchCandidates = () => {
  return dispatch => {
    dispatch(fetchCandidatesBegin())
    return getAllCandidates()
      .then(json => {
        console.log(json)
        dispatch(fetchCandidatesSuccess(json.result))
      })
      .catch(error => dispatch(fetchCandidatesFailure(error)))
  }
}
