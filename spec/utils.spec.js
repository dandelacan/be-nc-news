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

describe('makeRefObj', () => {
  it('returns empty object when passed empty array', () => {
    expect(makeRefObj([])).to.eql({})
  });
  it('returns single entry ref object when passed single object array', () => {
    expect(makeRefObj([{ article_id: 1, title: 'A' }])).to.eql({ A: 1 });
  });
  it('returns multiple entry ref object when passed multiple object array', () => {
    const testArticles = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
    const expectedRefObj = { A: 1, B: 2, C: 3 };
    expect(makeRefObj(testArticles)).to.eql(expectedRefObj)
  });
  it('does not mutate passed array', () => {
    it('returns multiple entry ref object when passed multiple object array', () => {
      const testArticles = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
      makeRefObj(testArticles)
      const expected = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
      expect(testArticles).to.eql(expected)
    });
  });
});

const refObj = { a: "1", b: "2", c: "3" };

describe('formatComments', () => {
  it('returns a new array', () => {
    const testArr = []
    expect(formatComments(testArr)).to.not.equal(testArr)
  });
  it('returns empty array when passed empty arrayu', () => {
    expect(formatComments([])).to.eql([])
  });
  it('does not mutate passed array', () => {
    const testArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    formatComments(testArr, refObj)
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    expect(testArr).to.eql(expected)
  });
  it('correctly formats comments array when passed single object array and reference object', () => {
    const testArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    const actual = formatComments(testArr, refObj)
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: "1",
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389),
    }];
    expect(actual).to.eql(expected)
  });
  it('correctly formats comments array when passed single object array and reference object', () => {
    const testArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'b',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    }];
    const actual = formatComments(testArr, refObj)
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: "1",
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389),
    },{
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      article_id: '2',
      author: 'butter_bridge',
      votes: 14,
      created_at: new Date(1479818163389),
    }];
    expect(actual).to.eql(expected)
  });
  it('does not mutate original comment objects', () => {
    const testArr = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    formatComments(testArr, refObj);
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "a",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    expect(testArr[0]).to.eql(expected[0])
  });
  
});
