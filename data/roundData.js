// import React from "../frontend/node_modules/react";
// this was an attempt to be able to parse jsx in this file, but I can't get that to work

export default {
  rounds: [
    {
      round: "0",
      type: "faceMash",
      name: "FaceMash"
    },
    {
      round: "1",
      type: "interview",
      name: "Mass Interview",
      categories: [
        {
          title: "Overall Score",
          minScore: 0,
          maxScore: 5
        }
      ]
    },
    {
      round: "2",
      type: "interview",
      name: "Individual Interview",
      categories: [
        {
          title: "Overall Score",
          minScore: 0,
          maxScore: 7
        },
        {
          title: "Time Commitment",
          minScore: 0,
          maxScore: 7,
          textResponse: "pointsExplanation"
        },
        {
          title: "Initiative and Passion",
          minScore: 0,
          maxScore: 5
        },
        {
          title: "Community",
          minScore: 0,
          maxScore: 5,
          textResponse: "contributeOrBoost"
        },
        {
          title: "Resume and Tech Knowledge",
          minScore: 0,
          maxScore: 3
        },
        {
          title: "Knowledge of Web Dev or Data",
          minScore: 0,
          maxScore: 2
        },
        {
          title: "Technical Challenge",
          minScore: 0,
          maxScore: 2
        }
      ],
      questions: [
        [
          {
            type: "title",
            title: "Time Commitment (7 Points)"
          },
          {
            type: "text",
            body: "some description or something"
          },
          {
            type: "dropdown",
            prompt: "Give them a score out of 7:",
            options: ["0", "1", "2", "3", "4", "5", "6", "7"]
          },
          {
            type: "prompt",
            prompt: "Explain why you awarded those points:"
          }
        ],
        [
          {
            type: "title",
            title: "Time Commitment (7 Points)"
          },
          {
            type: "text",
            body: "A list of seven things:"
          },
          {
            type: "list",
            items: ["0", "1", "2", "3", "4", "5", "6", "7"]
          },
          {
            type: "prompt",
            prompt: "Explain why you awarded those points:"
          }
        ]
      ]
    }
  ]
};
