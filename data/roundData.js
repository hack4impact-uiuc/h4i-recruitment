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
        ]
      ]
    }
  ]
};
