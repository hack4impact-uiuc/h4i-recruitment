export default {
  currentRound: 0,
  rounds: [
    {
      round: "0",
      type: "faceMash",
      name: "FaceMash",
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
      ]
    }
  ]
};
