const url = "http://localhost:8080";
const request = require("supertest");
const app = require("../app");

describe("Server: ", () => {
    it("Is online", (done) => {
        request(app)
            .get("/")
            .set("Accept", "application/json")
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Check a known mutant: ", () => {
    it("should a mutant", (done) => {
        request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
            })
            .set("Accept", "application/json")
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Check a known human: ", () => {
    it("should a human", (done) => {
        request(app)
            .post("/mutant")
            .send({
                dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"],
            })
            .set("Accept", "application/json")
            .expect(403)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Get stats: ", () => {
    it("stats", (done) => {
        request(app)
            .get("/stats")
            .set("Accept", "application/json")
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("Check input: ", () => {
    it("should be an array", (done) => {
        request(app)
            .post("/mutant")
            .send({ dna: 1 })
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it("only allowed letters", (done) => {
        request(app)
            .post("/mutant")
            .send({ dna: ["ABC", "CBA", "BAC"] })
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it("should be an array n * n", (done) => {
        request(app)
            .post("/mutant")
            .send({ dna: ["ATG", "TGA"] })
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});