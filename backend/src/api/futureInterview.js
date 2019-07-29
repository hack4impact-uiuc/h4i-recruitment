const express = require('express')
var mongodb = require('mongodb')
const XLSX = require('xlsx')
const fetch = require('isomorphic-unfetch')
const moment = require('moment')
const csv = require('csv-array')
const { errorWrap, leadsOnly } = require('../middleware')
const { FutureInterview, InterviewAvailability } = require('../models')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const schedulerUrl = process.env.SCHEDULER_URL
const schedulerApiKey = process.env.SCHEDULER_API_KEY
const keyData = require(keyPath)
const router = express.Router()

// This endpoint is an example
router.post(
  '/populateTest',
  errorWrap(async (req, res) => {
    var newInterview = new FutureInterview({
      candidates: ['Steve Jobs'],
      interviewers: ['Tim Ko'],
      room: 'Room A',
      date: '01/24/2019',
      time: '10:00AM'
    })
    await newInterview.save()

    newInterview = new FutureInterview({
      candidates: ['Bill Gates'],
      interviewers: ['Tim Ko'],
      room: 'Room B',
      date: '01/25/2019',
      time: '2:00PM'
    })

    await newInterview.save()

    res.json({
      code: 200,
      message: 'Populated.',
      result: {},
      success: true
    })
  })
)

router.post(
  '/uploadCandidates',
  errorWrap(async (req, res) => {
    var workbook = XLSX.read(req.body['data'], { type: 'binary' })
    const sheetName = workbook.SheetNames
    var sheet = workbook['Sheets'][sheetName]
    var arr = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null })
    unmergeColumns(arr)
    let timeObj = getTimesFromArray(arr)
    try {
      await uploadInterviewAvailability(timeObj, false)
      res.json({
        code: 200,
        message: 'Populated.',
        result: {},
        success: true
      })
    } catch (e) {
      res.json({
        code: 400,
        message: 'Error.',
        result: {},
        success: false
      })
    }
  })
)

router.post(
  '/generateSchedules',
  errorWrap(async (req, res) => {
    const interviewerAvail = await InterviewAvailability.findOneAndDelete({
      type: 'INTERVIEWERS'
    })
    const candidateAvail = await InterviewAvailability.findOneAndDelete({
      type: 'CANDIDATES'
    })
    const result = await fetch(schedulerUrl, {
      body: JSON.stringify({
        interviewerAvailabilities: { times: interviewerAvail.availabilities },
        candidateAvailabilities: { times: candidateAvail.availabilities },
        timeSlots: interviewerAvail.timeSlots,
        interviewDuration: interviewerAvail.interviewDuration
      }),
      headers: {
        'x-api-key': schedulerApiKey,
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    json = await result.json()
    insertions = json.scheduledInterviews.map(value => {
      start_date = moment(new Date(value.start_time))
      FutureInterview({
        candidates: [value.name],
        interviewers: value.interviewers,
        date: start_date.format('MM/DD/YYYY'),
        time: start_date.format('hh:mmA')
      }).save()
    })
    await Promise.all(insertions)
    res.json({
      code: 200,
      message: 'Populated.',
      result: {},
      success: true
    })
  })
)

router.post(
  '/uploadInterviewers',
  errorWrap(async (req, res) => {
    var workbook = XLSX.read(req.body['data'], { type: 'binary' })
    const sheetName = workbook.SheetNames
    var sheet = workbook['Sheets'][sheetName]
    var arr = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null })
    unmergeColumns(arr)
    let timeObj = getTimesFromArray(arr)
    try {
      await uploadInterviewAvailability(timeObj, true)
      res.json({
        code: 200,
        message: 'Populated.',
        result: {},
        success: true
      })
    } catch (e) {
      res.json({
        code: 400,
        message: 'Error.',
        result: {},
        success: false
      })
    }
  })
)

let uploadInterviewAvailability = async (obj, isInterviewerList) => {
  let availability = new InterviewAvailability({
    type: isInterviewerList ? 'INTERVIEWERS' : 'CANDIDATES',
    interviewDuration: 30,
    availabilities: obj.times,
    timeSlots: obj.allTimes
  })
  await availability.save()
}

// since the first 3 rows have merged cells for the month and date,
// we want to "unmerge" so there are no null cells in the month and date rows
function unmergeColumns(arr) {
  let valueToFill
  for (var i = 0; i < 2; i++) {
    for (var j = 1; j < arr[i].length; j++) {
      if (arr[i][j] !== null) {
        valueToFill = arr[i][j]
      } else {
        arr[i][j] = valueToFill
      }
    }
  }
}

function getTimesFromArray(arr) {
  let summaryDict = {}
  let timeArray = []
  for (var row = 3; row < arr.length - 1; row++) {
    let personObj = {}
    personObj['name'] = arr[row][0]
    personObj['availableTimes'] = []
    for (var col = 1; col < arr[row].length; col++) {
      if (arr[row][col] === 'OK') {
        // grab the date from the first few rows, concatenate and parse that date
        let datetimeStr = `${arr[0][col]} ${arr[1][col]} ${arr[2][col]}`
        personObj['availableTimes'].push(moment(datetimeStr, 'MMMM YYYY ddd DD hh:mm a').toDate())
      }
    }
    timeArray.push(personObj)
  }
  summaryDict['times'] = timeArray
  summaryDict['allTimes'] = []
  for (var col = 1; col < arr[0].length; col++) {
    let datetimeStr = `${arr[0][col]} ${arr[1][col]} ${arr[2][col]}`
    summaryDict['allTimes'].push(moment(datetimeStr, 'MMMM YYYY ddd DD hh:mm a').toDate())
  }
  return summaryDict
}

router.get(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const futureInterviews = await FutureInterview.find()
    let interviews = []
    interviews = futureInterviews
    res.json({
      code: 200,
      message: 'Retrieved interviewers',
      result: { interviews },
      success: true
    })
  })
)

// END
module.exports = router
