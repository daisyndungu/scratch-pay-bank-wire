const chai = require('chai')
const chaiHTTP = require('chai-http')

import app from '../index';

const should = chai.should()
chai.use(chaiHTTP)

describe('Business Date With Delay', function () {
    const baseUrl = '/api/v1/businessDates/getBusinessDateWithDelay'

    describe('/POST Date', function () {
        it('It should return November 15th, 2 weekend days and 1 holiday day', done => {
            chai.request(app)
                .post(baseUrl)
                .send({ initialDate: '2018-11-10T10:10:10Z', delay: 3 })
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2018-11-15T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(2);
                    res.body.results.should.have.property('holidayDays').eql(1);
                    done();
                });
        })
    })

    describe('/POST Date', function () {
        it('It should return November 19th, 2 weekend days and 0 holiday day', done => {
            chai.request(app)
                .post(baseUrl)
                .send({ initialDate: '2018-11-15T10:10:10Z', delay: 3 })
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2018-11-19T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(2);
                    res.body.results.should.have.property('holidayDays').eql(0);
                    done();
                });
        })
    })

    describe('/POST Date', function () {
        it('It should return January 18th 2019, 8 weekend days and 2 holiday day', done => {
            chai.request(app)
                .post(baseUrl)
                .send({ initialDate: '2018-12-25T10:10:10Z', delay: 20 })
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2019-01-18T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(6);
                    res.body.results.should.have.property('holidayDays').eql(2);
                    done();
                });
        });
    });

    describe('/POST Date', function () {
        it('It should return an empty businessDate when no date is provided', done => {
            chai.request(app)
                .post(baseUrl)
                .send({ initialDate: '', delay: '' })
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.should.have.property('ok').eql(false);
                    res.body.results.should.have.property('businessDate').eql('');
                    res.body.results.should.have.property('weekendDays').eql(0);
                    res.body.results.should.have.property('holidayDays').eql(0);
                    res.body.results.should.have.property('totalDays').eql(0);
                    done();
                });
        });
    });

    describe('/POST Date', function () {
        it('It should return an empty businessDate and ok status should false when date is invalid', done => {
            chai.request(app)
                .post(baseUrl)
                .send({ initialDate: '2018-13-65T10:10:10Z', delay: 3 })
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.should.have.property('ok').eql(false);
                    res.body.results.should.have.property('businessDate').eql('');
                    res.body.results.should.have.property('weekendDays').eql(0);
                    res.body.results.should.have.property('holidayDays').eql(0);
                    res.body.results.should.have.property('totalDays').eql(0);
                    done();
                });
        });
    });

    describe('/GET Date', function () {
        it('It should return November 15th, 2 weekend days and 1 holiday day', done => {
            chai.request(app)
                .get(`${baseUrl}?initialDate=2018-11-10T10:10:10Z&delay=3`)
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2018-11-15T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(2);
                    res.body.results.should.have.property('holidayDays').eql(1);
                    done();
                });
        })
    })

    describe('/GET Date', function () {
        it('It should return November 19th, 2 weekend days and 0 holiday day', done => {
            chai.request(app)
                .get(`${baseUrl}?initialDate=2018-11-15T10:10:10Z&delay=3`)
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2018-11-19T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(2);
                    res.body.results.should.have.property('holidayDays').eql(0);
                    done();
                });
        })
    })

    describe('/GET Date', function () {
        it('It should return January 18th 2019, 8 weekend days and 2 holiday day', done => {
            chai.request(app)
                .get(`${baseUrl}?initialDate=2018-12-25T10:10:10Z&delay=20`)
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.results.should.have.property('businessDate').eql('2019-01-18T10:10:10.000Z');
                    res.body.results.should.have.property('weekendDays').eql(6);
                    res.body.results.should.have.property('holidayDays').eql(2);
                    done();
                });
        });
    });

    describe('/GET Date', function () {
        it('It should return an empty businessDate when no date is provided', done => {
            chai.request(app)
                .get(`${baseUrl}?initialDate=&delay=`)
                .end((err, res) => {
                    res.body.should.have.property('results');
                    res.body.should.have.property('ok').eql(false);
                    res.body.results.should.have.property('businessDate').eql('');
                    done();
                });
        });
    });

    describe('/GET Date', function () {
        it('It should return an empty businessDate and ok status should false when inital date is invalid', done => {
            chai.request(app)
                .get(`${baseUrl}?initialDate=2018-12-55T10:10:10Z&delay=3`)
                .end((err, res) => {
                    res.body.should.have.property('ok').eql(false);
                    res.body.results.should.have.property('businessDate').eql('');
                    done();
                });
        });
    });
})