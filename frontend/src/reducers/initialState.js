import {
  yearsEnum,
  rolesEnum,
  statusEnum,
  referralEnum,
  gradEnum,
  sortByEnum,
  enumToArray,
  selectByEnum,
  compareByEnum
} from '../utils/enums'

const selectList = enumToArray(selectByEnum)
selectList.splice(selectList.indexOf('Hours'), 1)

const initialState = {
  round: 0,
  viewedRound: 0, //For viewing round structure on the Rounds page
  validFormat: true,
  facemash: {
    candidates: null,
    matchID: null
  },
  interview: {
    editInterview: false,
    interviewObj: null,
    candidateId: '',
    candidateName: ''
  },
  candidateListPage: {
    candidates: [],
    candidatesLoading: false,
    candidatesError: null,
    filters: {
      years: enumToArray(yearsEnum),
      statuses: enumToArray(statusEnum),
      referrals: enumToArray(referralEnum),
      roles: enumToArray(rolesEnum),
      gradDates: enumToArray(gradEnum),
      sortBy: enumToArray(sortByEnum),
      compareBy: enumToArray(compareByEnum),
      selectBy: selectList
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false
    }
  }
}

export default initialState
