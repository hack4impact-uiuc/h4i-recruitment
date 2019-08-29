const express = require('express')
const mongodb = require('mongodb')
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

const listType = {
  INTERVIEWERS: 'INTERVIEWERS',
  CANDIDATES: 'CANDIDATES'
}

// This endpoint is an example
router.post(
  '/populateTest',
  errorWrap(async (req, res) => {
    let newInterview = new FutureInterview({
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
    const workbook = XLSX.read(req.body['data'], { type: 'binary' })
    const sheetName = workbook.SheetNames
    const sheet = workbook['Sheets'][sheetName]
    const arr = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null })
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
      type: listType.INTERVIEWERS
    })
    const candidateAvail = await InterviewAvailability.findOneAndDelete({
      type: listType.CANDIDATES
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
      start_date = moment(new Date(value.startTime))
      return FutureInterview({
        candidates: [value.name.replace('_', ' ')],
        interviewers: value.interviewers.map(x => x.replace('_', ' ')),
        date: start_date.format('MM/DD/YYYY'),
        time: start_date.format('hh:mmA'),
        room: ""
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
    let workbook = XLSX.read(req.body['data'], { type: 'binary' })
    const sheetName = workbook.SheetNames
    let sheet = workbook['Sheets'][sheetName]
    let arr = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null })
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

const uploadInterviewAvailability = async (obj, isInterviewerList) => {
  let availability = new InterviewAvailability({
    type: isInterviewerList ? listType.INTERVIEWERS : listType.CANDIDATES,
    interviewDuration: 30,
    availabilities: obj.times,
    timeSlots: obj.allTimes
  })
  await availability.save()
}

// since the first 3 rows have merged cells for the month and date,
// we want to "unmerge" so there are no null cells in the month and date rows
const unmergeColumns = arr => {
  let valueToFill
  const NUM_DATE_ROWS = 2
  for (let i = 0; i < NUM_DATE_ROWS; i++) {
    for (let j = 1; j < arr[i].length; j++) {
      if (arr[i][j] !== null) {
        valueToFill = arr[i][j]
      } else {
        arr[i][j] = valueToFill
      }
    }
  }
}

const getTimesFromArray = arr => {
  let summaryDict = {}
  let timeArray = []
  // Index of first row in which candidates / interviewers have their times listed
  const STARTING_AVAILABILITY_ROW = 3
  for (let row = STARTING_AVAILABILITY_ROW; row < arr.length - 1; row++) {
    let personObj = {}
    personObj['name'] = arr[row][0]
    personObj['availableTimes'] = []
    for (let col = 1; col < arr[row].length; col++) {
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
  for (let col = 1; col < arr[0].length; col++) {
    let datetimeStr = `${arr[0][col]} ${arr[1][col]} ${arr[2][col]}`
    summaryDict['allTimes'].push(moment(datetimeStr, 'MMMM YYYY ddd DD hh:mm a').toDate())
  }
  return summaryDict
}

router.get(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const futureInterviews = await FutureInterview.find().sort({ _id: 1 })
    let interviews = []
    interviews = futureInterviews
    res.json({
      code: 200,
      message: 'Retrieved interview schedules',
      result: { interviews },
      success: true
    })
  })
)

router.delete(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const result = await FutureInterview.deleteMany({})
    console.log(result)
    res.json({
      code: 200,
      message: 'Deleted interview schedules',
      result: {},
      success: true
    })
  })
)
// END
module.exports = router
