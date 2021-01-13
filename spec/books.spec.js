const request = require('supertest');
const chai = require('chai');
const app = require('../index');
const expect = chai.expect;

describe('Testing API books for everyone',() => {
    describe('#GET /api/books', () => {
        it('should get all books', (done) => {
            request(app)
                .get('/api/books')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.not.empty;
                    done();
                })
        })
    })
    describe('#GET /api/books/{id}', () => {
        it('should get a book by ID', (done) => {
            request(app)
                .get('/api/books/1')
                .end((err,res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                })
        })
    })
    describe('#POST /api/books', () => {
        it('should not be available for everyone',(done) => {
            request(app)
                .post('/api/books')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    done();
                })
        })
    })
})


describe('Testing API books for admin',() => {
    let cookie = 'cookie';//'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJhZG1pbiIsImxvZ2luIjoiYWRtaW51c2VyIiwiaWF0IjoxNjEwNTQwMTM5LCJleHAiOjE2MTA2MjY1Mzl9.dQrVPrsf95q1EbAL8EB5DVKtLl7cc91ujnLqUU2y9xg; Max-Age=86400; Path=/; Expires=Thu, 14 Jan 2021 12:15:39 GMT; HttpOnly; SameSite=None';
    let id = 0;
    it("log in admin",(done) =>{
        request(app).post('/api/auth')
            .set({"Authorization": "basic " + new Buffer.from("testadmin:testadmin").toString("base64")})
            .end((err,res)=>{
                expect(res.statusCode).to.equal(200);
                cookie = res.headers['set-cookie'];
                done();
            });
    })
    describe('#POST /api/books', () => {
        it('should add a book', (done) => {
            request(app).post('/api/books')
                .send({
                    "title": "Krzyzacy",
                    "description": "Bitwa pod Grunwaldem",
                    "pages": 600,
                    "ID_publisher": 1,
                    "ID_genre": 1,
                    "releaseDate": "2020-11-30",
                    "ID_author": 1
                })
                .set('cookie', cookie)
                .set('Accept', '/application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.all.keys(['ID_book','title', 'description', 'pages', 'ID_publisher', 'ID_genre', 'releaseDate', 'ID_author']);
                    id = res.body.ID_book;
                    done();
                })
        })

        it('should return 400 when book does not have a title', (done) => {
            request(app).post('/api/books')
                .send({
                    "description": "Bitwa pod Grunwaldem",
                    "pages": 600,
                    "ID_publisher": 1,
                    "ID_genre": 1,
                    "releaseDate": "2020-11-30",
                    "ID_author": 1
                })
                .set('cookie', cookie)
                .set('Accept', '/application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    done();
                })
        })
    });
    describe("#PUT /api/books/{id}", () => {
        it('should return 201 when book is updated', (done) => {
            request(app).put('/api/books/' + id)
                .send({
                    "title": "Krzyzacy tom2"
                })
                .set('cookie', cookie)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    done();
                })
        })
    });
    describe('#DELETE /api/books/{id}', () => {
        it('should delete a book by ID and return 204', (done) => {
            request(app).delete('/api/books/' + id)
                .set('cookie',cookie)
                .end((err,res) => {
                    expect(res.statusCode).to.equal(204);
                    expect(res.body).to.be.empty;
                    done();
                })
        })
    });


})
