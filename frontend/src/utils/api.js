//@flow
import fetch from 'isomorphic-unfetch'

const getKey = () => localStorage.getItem('interviewerKey')

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hack4impact-recruitment-backend.now.sh'
    : 'http://localhost:8080' // make sure your backend is running on this port.
// if your frontend can't connect, try the normal IP

const AUTH_API_URL = 'https://h4i-infra-server.n3a9.now.sh/'

function getAllEvents() {
  return fetch(`${API_URL}/events?key=${getKey()}`).then(res => res.json())
}

function createEvent(event) {
  return fetch(`${API_URL}/events?key=${getKey()}`, {
    body: JSON.stringify({
      name: event.name,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      description: event.description,
      fbLink: event.fbLink
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function addInterviewSchedule(file: File) {
  var reader = new FileReader()
  var scheduleString = ''
  reader.onload = function(e) {
    scheduleString = reader.result
    fetch(`${API_URL}/schedule/upload/?key=${getKey()}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ schedule: scheduleString })
    })
      .then(res => res.json())
      .then(success => console.log(success))
      .catch(error => console.log(error))
  }

  reader.readAsText(file)
}

function getInterviewSchedule() {
  return fetch(`${API_URL}/schedule?key=${getKey()}`).then(res => res.json())
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
  }).then(res => res.json())
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
  sections: Array,
  round: string,
  scored: boolean
) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews?key=${getKey()}`, {
    body: JSON.stringify({
      interviewerKey,
      candidateId,
      candidateName,
      overallScore,
      generalNotes,
      sections,
      round,
      scored
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

function getAllInterviewingCandidateInterviews() {
  return fetch(`${API_URL}/interviews?notRejected=True&&key=${getKey()}`).then(res => res.json())
}

function deleteInterview(candidateId: string, interviewId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews/${interviewId}?key=${getKey()}`, {
    method: 'DELETE',
    mode: 'cors'
  }).then(res => res.json())
}

function getRound() {
  return fetch(`${API_URL}/structure?key=${getKey()}`, {
    method: 'GET'
  }).then(res => res.json())
}

function setRound(round: number) {
  return fetch(`${API_URL}/structure?key=${getKey()}`, {
    body: JSON.stringify({
      round
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function addReferral(candidateID: string) {
  console.log(`Adding referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals?key=${getKey()}`, {
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function addStrongReferral(candidateID: string) {
  console.log(`Adding strong referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/strongReferrals?key=${getKey()}`, {
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function deleteReferral(candidateID: string) {
  console.log(`Deleting referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals?key=${getKey()}`, {
    method: 'DELETE',
    mode: 'cors'
  }).then(res => res.json())
}

function registerUser(email: string, password: string, role: string) {
  console.log(`Creating new user: ${email}`)
  return (
    fetch(`${AUTH_API_URL}/register`),
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        role
      }).then(res => res.json())
    }
  )
}

function loginUser(email: string, password: string) {
  console.log(`Logging in user ${email}`)
  return (
    fetch(`${AUTH_API_URL}/login`),
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }).then(res => res.json())
    }
  )
}

function loginGoogleUser(tokenId: string, role: string) {
  console.log(`Logging in user ${tokenId} with Google Auth`)
  return (
    fetch(`${AUTH_API_URL}/login`),
    {
      method: 'POST',
      body: JSON.stringify({
        tokenId,
        role
      }).then(res => res.json())
    }
  )
}

export {
  getAllEvents,
  createEvent,
  addInterviewSchedule,
  getInterviewSchedule,
  getPastInterviews,
  getCandidateInterviews,
  validateKey,
  addInterview,
  editInterview,
  getCandidateById,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus,
  addCommentToCandidate,
  getKey,
  getCandidates,
  getInterviewingCandidates,
  getAllInterviews,
  deleteInterview,
  getRound,
  setRound,
  addReferral,
  addStrongReferral,
  deleteReferral,
  getAllInterviewingCandidateInterviews,
  registerUser,
  loginUser,
  loginGoogleUser
}
