const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns empty array when passed empty array', () => {
    expect(formatDates([])).to.eql([])
  });
  it('returns new reference for articles array', () => {
    const testArticles = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = formatDates(testArticles)
    expect(actual).to.not.equal(testArticles)
  });
  it('returns new reference for article objects', () => {
    const testArticles = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const actual = formatDates(testArticles)
    expect(actual[0]).to.not.equal(testArticles[0])
  });
  it('converts created_at property to a js date object', () => {
    const testArticles = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    const formattedArticles = formatDates(testArticles)
    const expected = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: new Date(1542284514171),
      votes: 100,
    }];
    expect(formattedArticles).to.eql(expected)
  });
  it('does not mutate original articles array', () => {
    const testArticles = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    formatDates(testArticles);
    const unalteredArticle = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    expect(testArticles).to.eql(unalteredArticle)
  });
  it('does not mutate original articles objects', () => {
    const testArticles = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    formatDates(testArticles);
    const unalteredArticle = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }];
    expect(testArticles[0]).to.eql(unalteredArticle[0])
  });
 
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
