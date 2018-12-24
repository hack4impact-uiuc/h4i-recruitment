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
  for (var i = 0; i < interviews.length; i++) {
    avgs += interviews[i].overall_score
  }
  if (interviews.length != 0) {
    avgs = avgs / interviews.length
  }
  return avgs
}
export { compareByFacemashScore, avgInterviewScore }
