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
    describe("GET", () => {
      it("status: 200, responds with an array of topic objects each having correct properties", () => {
        return request(app).get("/api/topics").expect(200);
      });
    });
  });
});
