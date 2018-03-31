import fetch from 'isomorphic-unfetch'

async function getCandidateById (id) {
  try {
    const res = await fetch(`http://localhost:8080/candidates/${id}`)
    return res.json()
  } catch (err) {
    return {'message': 'invalid'}
  }
}

function getAllCandidates () {
  return fetch('http://localhost:8080/candidates').then(res => res.json())
}

  // try {
  //   const res = await fetch('http://localhost:8080/candidates')
  //   return res.json()
  // } catch (err) {
  //   return {'message': 'invalid'}
  // }
// }

export {
  getCandidateById,
  getAllCandidates
}
