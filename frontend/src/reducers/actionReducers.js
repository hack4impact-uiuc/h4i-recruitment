import initialState from './initialState.js'
import {
  NEW_MATCH,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER
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
    default:
      return state
  }
}
