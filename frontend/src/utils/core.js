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

export { compareByFacemashScore }
