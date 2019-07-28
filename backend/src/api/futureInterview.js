const express = require('express')
var mongodb = require('mongodb')
const XLSX = require('xlsx')
const moment = require('moment')
const csv = require('csv-array')
const { errorWrap, leadsOnly } = require('../middleware')
const { FutureInterview, InterviewAvailability } = require('../models')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
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
      uploadInterviewAvailability(timeObj, false)
      res.json({
        code: 200,
        message: 'Populated.',
        result: {},
        success: true
      })
    } catch(e) {
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
  '/uploadInterviewers',
  errorWrap(async (req, res) => {
    var workbook = XLSX.read(req.body['data'], { type: 'binary' })
    const sheetName = workbook.SheetNames
    var sheet = workbook['Sheets'][sheetName]
    var arr = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null })
    unmergeColumns(arr)
    let timeObj = getTimesFromArray(arr)
    try {
      uploadInterviewAvailability(timeObj, true)
      res.json({
        code: 200,
        message: 'Populated.',
        result: {},
        success: true
      })
    } catch(e) {
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
   type: isInterviewerList ? "INTERVIEWERS" : "CANDIDATES",
   interviewDuration: 30,
   availabilities: obj.times,
   timeSlots: obj.allTimes

  })
  availability.save()
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
    let code = 500
    // TODO: do stuff
    // retrieve list of FutureInterviews and return them

    /*
    for (var idx = 0; idx < futureInterviews.length; idx++) {
      if (futureInterviews[idx].date > //!!current date - how do this?!!//) {
        interviews.push(futureInterviews[idx])
      }
    }
    */

    // for now we'll do:
    interviews = futureInterviews
    code = 200
    res.json({
      code,
      message: 'This endpoint must be implemented',
      result: { interviews },
      success: true
    })
  })
)

// END
module.exports = router
