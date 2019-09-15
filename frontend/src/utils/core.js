// sort function
const compareByFacemashScore = (candidate1, candidate2) => {
  if (candidate1.facemashRankings == undefined) {
    return 0
  }
  if (candidate1.facemashRankings.elo > candidate2.facemashRankings.elo) {
    return -1
  }
  if (candidate1.facemashRankings.elo < candidate2.facemashRankings.elo) {
    return 1
  }
  return 0
}

const compareByAvgInterviewScore = (candidate1, candidate2) => {
  const avgScore1 = avgInterviewScore(candidate1.interviews)
  const avgScore2 = avgInterviewScore(candidate2.interviews)

  if (avgScore1 > avgScore2) {
    return -1
  }
  if (avgScore2 > avgScore1) {
    return 1
  }
  return 0
}

const getValidInterviews = interviews => {
  // filter down by interviews that are valid since there are some interview entries
  // which have "round" as the empty string, or some falsy value
  return interviews.filter(interview => interview.round)
}

const getNumOfInterviews = interviews => {
  // used by the dashboard to retrieve the interview count
  return getValidInterviews(interviews).length
}

const getScoredInterviews = interviews => {
  return getValidInterviews(interviews).filter(interview => interview.scored)
}

const avgInterviewScore = interviews => {
  if (!interviews || getScoredInterviews(interviews) == 0) {
    return 'N/A'
  }

  let sum = getScoredInterviews(interviews).reduce((total, i) => total + i.overall_score, 0)
  let scoredInterviews = getScoredInterviews(interviews).length

  return (sum / scoredInterviews).toFixed(3)
}

const interviewGetCategorySection = interview => {
  for (var i = 0; i < interview.sections.length; i++) {
    if (interview.sections[i].title == 'Category') {
      return interview.sections[i]
    }
  }
  return null
}

const convertUTCToLocal = utcStr => {
  const newDate = new Date(Date.parse(utcStr))
  return newDate.toLocaleString()
}

export {
  avgInterviewScore,
  compareByFacemashScore,
  compareByAvgInterviewScore,
  convertUTCToLocal,
  getNumOfInterviews,
  getScoredInterviews,
  interviewGetCategorySection,
}
