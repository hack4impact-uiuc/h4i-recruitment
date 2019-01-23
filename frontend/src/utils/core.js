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
const avgInterviewScore = interviews => {
  if (interviews == undefined || !interviews || interviews.length === 0) {
    return 'N/A'
  }

  let avgs = 0
  let good_interviews = interviews.length // to prevent bad interviews from affecting it.
  for (var i = 0; i < interviews.length; i++) {
    if (
      interviews[i].overall_score !== undefined ||
      typeof interviews[i].overall_score === 'number'
    ) {
      avgs += interviews[i].overall_score
    } else {
      good_interviews -= 1
    }
  }
  if (good_interviews != 0) {
    avgs = avgs / good_interviews
  }
  return avgs
}
export { compareByFacemashScore, avgInterviewScore }
