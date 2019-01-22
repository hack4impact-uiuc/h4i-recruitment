import React from 'react'

const roundData = {
  rounds: [
    {
      type: 'faceMash',
      name: 'FaceMash'
    },
    {
      type: 'interview',
      name: 'Mass Interview',
      sections: [
        {
          title: 'General',
          description: (
            <b>
              Please write down your `Set` and the Set's title (`Set 1 openness/not a dick`) and the
              questions you asked as well as the notes you took from their answer and your thoughts.
            </b>
          ),
          prompt: <b>Give them a score out of 5:</b>,
          type: 'dropdown',
          scoreOptions: [0, 1, 2, 3, 4, 5],
          notesPrompt:
            'Please write down your `Set` and the questions you asked as well as the notes you took from their answer and your thoughts.',
          response: {}
        }
      ]
    },
    {
      type: 'interview',
      name: 'Individual Interview',
      sections: [
        {
          title: 'Time Commitment',
          description: (
            <b>Do they have the time to be able to make a worthwile contribution to Hack4Impact?</b>
          ),
          notesPrompt:
            'Write down your notes for their response and your thoughts. Were they hesitant? Did they answer like they were fine? Or was there a tone of precariousness. ',
          response: {}
        },
        {
          title: 'Resume and Tech Knowledge (3 points)',
          description: (
            <b>
              Do they have projects? Internships? Do they actually know what they are talking about?
              Do they understand the underlying technologies they’ve used?
            </b>
          ),
          prompt: <b>If you detect they were kind of bullshitting: -1 overall</b>,
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
            <b>This will be used in addition to the overall score you gave your interviewee.</b>
          ],
          prompt: <b>'Place the candidate in a category:</b>,
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
        },
        {
          title: 'Notes',
          description: <b>This is an example of what a notes-only question would look like.</b>,
          type: 'notes',
          notesPrompt: 'Put notes here.',
          response: {}
        }
      ]
    },
    {
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
