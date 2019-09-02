//@flow
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { getCookie } from './cookieUtils'
const { publicRuntimeConfig } = getConfig()

const getKey = () => localStorage.getItem('memberId')

const API_PORT = publicRuntimeConfig.BACKEND_PORT

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hack4impact-recruitment-backend.now.sh'
    : `http://localhost:${API_PORT}` // make sure your backend is running on this port.
// if your frontend can't connect, try the normal IP

const AUTH_API_URL = 'https://h4i-portal-infra-server.now.sh'

function createWorkspace(workspace) {
  return fetch(`${API_URL}/workspaces?key=${getKey()}`, {
    body: JSON.stringify({
      name: workspace.name,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function getWorkspaces() {
  return fetch(`${API_URL}/workspaces?key=${getKey()}`).then(res => res.json())
}

function setCurrentCycle(cycleId, workspaceName) {
  return fetch(`${API_URL}/cycle/setCurrent/${workspaceName}/${cycleId}?key=${getKey()}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    mode: 'cors',
  }).then(res => res.json())
}

function createCycle(cycle) {
  return fetch(`${API_URL}/cycle?key=${getKey()}`, {
    body: JSON.stringify({
      term: cycle.term,
      workspaceName: cycle.workspaceName,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function getCyclesByWorkspace(workspaceName, current) {
  return fetch(
    `${API_URL}/cycle/workspace/${workspaceName}?key=${getKey()}&current=${current}`
  ).then(res => res.json())
}

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
      fbLink: event.fbLink,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function eventCheckin(attendee, id: string) {
  return fetch(`${API_URL}/events/${id}/attendees?key=${getKey()}`, {
    body: JSON.stringify({
      name: attendee.name,
      email: attendee.email,
      year: attendee.year,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    mode: 'cors',
  }).then(res => res.json())
}

function getEventById(id: string) {
  return fetch(`${API_URL}/events/${id}?key=${getKey()}`).then(res => res.json())
}

function getEventAttendees(id: string) {
  return fetch(`${API_URL}/events/${id}/attendees?key=${getKey()}`).then(res => res.json())
}

async function addInterviewerSchedules(file: File) {
  const scheduleString = await readUploadedFile(file)
  return fetch(`${API_URL}/schedule/uploadInterviewers/?key=${getKey()}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ data: scheduleString }),
  }).then(res => res.json())
}

async function addCandidateSchedules(file: File) {
  const scheduleString = await readUploadedFile(file)
  return fetch(`${API_URL}/schedule/uploadCandidates/?key=${getKey()}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ data: scheduleString }),
  }).then(res => res.json())
}

const readUploadedFile = inputFile => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      reject(new TypeError('Problem encountered while reading input file.'))
    }

    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsBinaryString(inputFile)
  })
}

function generateSchedules() {
  return fetch(`${API_URL}/schedule/generateSchedules?key=${getKey()}`, { method: 'POST' }).then(
    res => res.json()
  )
}

function getInterviewSchedule() {
  return fetch(`${API_URL}/schedule?key=${getKey()}`).then(res => res.json())
}

function deleteAllSchedules() {
  return fetch(`${API_URL}/schedule?key=${getKey()}`, { method: 'DELETE' }).then(res => res.json())
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
      status: status,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
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
      matchID,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function addCommentToCandidate(candidateID: string, comment: string) {
  console.log(`Adding Comment to ${candidateID}: ${comment}`)
  return fetch(`${API_URL}/candidates/${candidateID}/comments?key=${getKey()}`, {
    body: JSON.stringify({
      comment,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function validateKey(key: string) {
  return fetch(`${API_URL}/interviews/verify_member?key=${key}`).then(res => res.json())
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
      scored,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
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
      generalNotes,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function getAllInterviews() {
  return fetch(`${API_URL}/interviews?key=${getKey()}`).then(res => res.json())
}

function getInterviewByID(id) {
  return fetch(`${API_URL}/interviews/${id}?key=${getKey()}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
}

function getAllInterviewingCandidateInterviews() {
  return fetch(`${API_URL}/interviews?notRejected=True&&key=${getKey()}`).then(res => res.json())
}

function deleteInterview(candidateId: string, interviewId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews/${interviewId}?key=${getKey()}`, {
    method: 'DELETE',
    mode: 'cors',
  }).then(res => res.json())
}

function getRound() {
  return fetch(`${API_URL}/structure?key=${getKey()}`, {
    method: 'GET',
  }).then(res => res.json())
}

function setRound(round: number) {
  return fetch(`${API_URL}/structure?key=${getKey()}`, {
    body: JSON.stringify({
      round,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function addReferral(candidateID: string) {
  console.log(`Adding referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals?key=${getKey()}`, {
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function addStrongReferral(candidateID: string) {
  console.log(`Adding strong referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/strongReferrals?key=${getKey()}`, {
    method: 'POST',
    mode: 'cors',
  }).then(res => res.json())
}

function deleteReferral(candidateID: string) {
  console.log(`Deleting referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals?key=${getKey()}`, {
    method: 'DELETE',
    mode: 'cors',
  }).then(res => res.json())
}

function getAllUsers() {
  return fetch(`${API_URL}/user/?key=${getKey()}`, {
    method: 'GET',
    mode: 'cors',
  }).then(res => res.json())
}

function addUser(firstName: string, lastName: string, userId: string, email: string, role: string) {
  console.log(`Writing user ${email} to internal database`)
  return fetch(`${API_URL}/user/?key=${getKey()}`, {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      userId,
      email,
      role,
    }),
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
  }).then(res => res.json())
}

function updateUserRole(email: string, newRole: string) {
  return fetch(`${API_URL}/user/?key=${getKey()}`, {
    method: 'PUT',
    body: JSON.stringify({
      email,
      role: newRole,
    }),
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
  }).then(res => res.json())
}

function updateServerUserRole(userEmail: string, newRole: string, password: string) {
  return fetch(`${AUTH_API_URL}/roleschange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: getCookie('token'),
      google: false,
    },
    body: JSON.stringify({
      password,
      userEmail,
      newRole,
    }),
  })
}

function registerUser(email: string, password: string, role: string) {
  console.log(`Creating new user: ${email}`)
  return fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      role,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}

function loginUser(email: string, password: string) {
  console.log(`Logging in user ${email}`)
  return fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}

function loginGoogleUser(tokenId: string) {
  console.log(`Logging in user ${tokenId} with Google Auth`)
  return fetch(`${AUTH_API_URL}/google`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tokenId: tokenId,
      role: 'Pending',
    }),
  }).then(res => res.json())
}

export {
  createWorkspace,
  getWorkspaces,
  getCyclesByWorkspace,
  createCycle,
  getAllEvents,
  createEvent,
  setCurrentCycle,
  addInterviewerSchedules,
  addCandidateSchedules,
  eventCheckin,
  getEventById,
  getEventAttendees,
  getInterviewSchedule,
  getPastInterviews,
  getCandidateInterviews,
  generateSchedules,
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
  getInterviewByID,
  deleteInterview,
  getRound,
  setRound,
  addReferral,
  addStrongReferral,
  deleteReferral,
  deleteAllSchedules,
  getAllInterviewingCandidateInterviews,
  registerUser,
  loginUser,
  loginGoogleUser,
  getAllUsers,
  addUser,
  updateUserRole,
  updateServerUserRole,
}
