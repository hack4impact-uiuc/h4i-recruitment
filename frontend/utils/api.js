import fetch from 'isomorphic-unfetch'

function getCandidateById (id) {
  return fetch(`http://localhost:8080/candidates/${id}`).then(res => res.json())
}

function getAllCandidates () {
  return fetch('http://localhost:8080/candidates').then(res => res.json())
}

export {
  getCandidateById,
  getAllCandidates
}
