const express = require('express')
var mongodb = require('mongodb')
const csv = require('csv-array')
const { errorWrap, leadsOnly } = require('../middleware')
const { FutureInterview } = require('../models')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)

const router = express.Router()

router.post(
  '/upload',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body['schedule']
    console.log(data)
    let response = 'Schedule Adding Failed'
    let code = 404

    //TODO: parse schedule
    var arr = data.split('\n').map(function(e) {
      return e.split(',')
    })
    var date = arr[0][0]
    var headers = arr[0]

    for (var i = 1; i < arr.length; i++) {
      for (var j = 1; j < arr[i].length; j++) {
        if (arr[i][j] === '') continue

        var interview = arr[i][j]
        var interviewers = interview
          .split(':')[1]
          .split(';')[0]
          .split('&')
          .map(s => s.trim())
        var interviewees = interview
          .split(':')[2]
          .split('&')
          .map(s => s.trim())

        let newInterview = new FutureInterview({
          candidates: interviewees,
          interviewers: interviewers,
          room: arr[0][j],
          date: date,
          time: arr[i][0]
        })
        const res = await newInterview.save()
        console.log(res)
      }
    }

    response = 'Schedule Added Sucessfully'
    code = 200
    res.json({
      code,
      message: response,
      result: data,
      success: true
    })
  })
)

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

router.get(
  '/',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const futureInterviews = await FutureInterview.find()
    let interviews = []
    let code = 500
    //TODO: do stuff
    //retrieve list of FutureInterviews and return them

    /*
    for (var idx = 0; idx < futureInterviews.length; idx++) {
      if (futureInterviews[idx].date > //!!current date - how do this?!!//) {
        interviews.push(futureInterviews[idx])
      }
    }
    */

    //for now we'll do:
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

//END
module.exports = router
