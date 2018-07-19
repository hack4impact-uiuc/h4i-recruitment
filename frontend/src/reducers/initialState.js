import { getAllCandidates } from '../utils/api'
import { yearsEnum, rolesEnum, statusEnum, gradEnum, enumToArray } from '../utils/enums'

const initialState = {
  facemash: {
    candidates: null,
    matchID: null
  },
  candidateListPage: {
    candidates: [],
    candidatesLoading: false,
    candidatesError: null,
    filters: {
      years: enumToArray(yearsEnum),
      statuses: enumToArray(statusEnum),
      roles: enumToArray(rolesEnum),
      gradDates: enumToArray(gradEnum)
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false
    }
  }
}

export default initialState
