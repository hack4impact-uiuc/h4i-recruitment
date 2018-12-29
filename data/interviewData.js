export default {
  currentRound: 1,
  rounds: [
    {
      round: "0",
      type: "mass_interview",
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
      round: "1",
      type: "individual_interview",
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
