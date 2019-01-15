//@flow
import fetch from 'isomorphic-unfetch'

const getKey = () => sessionStorage.getItem('interviewerKey')

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hack4impact-recruitment-backend.now.sh'
    : 'http://52.14.207.0:8080'

function addInterviewSchedule(file: File) {
  return fetch(`${API_URL}/interviews/scheduleUpload/?key=${getKey()}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/CSV'
    },
    body: file
  })
    .then(res => res.json())
    .then(success => console.log(success))
    .catch(error => console.log(error))
}

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}?key=${getKey()}`).then(res => res.json())
}

function getCandidateMatch() {
  return fetch(`${API_URL}/matchCandidates?key=${getKey()}`).then(res => res.json())
}

function getCandidates() {
  return fetch(`${API_URL}/candidates?key=${getKey()}`).then(res => res.json())
}

function getInterviewingCandidates() {
  return fetch(`${API_URL}/candidates?key=${getKey()}`).then(res => res.json())
}

function setCandidateStatus(id: string, status: string) {
  return fetch(`${API_URL}/candidates/${id}/status?key=${getKey()}`, {
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
  return fetch(`${API_URL}/candidates?status=${status}&&key=${getKey()}`).then(res => res.json())
}

function setMatchWinner(candidate1: string, candidate2: string, winnerID: string, matchID: string) {
  return fetch(`${API_URL}/matchCandidates?key=${getKey()}`, {
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
  return fetch(`${API_URL}/candidates/${candidateID}/comments?key=${getKey()}`, {
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

function validateKey(key: string) {
  return fetch(`${API_URL}/interviews/verify_interviewer?key=${key}`).then(res => res.json())
}

function getPastInterviews(interviewerKey: string) {
  return fetch(`${API_URL}/interviews/interviewer/${interviewerKey}?key=${getKey()}`).then(res =>
    res.json()
  )
}
function getCandidateInterviews(candidateId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews?key=${getKey()}`).then(res =>
    res.json()
  )
}

function addInterview(
  interviewerKey: string,
  candidateId: string,
  candidateName: string,
  overallScore: number,
  generalNotes: string,
  categoryNotes: string,
  category: string,
  sections: Array
) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews?key=${getKey()}`, {
    body: JSON.stringify({
      interviewerKey,
      candidateId,
      candidateName,
      overallScore,
      generalNotes,
      categoryNotes,
      category,
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
  return fetch(`${API_URL}/interviews/${interviewId}?key=${getKey()}`, {
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
  }).then(res => res.json())
}

function getAllInterviews() {
  return fetch(`${API_URL}/interviews?key=${getKey()}`).then(res => res.json())
}

function deleteInterview(candidateId: string, interviewId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews/${interviewId}?key=${getKey()}`, {
    method: 'DELETE',
    mode: 'cors'
  }).then(res => res.json())
}

export {
  addInterviewSchedule,
  getPastInterviews,
  getCandidateInterviews,
  validateKey,
  addInterview,
  editInterview,
  getCandidateById,
  getAllCandidates,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus,
  addCommentToCandidate,
  getKey,
  getCandidates,
  getInterviewingCandidates,
  getAllInterviews,
  deleteInterview
}
