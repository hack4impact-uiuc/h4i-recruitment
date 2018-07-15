const request = require('supertest')
const app = require('../src/app')
const sinon = require('sinon');
const { Candidate } = require('../src/models')
const { expect, assert } = require('chai')
const {getGithubContributions} = require('../src/utils/gitScraper')

describe ('getGithubContributions', () => {
    it ('should return a string', async () => {
      assert.typeOf(getGithubContributions("https://github.com/shreyshrey1"), 'string');
      assert.typeOf(getGithubContributions("https://github.com/tko22"), 'string');
      assert.typeOf(getGithubContributions("https://github.com/angadgarg25"), 'string');
      assert.typeOf(getGithubContributions("https://github.com/rgychiu"), 'string');
      assert.typeOf(getGithubContributions("https://github.com/CodeBrew28"), 'string');
    })
  })