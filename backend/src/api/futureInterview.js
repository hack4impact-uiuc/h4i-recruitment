const express = require('express')
var mongodb = require('mongodb')
const { errorWrap, leadsOnly } = require('../middleware')
const { FutureInterview } = require('../models')
const keyPath =
  process.env.NODE_ENV === 'test' ? '../../tests/artifacts/test-keys.json' : process.env.KEY_JSON
const keyData = require(keyPath)

const router = express.Router()

router.post(
  '/schedule/upload',
  [leadsOnly],
  errorWrap(async (req, res) => {
    const data = req.body
    let response = 'Schedule Adding Failed'
    let code = 404

    //TODO: do stuff
    //await "FutureInterview.ParseSchedule()"? or just do the logic here
    response = 'Schedule Added Sucessfully'
    code = 200
    res.json({
      code,
      message: response,
      result: {},
      success: true
    })
  })
)

router.post(
  '/schedule/populateTest',
  errorWrap(async (req, res) => {
    var newInterview = new FutureInterview({
      candidate_id: '1234',
      candidate_name: 'Steve Jobs',
      interviewer_key: 'tkol',
      interviewer_name: "Tim Ko",
      room: "Room A",
      date: "1/24",
      time: "10:00AM"
    })
    await newInterview.save()

    newInterview = new FutureInterview({
      candidate_id: '5678',
      candidate_name: 'Bill Gates',
      interviewer_key: 'tkol',
      interviewer_name: "Tim Ko",
      room: "Room B",
      date: "1/25",
      time: "2:00PM"
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
  '/schedule',
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
      result: {interviews},
      success: true
    })
  })
)

//END
module.exports = router
