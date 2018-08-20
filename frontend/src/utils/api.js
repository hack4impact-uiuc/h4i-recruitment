//@flow
import fetch from 'isomorphic-unfetch'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hack4impact-recruitment-backend.now.sh'
    : 'http://localhost:8080'

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}`).then(res => res.json())
}

function getAllCandidates(statuses, years, gradDates, sorts, roles) {
  return fetch(`${API_URL}/candidates/query`, {
    body: JSON.stringify({
      filters: {
        status: statuses,
        year: years,
        roles: roles,
        graduationDate: gradDates
      },
      sorts: sorts
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function getCandidateMatch() {
  return fetch(`${API_URL}/matchCandidates`).then(res => res.json())
}

function setCandidateStatus(id: string, status: string) {
  return fetch(`${API_URL}/candidates/set-status`, {
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
  return fetch(`${API_URL}/candidates?status=${status}`).then(res => res.json())
}

function setMatchWinner(candidate1: string, candidate2: string, winnerID: string, matchID: string) {
  console.log('setMatchWinner')
  return fetch(`${API_URL}/matchCandidates`, {
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
  return fetch(`${API_URL}/candidates/${candidateID}/comments`, {
    body: JSON.stringify({
      comment
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

export {
  getCandidateById,
  getAllCandidates,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus,
  addCommentToCandidate
}
