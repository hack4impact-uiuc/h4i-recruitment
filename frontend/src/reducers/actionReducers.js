import initialState from './initialState.js'
import {
  NEW_MATCH,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER
} from '../actions/actionTypes'

export default function recruitmentApp(state = initialState, action) {
  switch (action.type) {
    case NEW_MATCH:
      return {
        ...state,
        ['candidates']: action.candidates
      }
    case FETCH_CANDIDATES_BEGIN:
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          candidatesLoading: true
        }
      }
    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          candidatesLoading: false,
          candidates: action.payload
        }
      }
    case FETCH_CANDIDATES_FAILURE:
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          candidatesLoading: false,
          candidatesError: action.payload
        }
      }
    case ADD_FILTER:
      let { category, filter } = action.payload
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          filters: {
            category: [...state.candidateListPage.filters.category, filter]
          }
        }
      }
    case REMOVE_FILTER:
      console.log(action)
      category = action.payload[category]
      filter = action.payload[filter]
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          filters: {
            ...state.candidateListPage.filters,
            category: state.candidateListPage.filters[category].filter(e => e != filter)
          }
        }
      }
    default:
      return {
        ...state
      }
  }
}
