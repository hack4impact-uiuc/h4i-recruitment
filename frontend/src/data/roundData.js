import React from 'react'
const secondRoundInterviewGuide =
  'https://docs.google.com/document/u/1/d/1wbSXTDOYskrTsXSs2x9pifd7DU69SguOI-e3_IycKrg/edit#heading=h.5rt6stjceyzq'
const firstRoundInterviewGuide =
  'https://docs.google.com/document/d/1xVxpMgomYvkR9cNXBc5hxKfhwi1sjb23W1fsYe3UNq4/edit'

const roundData = {
  rounds: [
    {
      type: 'faceMash',
      name: 'FaceMash',
    },
    {
      type: 'interview',
      name: 'Mass Interview',
      interviewGuide: firstRoundInterviewGuide,
      scored: true,
      sections: [
        {
          title: 'Set Question',
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
          response: {},
        },
      ],
    },
    {
      type: 'interview',
      name: 'Individual Interview',
      interviewGuide: secondRoundInterviewGuide,
      scored: false,
      sections: [
        {
          title: 'Time Commitment',
          description: (
            <b>
              Do they have the time to be able to make a worthwhile contribution to Hack4Impact?
              Were they hesitant? Did they answer like they were fine? Or was there a tone of
              precariousness. What do you think, by looking at their Time commitment?
            </b>
          ),
          type: 'notes',
          notesPrompt: 'Write down your notes for their response and your thoughts.',
          response: {},
        },
        {
          title: 'Initiative and Passion',
          description: (
            <b>
              Are they passionate about our mission? Have they previously worked with nonprofits
              before and if not, do they seem to really want to do so? Do they have initiative, the
              recognition to that they themselves have the responsibility to make things happen.
              Will they put in the time for Hack4Impact?
            </b>
          ),
          type: 'notes',
          notesPrompt:
            'Write down their response to Why Hack4Impact? As well as any other thoughts. Are they using this as a resume booster?',
          response: {},
        },
        {
          title: 'Community and Culture Fit',
          description: (
            <b>
              Identifying those who embody Intentionality, Curiosity, and Empathy... Are they
              someone you’d enjoy working with? Did they ask meaningful questions at the end? Are
              they an asshole? Are they arrogant?
            </b>
          ),
          type: 'notes',
          notesPrompt:
            'Write down their behavior and what you saw in them, if they embodied specific values of our organization. Write down the questions they asked. Were they really interested in joining our community or was it fake?',
          response: {},
        },
        {
          title: 'Resume and Tech Knowledge (3 points)',
          description: (
            <b>
              Do they have projects? Internships? Do they actually know what they are talking about?
              Do they understand the underlying technologies they’ve used? Do they know Web Dev?
            </b>
          ),
          type: 'notes',
          notesPrompt:
            "Note down if you think they were kind of bullshitting their responses and thus don't really know what they are doing.",
          response: {},
        },
        {
          title: 'Technical Challenge (5 points)',
          prompt: (
            <b>
              Look at the Github gist for the list of stuff we look for. Sensibility with data
              structures and functions, communication (clarifying, explaining), systematically
              narrow bugs, familiar with language are the main things we look for
            </b>
          ),
          prompt: 'Please note down the part they ended in/finished etc.',
          type: 'notes',
          notesPrompt:
            'Which part did they end in? Did they give the optimal solutions? Were they communicative and sensible with data structures and functions they use?',
          response: {},
        },
        {
          title: 'Category',
          description: [
            <b>
              This will be used in addition to the notes about the different aspects that you wrote
              about your interviewee. This category will be used heavily compared to the other
              sections. Be careful.
            </b>,
          ],
          prompt: <b>Place the candidate in a category:</b>,
          dropdownPrompt: 'Pick a Category',
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
            'Upperclassman with experience but eh with everything else',
          ],
          notesPrompt: 'Explain here why you’ve categorized the applicant like this.',
          response: {},
        },
      ],
    },
    {
      type: 'interview',
      name: 'Invalid Interview',
      sections: [
        {
          title: 'This should result in a message that the format is invalid',
        },
      ],
    },
  ],
}

export default roundData
