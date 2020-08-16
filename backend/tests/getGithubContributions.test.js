const { assert } = require('chai')
const { getGithubContributions } = require('../src/utils/gitScraper')

describe('getGithubContributions', () => {
  it('should return a string', async () => {
    let res = await getGithubContributions('https://github.com/shreyshrey1')
    assert.typeOf(res, 'string')
  })
})
