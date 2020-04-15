process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const { expect } = require('chai');

describe("/api", () => {
 
  beforeEach(() => {
    return connection.migrate.rollback()
      .then(() => {
        return connection.migrate.latest()
          .then(() => {
            return connection.seed.run()
          })
      })
  })
  after(() => connection.destroy());

  it('status: 404 invalid paths', () => {
    return request(app)
      .get('/api/invalidpath')
      .expect(404)
      .then((response) => {
      expect(response.body.msg).to.equal('path not found')
    })
  });

  describe("/topics", () => {
    it('status: 405, responds with error message when method not allowed', () => {
      const notAllowed = ["patch", "put", "delete"]
      const promiseArr = notAllowed.map(method => {
        return request(app)[method]('/api/topics')
          .expect(405)
          .then(({ body: { msg } })=> {
            expect(msg).to.equal('method not allowed')
          })
      })
      return Promise.all(promiseArr)
    })
  });
    describe("GET", () => {
      it("status: 200, responds with an array of topic objects each having correct properties", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body:{topics} })=> {
            topics.forEach(topic => {
              expect(topic).to.have.keys('slug', 'description')
            })
          
      });
    });
  });
  describe('/users', () => {
    describe('GET', () => {
      it('status: 200, responds with requested user object having all the correct keys', () => {
        return request(app)
          .get('/api/users/lurker')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.eql({
              username: 'lurker',
              name: 'do_nothing',
              avatar_url:
                'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            });
          });
      });
      it('status: 404, responds with error message when username is not valid', () => {
        return request(app)
          .get('/api/users/notAUsername')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('user not found');
          });
      });
    })
  });
});
