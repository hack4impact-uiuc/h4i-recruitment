# Interview Schema Backend Design

**INTERVIEW**

|   id  |   candidate  |   interviewer_key    |   sections  |overall_score    |  general_notes  |
|:------:|:-------:|:------:|:-------:|:------:|:-------:|

**SECTION**

|   id  |  questions  |
|:------:|:-------:|

**QUESTION**

|   id  |   score   | question_text |
|:------:|:-------:|:------:|


## Endpoints Documentation 


GET ALL INTERVIEWS: 
* GET /interviews | <interview>

GET SPECIFIC INTERVIEW: 
* GET /interview | <interview>

CREATE INTERVIEW:
* POST /add-interview | done

DELETE INTERVIEW:
* DELETE /delete-interview | done

VERIFY INTERVIEWER:
* GET /verify-interview| true/false

EDIT INTERVIEW: 
* PUT /edit-interview | done


### Endpoint

    GET /interview/
    Example: http://localhost:8080/interview/

**Description**

Get all interviews

**Response**

    {
      "result": [
          {
              "_id": "5b66815645ce0d8ac2bcb64f",
              "interviewerKey": "1234",
              "sections": [
                  {
                      "questions": [],
                      "_id": "5b66815645ce0d8ac2bcb650"
                  }
              ],
              "overallScore": 5,
              "__v": 0
          },
          ...
      ]
    }

### Endpoint

    GET /interview_id:
    
**Description**

Get one interview by Id

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interview_id  | string | **Required** | interview id

**Example:**

    http://localhost:8080/interview/5b66815645ce0d8ac2bcb64f

**Response**
    
    {
      "interview": {
          "_id": "5b66815645ce0d8ac2bcb64f",
          "interviewerKey": "1234",
          "sections": [
              {
                  "questions": [],
                  "_id": "5b66815645ce0d8ac2bcb650"
              }
          ],
          "overallScore": 5,
          "__v": 0
      }
    }
 
### Endpoint

    POST /add-interview
    
**Description**

Create Interview

**Body**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interviewerKey  | string | **Required** | key specific to interviewer
| sections  | array | **Required** | interview sections
| questions  | array | **Required** | interview questions
| candidateId  | string | **Required** | candidate's id
| overallScore  | number | **Required** | overall score from 1-5

**Example:**

    http://localhost:8080/interview/add-interview

    {
      "interviewerKey":"SGghdfj",
      "sections": [{
          "questions": [{
            "questionText":"How much Time commitment?",
            "answer":"5"
          }]
      }],
      "candidateId": "5678",
      "overallScore":3
    }

**Response**

    {
        "result": "Interview Added Sucessfully"
    }

### Endpoint

    DELETE /:interview
    
**Description**

Delete Interview

**Body**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interview_id | string | **Required** | id of interview to delete

**Example:**

    http://localhost:8080/interview/5b708005b98769abef6bc0d5

**Response**

    {
      "result": "Interview Deleted Sucessfully"
    }