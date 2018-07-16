import { getAllCandidates } from '../utils/api'
import { yearsenum, rolesenum, statusenum } from '../utils/enums'

const initialState = {
  candidates: [],
  facemash: {
    candidates: 'abc'
  },
  candidateListPage: {
    candidates: [],
    candidatesLoading: false,
    candidatesError: null,
    filters: {
      years: [yearsenum.FRESHMAN, yearsenum.SOPHOMORE, yearsenum.JUNIOR, yearsenum.SENIOR],
      statuses: [
        statusenum.ACCEPTED,
        statusenum.DENIED,
        statusenum.INTERVIEWING,
        statusenum.PENDING
      ],
      roles: [rolesenum.CD, rolesenum.TL, rolesenum.SWE, rolesenum.PM]
    },
    sort: {
      age: false,
      facesmashScore: false,
      interviewScore: false
    }
  }
}

export default initialState
