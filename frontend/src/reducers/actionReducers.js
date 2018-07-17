import initialState from './initialState.js'
import {
  NEW_MATCH,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_STATUS,
  RESET_FILTERS
} from '../actions/actionTypes'
import { yearsenum, statusenum, rolesenum } from '../utils/enums'

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
      let addCategory = action.payload.category
      let addFilter = action.payload.filter
      console.log(action.payload)
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          filters: {
            ...state.candidateListPage.filters,
            [addCategory]: [...state.candidateListPage.filters[addCategory], addFilter]
          }
        }
      }
    case REMOVE_FILTER:
      let deleteCategory = action.payload.category
      let deleteFilter = action.payload.filter
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          filters: {
            ...state.candidateListPage.filters,
            [deleteCategory]: state.candidateListPage.filters[deleteCategory].filter(
              e => e != deleteFilter
            )
          }
        }
      }
    case SET_STATUS:
      const { candidateId, status } = action.payload
      const newCandidates = state.candidateListPage.candidates.map(el => {
        if (el._id == candidateId) {
          return {
            ...el,
            status: status
          }
        }
        return el
      })
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          candidates: newCandidates
        }
      }
    case RESET_FILTERS:
      return {
        ...state,
        candidateListPage: {
          ...state.candidateListPage,
          filters: initialState.candidateListPage.filters
        }
      }
    default:
      return state
  }
}
