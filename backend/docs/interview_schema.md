# Interview Schema Backend Design

**INTERVIEW**

|   id  |   candidate_id  |   interviewer_key    |   sections  |  overall_score  |  general_notes  |
|:------:|:-------:|:------:|:-------:|:------:|:-------:|

**SECTION**

|   id  |  description | questions | section_notes |
|:------:|:-------:|:-------:|:-------:|

**QUESTION**

|   id  |   score   | question_text |
|:------:|:-------:|:------:|


## Endpoints Documentation 


GET ALL INTERVIEWS: 
* GET / | interview

GET SPECIFIC INTERVIEW: 
* GET /:interview | interview

CREATE INTERVIEW:
* POST / | done

DELETE INTERVIEW:
* DELETE /:interview | done

EDIT INTERVIEW: 
* PUT /:interview | done


### Endpoint

    GET /interview/
    Example: http://localhost:8080/interview/

**Description**

Get all interviews

**Response**

        {
            "code": 200,
            "message": "",
            "result": {
                "interviews": [
                    {
                        "sections": [
                            {
                                "questions": [
                                    {
                                        "_id": "5b70a4422227c1b0535f77e5",
                                        "question_text": "How many commitments does this person have?",
                                        "score": 3
                                    },
                                    {
                                        "_id": "5b70a4422227c1b0535f77e4",
                                        "question_text": "Will this person dedicate time to H4i?",
                                        "score": 2
                                    }
                                ],
                                "_id": "5b70a4422227c1b0535f77e3"
                            },
                            {
                                "questions": [
                                    {
                                        "_id": "5b70a4422227c1b0535f77e2",
                                        "question_text": "Web Dev Experience?",
                                        "score": 2
                                    }
                                ],
                                "_id": "5b70a4422227c1b0535f77e1"
                            }
                        ],
                        "_id": "5b70a4422227c1b0535f77e0",
                        "interviewer_key": "CaptainTim",
                        "overall_score": 3,
                        "general_notes": "Candidate is average",
                        "__v": 0
                    },
                    {
                        "sections": [
                            {
                                "questions": [
                                    {
                                        "_id": "5b70b21482a047b13f5c38b1",
                                        "question_text": "Web Dev Experience?",
                                        "score": 5
                                    }
                                ],
                                "_id": "5b70b21482a047b13f5c38b0",
                                "description": "Abilities",
                                "section_notes": "experience is impressive"
                            }
                        ],
                        "_id": "5b70a53b0fc430b062ea9ba8",
                        "interviewer_key": "CaptainDave",
                        "overall_score": 5,
                        "general_notes": "Candidate is above average but has time commitments",
                        "__v": 0
                    },
                    {
                        "sections": [
                            {
                                "questions": [
                                    {
                                        "_id": "5b70a58b2f4682b07d38530b",
                                        "question_text": "How many commitments does this person have?",
                                        "score": 3
                                    },
                                    {
                                        "_id": "5b70a58b2f4682b07d38530a",
                                        "question_text": "Will this person dedicate time to H4i?",
                                        "score": 2
                                    }
                                ],
                                "_id": "5b70a58b2f4682b07d385309",
                                "description": "Time commitment",
                                "section_notes": "time commitment is so-so"
                            },
                            {
                                "questions": [
                                    {
                                        "_id": "5b70a58b2f4682b07d385308",
                                        "question_text": "Web Dev Experience?",
                                        "score": 2
                                    }
                                ],
                                "_id": "5b70a58b2f4682b07d385307",
                                "description": "Abilities",
                                "section_notes": "experience is limited"
                            }
                        ],
                        "_id": "5b70a58b2f4682b07d385306",
                        "interviewer_key": "CaptainMeg",
                        "overall_score": 3,
                        "general_notes": "Candidate is average",
                        "__v": 0
                    }
                ]
            },
            "success": true
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

    http://localhost:8080/interview/5b70a58b2f4682b07d385306

**Response**
    
    {
    "code": 200,
    "message": "",
    "result": {
        "retInterview": {
            "sections": [
                {
                    "questions": [
                        {
                            "_id": "5b70a58b2f4682b07d38530b",
                            "question_text": "How many commitments does this person have?",
                            "score": 3
                        },
                        {
                            "_id": "5b70a58b2f4682b07d38530a",
                            "question_text": "Will this person dedicate time to H4i?",
                            "score": 2
                        }
                    ],
                    "_id": "5b70a58b2f4682b07d385309",
                    "description": "Time commitment",
                    "section_notes": "time commitment is so-so"
                },
                {
                    "questions": [
                        {
                            "_id": "5b70a58b2f4682b07d385308",
                            "question_text": "Web Dev Experience?",
                            "score": 2
                        }
                    ],
                    "_id": "5b70a58b2f4682b07d385307",
                    "description": "Abilities",
                    "section_notes": "experience is limited"
                }
            ],
            "_id": "5b70a58b2f4682b07d385306",
            "interviewer_key": "CaptainMeg",
            "overall_score": 3,
            "general_notes": "Candidate is average",
            "__v": 0
        }
    },
    "success": true
}
 
### Endpoint

    POST /add-interview
    
**Description**

Create Interview

**Body**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interviewer_key  | string | **Required** | key specific to interviewer
| candidate_id  | string | **Required** | candidate's id
| overall_score  | number | **Required** | overall score from 1-5
| general_notes  | number | **Required** | general notes on the interview
| sections  | array | **Required** | interview sections

**Example:**

    http://localhost:8080/interview/add-interview

    {
      "interviewer_key":"CaptainMeg",
      "sections": [
      {
        "description" : "Time commitment",
        "questions": [{
          "question_text":"How many commitments does this person have?",
          "score":"3"
        },
        {
          "question_text":"Will this person dedicate time to H4i?",
          "score":"2"
        }
        ],
      "section_notes": "time commitment is so-so"
      },
      {
        "description" : "Abilities",
        "questions": [{
          "question_text":"Web Dev Experience?",
          "score":"2"
        }
        ],
      "section_notes" : "experience is limited"
      }
      ],
      "candidate_id": "5678",
      "overall_score": 3,
      "general_notes": "Candidate is average"
    }

**Response**

        {
            "code": 200,
            "message": "Interview Added Sucessfully",
            "result": {},
            "success": true
        }

### Endpoint

    DELETE /:interview
    
**Description**

Delete Interview

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interview_id | string | **Required** | id of interview to delete

**Example:**

    http://localhost:8080/interview/5b708005b98769abef6bc0d5

**Response**

    {
            "code": 200,
            "message": "Interview Deleted Sucessfully",
            "result": {},
            "success": true
    }

### Endpoint

    PUT /:interview
    
**Description**

Edit an Interview, either the sections, overall_score, general_notes, or alls

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| interview_id | string | **Required** | id of interview to edit


**Body**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| sections  | array | **Not Required** | interview sections
| overall_score  | number | **Not Required** | overall score from 1-5
| general_notes | string | **Not Required** | general notes on the interview

**Example:**

    http://localhost:8080/interview/5b70a53b0fc430b062ea9ba8

    {
      "general_notes": "Candidate is above average but has time commitments"
    }

**Response**

    {
            "code": 200,
            "message": "Interview Edited Sucessfully",
            "result": {},
            "success": true
    }