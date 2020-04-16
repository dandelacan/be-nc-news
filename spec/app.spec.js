process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;

chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => {
    return connection.migrate.rollback().then(() => {
      return connection.migrate.latest().then(() => {
        return connection.seed.run();
      });
    });
  });
  after(() => connection.destroy());

  describe("invalid paths", () => {
    it("status: 404 invalid paths", () => {
      return request(app)
        .get("/api/invalidpath")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.equal("path not found");
        });
    });
  });

  describe("/topics", () => {
    describe("GET", () => {
      it("status: 200, responds with an array of topic objects each having correct properties", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            topics.forEach((topic) => {
              expect(topic).to.have.keys("slug", "description");
            });
          });
      });
    });
    describe("INVALID METHODS", () => {
      it("status: 405, responds with error message when method not allowed", () => {
        const notAllowed = ["patch", "put", "delete"];
        const promiseArr = notAllowed.map((method) => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("method not allowed");
            });
        });
        return Promise.all(promiseArr);
      });
    });
  });
  describe("/users:username", () => {
    describe("GET", () => {
      it("status: 200, responds with requested user object having all the correct keys", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.eql({
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            });
          });
      });
      it("status: 404, responds with error message when username is not valid", () => {
        return request(app)
          .get("/api/users/notAUsername")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("user not found");
          });
      });
    });
    describe("INVALID METHODS", () => {
      it("status: 405, responds with error message when method not allowed", () => {
        const notAllowed = ["patch", "put", "delete"];
        const promiseArr = notAllowed.map((method) => {
          return request(app)
            [method]("/api/users/lurker")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("method not allowed");
            });
        });
        return Promise.all(promiseArr);
      });
    });
  });
  describe("/articles", () => {
    describe.only("GET", () => {
      it("status: 200, responds with array of user objects having all the correct keys", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach((article) => {
              expect(article).to.have.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count",
                "body"
              );
            });
          });
      });
      it('status: 200, accepts to sort_by query', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at')
          })
          
      });
      it('status: 200, accepts to order query', () => {
        return request(app)
          .get('/api/articles?sort_by=votes&order=asc')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.ascendingBy('votes')
          })
      });
      it('status: 200, sort_by defaults to creates_at and order defaults to desc', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at')
          })
      });
      it('status: 200, accepts author query', () => {
        return request(app)
          .get('/api/articles?author=rogersop')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(3)
            articles.forEach(article => {
              expect(article.author).to.equal('rogersop')
            });
          });
      }); 
      it('status: 200, accepts topic query', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).to.equal(11)
            articles.forEach(article => {
              expect(article.topic).to.equal('mitch')
            });
          });
      });
      it('status: 400, sends error message when sort_by does not have valid key', () => {
        return request(app)
          .get('/api/articles?sort_by=invalid')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('invalid key/s')
          })
      });
      it("status: 400, returns error message when order is not asc or desc", () => {
        return request(app)
          .get("/api/articles/?order=invalid")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("order query must be asc or desc");
          });
      });
      it("status: 404, returns error message author does not exist", () => {
        return request(app)
          .get("/api/articles/?author=dan")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("no articles found");
          });
      });
      it("status: 404, returns error message topic does not exist", () => {
        return request(app)
          .get("/api/articles/?topic=dan")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("no articles found");
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    describe("GET", () => {
      it("status: 200, responds with requested user object having all the correct keys", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.have.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(article.comment_count).to.equal("13");
          });
      });
      it("status: 404, responds with error message when article id is not valid", () => {
        return request(app)
          .get("/api/articles/666")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("no articles found");
          });
      });
    });
    describe("PATCH ", () => {
      it("status: 200, increments votes and responds with updates article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(101);
          });
      });
      it("status: 404, responds with error message when article id is not valid", () => {
        return request(app)
          .patch("/api/articles/666")
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("invalid article id");
          });
      });
      it("status: 400, responds with error message when body does not contain inc_votes", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ votes: 1 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("missing key/s");
          });
      });
      it("status: 400, increments votes and responds with updates article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "twenty" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("missing key/s");
          });
      });
    });
    describe("POST /comments", () => {
      it("status: 201, accepts username and body and responds with new comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "lurker", body: "fake news!" })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(comment.body).to.equal("fake news!");
          });
      });
      it("status: 422, responds with error message when passed invalid article id", () => {
        return request(app)
          .post("/api/articles/666/comments")
          .send({ username: "lurker", body: "fake news!" })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("resource does not exist");
          });
      });
      it("status: 400, responds with error message when passed incorrect body keys", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ body: "fake news!" })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("body has wrong keys");
          });
      });
      it("status: 422, responds with error message when username does not exist", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "dan", body: "fake news!" })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("resource does not exist");
          });
      });
    });
    describe("GET /comments", () => {
      it("status: 200 responds with an array of comments relating to article id having correct keys", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments.length).to.equal(13);
            comments.forEach((comment) => {
              expect(comment).to.have.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
            });
          });
      });
      it("status: 200 responds with an array of comments default sorted by created_at desc", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy("created_at");
          });
      });
      it("status: 200 accepts sort_by query and order defaults to desc", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy("votes");
          });
      });
      it("status: 200 accepts order query", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes&order=asc")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy("votes");
          });
      });
      it("status: 400 returns error message when sort_by key does not exist", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=invalidKey")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("invalid key/s");
          });
      });
      it("status: 400 returns error message when order is not asc or desc", () => {
        return request(app)
          .get("/api/articles/1/comments?order=invalid")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("order query must be asc or desc");
          });
      });
      it("status: 404 returns error message when articles does not exist", () => {
        return request(app)
          .get("/api/articles/666/comments")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("no comments found");
          });
      });
    });
  });
});
