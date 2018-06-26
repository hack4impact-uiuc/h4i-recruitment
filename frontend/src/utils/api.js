//@flow
import fetch from 'isomorphic-unfetch'

const API_URL = 'http://localhost:8080'

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}`).then(res => res.json())
}

function getAllCandidates() {
  return fetch(`${API_URL}/candidates`).then(res => res.json())
}

function getCandidateMatch() {
  return fetch(`${API_URL}/matchCandidates`).then(res => res.json())
}

function setCandidateStatus(id: string, status: string) {
  return fetch(`${API_URL}/set-status`, {
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
  console.log('setMatachWinener')
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

export {
  getCandidateById,
  getAllCandidates,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus
}
