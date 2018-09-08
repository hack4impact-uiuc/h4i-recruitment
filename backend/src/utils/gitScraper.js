const rp = require('request-promise')
const cheerio = require('cheerio')

function getGithubContributions(url) {
  const options = {
    uri: url,
    transform: body => cheerio.load(body)
  }
  return rp(options)
    .then($ => {
      return $('.js-yearly-contributions')
        .text()
        .trim()
        .split(' ')[0]
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  getGithubContributions
}
