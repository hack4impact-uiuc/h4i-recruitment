import { getAllCandidates } from '../utils/api'
import { yearsenum, rolesenum, statusenum, gradenum, enumToArray } from '../utils/enums'

const initialState = {
  facemash: {
    candidates: 'abc'
  },
  candidateListPage: {
    candidates: [],
    candidatesLoading: false,
    candidatesError: null,
    filters: {
      years: enumToArray(yearsenum),
      statuses: enumToArray(statusenum),
      roles: enumToArray(rolesenum),
      gradDates: enumToArray(gradenum)
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false
    }
  }
}

export default initialState
