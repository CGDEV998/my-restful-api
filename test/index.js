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

describe('Get /api/customer', () => {
    it('Should return 200 - /api/customer', (done) => {
        supertest(app)
            .get('/api/customer')
            .expect(200, done);
    });
    it('Should return 200 - /api/customer/id', (done) => {
        supertest(app)
            .get('/api/customer/id01')
            .expect(200, done);
    });
});

describe('Post /api/customer', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
            .post('/api/customer')
            .send({customername : "jimbo123"})
            .expect(200, done);
    });
});

describe('Put /api/customer/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
            .put('/api/customer/id01')
            .send({customername : "monkeyman1"})
            .expect(200, done);
    });
});

describe('Delete /api/customer/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
            .delete('/api/customer/id01')
            .expect(200, done);
    });
});

describe('Patch /api/customer/id', () => {
    it('Should return 200 status code (OK)', (done) => {
        supertest(app)
            .patch('/api/customer/id01')
            .send({customername: "newcustomername"})
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
