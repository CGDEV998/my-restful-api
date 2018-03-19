const supertest = require('supertest');
const app = require('../index.js');

describe('Get /', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
            .get('/')
            .expect(200, done);
    });
});

describe('Get /api/non-existant url', () => {
    it ('Should return 404 status code (Not Found)', (done) => {
        supertest(app)
        .get('/api/idontexist')
        .expect(404, done);
    });
});

describe('Get /api/user', () => {
    it('Should return 200 - /api/user', (done) => {
        supertest(app)
        .get('/api/user')
        .expect(200, done);
    });
    it('Should return 200 - /api/user/id', (done) => {
        supertest(app)
        .get('/api/user/id01')
        .expect(200, done);
    });
});

describe('Post /api/user', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
        .post('/api/user')
        .send({username : "jimbo123"})
        .expect(200, done);
        });
    });

describe('Put /api/user/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
        .put('/api/user/id01')
        .send({username : "monkeyman1"})
        .expect(200, done);
    });
});

describe('Delete /api/user/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
        .delete('/api/user/id01')
        .expect(200, done);
    });
});

describe('Patch /api/user/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
        .patch('/api/user/id01')
        .send({username: "newusername"})
        .expect(200, done);
    });
});

describe('Get /api', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
        .get('/api')
        .expect(200, done);
    });
});
