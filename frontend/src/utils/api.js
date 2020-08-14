//@flow
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const API_PORT = publicRuntimeConfig.BACKEND_PORT
const API_URL = publicRuntimeConfig.API_URL

function createWorkspace(workspace) {
  return fetch(`${API_URL}/workspaces`, {
    body: JSON.stringify({
      name: workspace.name,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function getWorkspaces() {
  return fetch(`${API_URL}/workspaces`, {
    credentials: 'include',
  }).then(res => res.json())
}

function setCurrentCycle(cycleId, workspaceName) {
  return fetch(`${API_URL}/cycle/setCurrent/${workspaceName}/${cycleId}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function createCycle(cycle) {
  return fetch(`${API_URL}/cycle`, {
    body: JSON.stringify({
      term: cycle.term,
      workspaceName: cycle.workspaceName,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function getCyclesByWorkspace(workspaceName, current) {
  return fetch(`${API_URL}/cycle/workspace/${workspaceName}&current=${current}`, {
    credentials: 'include',
  }).then(res => res.json())
}

function getAllEvents() {
  return fetch(`${API_URL}/events`, {
    credentials: 'include',
  }).then(res => res.json())
}

function createEvent(event) {
  return fetch(`${API_URL}/events`, {
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
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function eventCheckin(attendee, id: string) {
  return fetch(`${API_URL}/events/${id}/attendees`, {
    body: JSON.stringify({
      name: attendee.name,
      email: attendee.email,
      year: attendee.year,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function getEventById(id: string) {
  return fetch(`${API_URL}/events/${id}`, {
    credentials: 'include',
  }).then(res => res.json())
}

function getEventAttendees(id: string) {
  return fetch(`${API_URL}/events/${id}/attendees`, {
    credentials: 'include',
  }).then(res => res.json())
}

async function addInterviewerSchedules(file: File) {
  const scheduleString = await readUploadedFile(file)
  return fetch(`${API_URL}/schedule/uploadInterviewers/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ data: scheduleString }),
  }).then(res => res.json())
}

async function addCandidateSchedules(file: File) {
  const scheduleString = await readUploadedFile(file)
  return fetch(`${API_URL}/schedule/uploadCandidates/`, {
    method: 'POST',
    credentials: 'include',
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
  return fetch(`${API_URL}/schedule/generateSchedules`, {
    method: 'POST',
    credentials: 'include',
  }).then(res => res.json())
}

function getInterviewSchedule() {
  return fetch(`${API_URL}/schedule`, {
    credentials: 'include',
  }).then(res => res.json())
}

function deleteAllSchedules() {
  return fetch(`${API_URL}/schedule`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(res => res.json())
}

function getCandidateById(id: string) {
  return fetch(`${API_URL}/candidates/${id}`, {
    credentials: 'include',
  }).then(res => res.json())
}

function getCandidateMatch() {
  return fetch(`${API_URL}/matchCandidates`, { credentials: 'include' }).then(res => res.json())
}

function getCandidates() {
  return fetch(`${API_URL}/candidates`, { credentials: 'include' }).then(res => res.json())
}

function getInterviewingCandidates() {
  return fetch(`${API_URL}/candidates`, { credentials: 'include' }).then(res => res.json())
}

function setCandidateStatus(id: string, status: string) {
  return fetch(`${API_URL}/candidates/${id}/status`, {
    body: JSON.stringify({
      id: id,
      status: status,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function getCandidatesByStatus(status: string) {
  return fetch(`${API_URL}/candidates?status=${status}`, { credentials: 'include' }).then(res =>
    res.json()
  )
}

function setMatchWinner(candidate1: string, candidate2: string, winnerID: string, matchID: string) {
  return fetch(`${API_URL}/matchCandidates`, {
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
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function addCommentToCandidate(candidateID: string, comment: string) {
  console.log(`Adding Comment to ${candidateID}: ${comment}`)
  return fetch(`${API_URL}/candidates/${candidateID}/comments`, {
    body: JSON.stringify({
      comment,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function validateUser() {
  return fetch(`${API_URL}/interviews/verify_member`, {
    credentials: 'include',
  }).then(res => res.json())
}

function getPastInterviews() {
  return fetch(`${API_URL}/interviews/interviewer/`, {
    credentials: 'include',
  }).then(res => res.json())
}

function getCandidateInterviews(candidateId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews`, { credentials: 'include' }).then(
    res => res.json()
  )
}

function addInterview(
  candidateId: string,
  candidateName: string,
  overallScore: number,
  generalNotes: string,
  sections: Array,
  round: string,
  scored: boolean
) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews`, {
    body: JSON.stringify({
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
    credentials: 'include',
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
  return fetch(`${API_URL}/interviews/${interviewId}`, {
    body: JSON.stringify({
      sections,
      overallScore,
      generalNotes,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function getAllInterviews() {
  return fetch(`${API_URL}/interviews`, { credentials: 'include' }).then(res => res.json())
}

function getInterviewByID(id) {
  return fetch(`${API_URL}/interviews/${id}`, { credentials: 'include' })
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
}

function getAllInterviewingCandidateInterviews() {
  return fetch(`${API_URL}/interviews?notRejected=True`, { credentials: 'include' }).then(res =>
    res.json()
  )
}

function deleteInterview(candidateId: string, interviewId: string) {
  return fetch(`${API_URL}/candidates/${candidateId}/interviews/${interviewId}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  }).then(res => res.json())
}

function getRound() {
  return fetch(`${API_URL}/structure`, {
    method: 'GET',
    credentials: 'include',
  }).then(res => res.json())
}

function setRound(round: number) {
  return fetch(`${API_URL}/structure`, {
    body: JSON.stringify({
      round,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function addReferral(candidateID: string) {
  console.log(`Adding referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function addStrongReferral(candidateID: string) {
  console.log(`Adding strong referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/strongReferrals`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
  }).then(res => res.json())
}

function deleteReferral(candidateID: string) {
  console.log(`Deleting referral for ${candidateID}`)
  return fetch(`${API_URL}/candidates/${candidateID}/referrals`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  }).then(res => res.json())
}

function getAllUsers() {
  return fetch(`${API_URL}/user/`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(res => res.json())
}

function addUser(firstName: string, lastName: string, userId: string, email: string, role: string) {
  console.log(`Writing user ${email} to internal database`)
  return fetch(`${API_URL}/user/`, {
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
    credentials: 'include',
  }).then(res => res.json())
}

function updateUserRole(email: string, newRole: string) {
  return fetch(`${API_URL}/user/`, {
    method: 'PUT',
    body: JSON.stringify({
      email,
      role: newRole,
    }),
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
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
  validateUser,
  addInterview,
  editInterview,
  getCandidateById,
  getCandidateMatch,
  setMatchWinner,
  setCandidateStatus,
  getCandidatesByStatus,
  addCommentToCandidate,
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
  getAllUsers,
  addUser,
  updateUserRole,
}
