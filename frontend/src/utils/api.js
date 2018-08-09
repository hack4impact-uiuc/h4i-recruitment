//@flow
import fetch from 'isomorphic-unfetch'

const API_URL = 'http://localhost:8080'

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}`).then(res => res.json())
}

// functions getAllCandidates() {
//   return fetch(`${API_URL}/candidates`).then(res => res.json())
// }

function getAllCandidates(statuses, years, gradDates, sorts) {
  console.log(sorts)
  // let renamedSorts = Array.from(sorts).map(x => x.replace("Graudation Year", "graduationDate")).map(x => x.replace("Year", "year")).map(x => x.replace("Status", "status"))
  // console.log(renamedSorts === ["year", "graduationDate"])
  return fetch(`${API_URL}/candidates/query`, {
    body: JSON.stringify({
      filters: {
        status: statuses,
        year: years,
        graduationDate: gradDates
      }, 
      sorts: sorts,
      selects: []
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

export {
  getCandidateById,
  getAllCandidates,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus
}
