import React from 'react'

const roundData = {
  rounds: [
    {
      round: '0',
      type: 'faceMash',
      name: 'FaceMash'
    },
    {
      round: '1',
      type: 'interview',
      name: 'Mass Interview',
      sections: [
        {
          title: 'Time Commitment (7 points)',
          description: [
            React.createElement('b', '-1 for each:'),
            React.createElement('ul', [
              React.createElement(
                'li',
                'Exec member for another org Consulting Club such as IBC, OTCR'
              ),
              React.createElement(
                'li',
                'Some other club that requires time that I can&#39;t think of (ex: Enactus Fraternity Pledge during the same semester)'
              ),
              React.createElement('li', 'Hard/Time-consuming classes')
            ]),
            React.createElement('b', '-2 for each:'),
            React.createElement('ul', [
              React.createElement(
                'li',
                'Hard course-load (still take one point off for each hard class they have as described above)'
              ),
              React.createElement('li', 'Too many org obligations')
            ])
          ],
          prompt: [React.createElement('b', 'Give them a score out of 7:')],
          type: 'dropdown',
          scoreOptions: [0, 1, 2, 3, 4, 5, 6, 7],
          notesPrompt: 'Explain why you gave them those points:',
          response: {}
        },
        {
          title: 'Initiative and Passion (5 points)',
          type: 'multiple choice',
          scoreOptions: [0, 1, 2, 3, 5],
          textOptions: [
            'Definitely using this as a resume booster',
            'Simply applied, no real knowledge of what we do',
            'Thinking about how Hack4Impact fits into their plans',
            'Thinking about how they fit into Hack4Impact plans',
            'Goes above and beyond and gives you a new idea on how you can contribute to the org'
          ],
          response: {}
        },
        {
          title: 'Community (5 points)',
          description: [
            React.createElement('b', 'Gauging Community is really hard. Fill this out in the end.'),
            React.createElement(
              'p',
              'Identifying those who embody Intentionality, Curiosity, and Empathy... Subtract the points from 7.'
            ),
            React.createElement('b', 'Asking Questions at the end:'),
            React.createElement('ul', [
              React.createElement('li', '-2 points: Didn’t ask you any questions at end'),
              React.createElement(
                'li',
                '-1 point: Asked you some BS questions. Beyond just logistical question'
              ),
              React.createElement(
                'li',
                'Asked you solid questions and about what we do, what you do, your recommendation, etc: Great!'
              )
            ]),
            React.createElement('b', 'Technical Interview Portion:'),
            React.createElement('ul', [
              React.createElement(
                'li',
                '-1 point: Didn’t communicate with you at all during technical interview'
              ),
              React.createElement('li', 'Let you know what and why they chose to do things: Great!')
            ]),
            React.createElement('b', 'Subjective:'),
            React.createElement('ul', [
              React.createElement(
                'li',
                'No: -2 Meh: -1. Hell ya: 0 Are they someone you’d enjoy working with?'
              )
            ])
          ],
          prompt: [React.createElement('b', 'Give them score out of 5:')],
          type: 'dropdown',
          scoreOptions: [0, 1, 2, 3, 4, 5],
          notesPrompt:
            'Will they contribute to community or are they just using this as a resume booster? Explain your reasoning for your score.',
          response: {}
        }
      ]
    },
    {
      round: '2',
      type: 'interview',
      name: 'Individual Interview',
      sections: [
        {
          title: 'Resume and Tech Knowledge (3 points)',
          description: [
            React.createElement(
              'b',
              'Do they have projects? Internships? Do they actually know what they are talking about? Do they understand the underlying technologies they’ve used?'
            )
          ],
          prompt: [
            React.createElement('b', 'If you detect they were kind of bullshitting: -1 overall')
          ],
          type: 'multiple choice',
          scoreOptions: [0, 1, 2, 3],
          textOptions: [
            'No experience, or completely BS their experience',
            'can speak about one or two projects, or a meh internship. Doesn’t really have an in -depth understanding of what they’ve used.',
            'can speak to one internship with great experience or multiple projects',
            'Multiple.'
          ],
          response: {}
        },
        {
          title: 'Knowledge of Web Dev or Data (2 points)',
          type: 'multiple choice',
          scoreOptions: [0, 1, 2],
          textOptions: [
            'No experience',
            'Some experience with it, has done a couple projects, knows what flask is, experience with ltk, data visualizations. etc.',
            'Knows more than you - if they are a you think they could be a tech lead'
          ],
          response: {}
        },
        {
          title: 'Technical Challenge (5 points)',
          type: 'multiple choice',
          scoreOptions: [0, 1, 2, 3, 4, 5],
          textOptions: [
            'couldn’t complete',
            'completed but with a lot of help/slow',
            'completed in a reasonable amount of time with help',
            'completed in a reasonable amount of time with minimal help',
            'completed in reasonable amount of time with no help',
            'damn [enter pronoun]’s good'
          ],
          response: {}
        },
        {
          title: 'Category',
          description: [
            React.createElement(
              'b',
              'This will be used in addition to the overall score you gave your interviewee.'
            )
          ],
          prompt: [React.createElement('b', 'Place the candidate in a category:')],
          type: 'dropdown',
          textOptions: [
            'Freshman - maybe',
            'Freshman - with lack of experience but high potential and initiative',
            'Freshman - yes',
            'Don’t Accept',
            'Weak maybe (eh)',
            'Maybe ( I wouldn’t necessarily accept this candidate, but I’m open to if others are)',
            'Strong Maybe (I wouldn’t fight to accept this candidate, but I think they would be a good addition to the team)',
            'Strongly Vouch for this candidate',
            'Upperclassman with experience but eh with everything else'
          ],
          notesPrompt: 'Explain here why you’ve categorized the applicant like this.',
          response: {}
        }
      ]
    },
    {
      round: '3',
      type: 'interview',
      name: 'Invalid Interview',
      sections: [
        {
          title: 'This should result in a message that the format is invalid'
        }
      ]
    }
  ]
}

export default roundData
