import initialState from './initialState.js'
import {
  NEW_MATCH,
  EDIT_INTERVIEW,
  NEW_INTERVIEW,
  ADD_INTERVIEW_CANDIDATE,
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATES_SUCCESS,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_STATUS,
  RESET_FILTERS,
  SET_ROUND,
  SET_VIEWED_ROUND,
  SET_VALID_FORMAT
} from '../actions/actionTypes'

export default function recruitmentApp(state = initialState, action) {
  switch (action.type) {
    case SET_ROUND:
      return {
        ...state,
        round: action.payload,
        viewedRound: action.payload
      }
    case SET_VIEWED_ROUND:
      return {
        ...state,
        viewedRound: action.payload
      }
    case SET_VALID_FORMAT:
      return {
        ...state,
        validFormat: action.payload
      }
    case EDIT_INTERVIEW:
      console.log('ACTION INTERVIEW', action.payload.interview)
      return {
        ...state,
        interview: {
          ...state.interview,
          editInterview: true,
          interviewObj: action.payload.interview
        }
      }
    case ADD_INTERVIEW_CANDIDATE:
      return {
        ...state,
        interview: {
          ...state.interview,
          candidateId: action.payload.candidateId,
          candidateName: action.payload.candidateName
        }
      }
    case NEW_INTERVIEW:
      return {
        ...state,
        interview: {
          ...state.interview,
          editInterview: false,
          interviewObj: null
        }
      }
    case NEW_MATCH:
      return {
        ...state,
        facemash: {
          ...state.facemash,
          candidates: action.candidates,
          matchID: action.matchID
        }
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
