import {
  yearsEnum,
  rolesEnum,
  statusEnum,
  referralEnum,
  gradEnum,
  sortByEnum,
  enumToArray,
  selectByEnum,
  compareByEnum,
} from '../utils/enums'

const selectList = enumToArray(selectByEnum)
selectList.splice(selectList.indexOf('Hours'), 1)
selectList.splice(selectList.indexOf('Facemash Score'), 1)
selectList.splice(selectList.indexOf('Number of Matches'), 1)
selectList.splice(selectList.indexOf(selectByEnum.EMAIL), 1)

const initialState = {
  round: 0,
  selectedRound: 0,
  validFormat: true,
  facemash: {
    candidates: null,
    matchID: null,
  },
  interview: {
    editInterview: false,
    interviewObj: null,
    candidateId: '',
    candidateName: '',
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
      workspaces: [],
      selectBy: selectList,
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false,
    },
  },
}

export default initialState
