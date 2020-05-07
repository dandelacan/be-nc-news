# Northcoders News API

Northcoders News API is a restful api for a fictional social news website. The project can be run loacally using the instructions below and is also [hosted on heroku](https://djh-nc-news.herokuapp.com/api)

## Running the project locally

### Prerequisites
This project requires  [npm](https://www.npmjs.com/get-npm), [PostgreSQL](https://www.postgresql.org/) , and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to run. 

### Installation
1. Fork a copy of the repo onto your machine then from the rood rirectory run the command 
```bash
npm install
```
to install the projects dependencies.

2. Create a knexfile.js in the root directory which should contain the following:
```js
const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
      // if using Linux, enter your username and password here"
      // username: 'yourUsername'
      // password: 'yourPassword'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // if using Linux, enter your username and password here"
      // username: 'yourUsername'
      // password: 'yourPassword'
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```
3. Setup local database and seed with data using the command
```bash
npm run seed
```
4. Run the server locally
```bash
npm start
```
the server will now be listingin on port 9900

### Testing
Run test files using the command
```bash
npm test
```
## Endpoints

```http
GET  /api
```
* serves up a list of all available endpoints

---
```http
GET /api/topics
```
* serves an array of all topics
* example response
```json
{"topics": [{ "slug": "football", "description": "Footie!" }]}
```
---
```http
GET /api/users/:username
```
* serves user object of specified username parameter
* example response
```json
{"user": {
  "username": "cooljmessy",
  "name": "Peter Messy",
  "avatar_url": "https://i.imgur.com/WfX0Neu.jpg" 
  }
}
```
---
```http
GET /api/articles
```
* serves an array of all article
* queries
  * author
  * topic
  * sort_by 
  * order [asc or desc]
* example response
```json
{"user": {
  "username": "cooljmessy",
  "name": "Peter Messy",
  "avatar_url": "https://i.imgur.com/WfX0Neu.jpg"
  }
}
```
---
```http
GET /api/articles/:artice_id
```
* serves an article object specified by parameter
* example response
```json
{"article": 
  { "article_id": "2",
  "title": "Seafood substitutions are increasing",
  "topic": "cooking",
  "author": "weegembump",
  "body": "Text from the article..",
  "created_at": 1527695953341,
  "votes": "100",
  "comment_count": "2"
  }
}
```
---
```http
PATCH /api/articles/:artice_id
```
* increments votes of article specified by article_id parameter, responds with updated article object
* example request body
```json
{"inc_votes": "1"}
```
* example response
```json
{
      "article": 
        { "article_id": "2",
          "title": "Seafood substitutions are increasing",
          "topic": "cooking",
          "author": "weegembump",
          "body": "Text from the article..",
          "created_at": 1527695953341,
          "votes": "100",
          "comment_count": "2"
        }
    }
```
---
```http
POST /api/articles/:artice_id/comments
```
* accepts username and body properties in request body, creates new comment and responds with new comment
* example request body
```json
{"username": "danh", "body":"Text from the comment.."}
```
* example response
```json
{
      "comment": 
        { "comment_id":"1",
          "author":"danh",
          "article_id":"2",
          "votes":"100",
          "created_at":1527695953341,
          "body":"Text from the comment.."
        }
    }
```
---
```http
GET /api/articles/:artice_id/comments
```
* serves an array of comments associated with article specified by article_id parameter
* queries
  * sort_by 
  * order [asc or desc]
* example response
```json
 {
      "comments": 
        [{ "comment_id":"1",
          "author":"danh",
          "article_id":"2",
          "votes":"100",
          "created_at":1527695953341,
          "body":"Text from the comment.."
        }]
    }
```
---
```http
PATCH /api/comments/:comment_id
```
* increments votes of comment specified by comment_id parameter, responds with updated comment object
* example request body
```json
{"inc_votes": "1"}
```
* example response
```json
{
      "comment": 
      { "comment_id":"1",
        "author":"danh",
        "article_id":"2",
        "votes":"100",
        "created_at":1527695953341,
        "body":"Text from the comment.."
      }
    }
```
---
```http
DELETE /api/comments/:comment_id
```
* deletes comment specified by comment_id parameter without a response

