//@flow
import fetch from 'isomorphic-unfetch'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hack4impact-recruitment-backend.now.sh'
    : 'http://localhost:8080'

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}?key=${localStorage.getItem('interviewerKey')}`).then(
    res => res.json()
  )
}

async function getAllCandidates(statuses, years, gradDates, sorts, roles, selectBy) {
  const res = await fetch(
    `${API_URL}/candidates/query?key=${localStorage.getItem('interviewerKey')}`,
    {
      body: JSON.stringify({
        filters: {
          status: statuses,
          year: years,
          roles: roles,
          graduationDate: gradDates,
          sorts: sorts,
          selectBy: selectBy
        }
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    }
  )
  const json_res = await res.json()
  if (res.status >= 400) {
    throw new Error(`Bad Response (${res.status}) From Server with message: ${json_res.message}`)
  }
  return json_res
}

function getCandidateMatch() {
  return fetch(`${API_URL}/matchCandidates?key=${localStorage.getItem('interviewerKey')}`).then(
    res => res.json()
  )
}

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}?key=${localStorage.getItem('interviewerKey')}`).then(
    res => res.json()
  )
}

function setCandidateStatus(id: string, status: string) {
  return fetch(`${API_URL}/candidates/set-status?key=${localStorage.getItem('interviewerKey')}`, {
    body: JSON.stringify({
      id: id,
      status: status
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json)
}

function getCandidatesByStatus(status: string) {
  return fetch(
    `${API_URL}/candidates?status=${status}&&key=${localStorage.getItem('interviewerKey')}`
  ).then(res => res.json())
}

function setMatchWinner(candidate1: string, candidate2: string, winnerID: string, matchID: string) {
  console.log('setMatchWinner')
  return fetch(`${API_URL}/matchCandidates?key=${localStorage.getItem('interviewerKey')}`, {
    body: JSON.stringify({
      candidate1,
      candidate2,
      winnerID,
      matchID
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function addCommentToCandidate(candidateID: string, comment: string) {
  console.log(`Adding Comment to ${candidateID}: ${comment}`)
  return fetch(
    `${API_URL}/candidates/${candidateID}/comments?key=${localStorage.getItem('interviewerKey')}`,
    {
      body: JSON.stringify({
        comment
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    }
  ).then(res => res.json())
}

function validateKey(key: string) {
  return fetch(`${API_URL}/interview?key=${key}`).then(res => res.json())
}

function getPastInterviews(interviewerKey: string) {
  return fetch(
    `${API_URL}/interview/past-interviews/${interviewerKey}?key=${localStorage.getItem(
      'interviewerKey'
    )}`
  ).then(res => res.json())
}

function addInterview(
  interviewerKey: string,
  candidateId: string,
  candidateName: string,
  overallScore: number,
  generalNotes: string,
  sections: Array
) {
  return fetch(`${API_URL}/interview?key=${localStorage.getItem('interviewerKey')}`, {
    body: JSON.stringify({
      interviewerKey,
      candidateId,
      candidateName,
      overallScore,
      generalNotes,
      sections
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function editInterview(
  interviewId: string,
  sections: Array,
  overallScore: number,
  generalNotes: string
) {
  return fetch(
    `${API_URL}/interview/${interviewId}?key=${localStorage.getItem('interviewerKey')}`,
    {
      body: JSON.stringify({
        sections,
        overallScore,
        generalNotes
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    }
  ).then(res => res.json())
}

export {
  getPastInterviews,
  validateKey,
  addInterview,
  editInterview,
  getCandidateById,
  getAllCandidates,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus,
  addCommentToCandidate
}
