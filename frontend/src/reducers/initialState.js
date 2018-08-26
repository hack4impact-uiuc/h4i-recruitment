import {
  yearsEnum,
  rolesEnum,
  statusEnum,
  gradEnum,
  sortByEnum,
  enumToArray,
  selectByEnum
} from '../utils/enums'

const initialState = {
  facemash: {
    candidates: null,
    matchID: null
  },
  interview:{
    editInterview:false,
    interviewObj: null,
  },
  candidateListPage: {
    candidates: [],
    candidatesLoading: false,
    candidatesError: null,
    filters: {
      years: enumToArray(yearsEnum),
      statuses: enumToArray(statusEnum),
      roles: enumToArray(rolesEnum),
      gradDates: enumToArray(gradEnum),
      sortBy: enumToArray(sortByEnum),
      selectBy: enumToArray(selectByEnum)
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false
    }
  }
}

export default initialState
