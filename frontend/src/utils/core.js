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
const getNumOfInterviews = interviews => {
  let total = 0
  for (var i = 0; i < interviews.length; i++) {
    if (
      interviews[i].overall_score !== undefined ||
      typeof interviews[i].overall_score === 'number'
    ) {
      total += 1
    }
  }
  return total
}
const avgInterviewScore = interviews => {
  if (interviews == undefined || !interviews || interviews.length === 0) {
    return 'N/A'
  }

  let avgs = 0
  let good_interviews = interviews.length // to prevent bad interviews from affecting it.
  for (var i = 0; i < interviews.length; i++) {
    if (
      interviews[i].overall_score !== undefined ||
      (typeof interviews[i].overall_score === 'number' && interviews[i].scored)
    ) {
      avgs += interviews[i].overall_score
    } else {
      good_interviews -= 1
    }
  }
  if (good_interviews != 0) {
    avgs = avgs / good_interviews
  }
  return avgs.toFixed(3)
}
export { compareByFacemashScore, avgInterviewScore, compareByAvgInterviewScore, getNumOfInterviews }
