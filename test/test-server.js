process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../api/app');


var should = chai.should();

chai.use(chaiHttp);

describe('Algorithms', function () {


    it('should say Hello demo on /hello/demo GET', function (done) {
        chai.request(server)
            .get('/hello/demo')
            .end(function (err, res) {
                res.should.have.status(200)
                res.body.result.should.equal('Hello demo');
                done();
            });


    });

    it('should say Hello test on /hello/test GET', function (done) {
        chai.request(server)
            .get('/hello/test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.result.should.equal('Hello test');
                done();
            });


    });

    it('should tell that the image containing a naked man contains nudity', function (done) {
        chai.request(server)
            .post('/nudity')
            .send({
                'url': 'http://www.isitnude.com.s3-website-us-east-1.amazonaws.com/assets/images/sample/young-man-by-the-sea.jpg'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.result.nude.should.be.true;
                res.should.be.json
                done();
            });


    });

    it('should tell that the image containing a clothed man contains no nudity', function (done) {
        chai.request(server)
            .post('/nudity')
            .send({
                'url': 'https://s3.r29static.com//bin/entry/983/1920x2623,80/2013550/image.jpg'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.result.nude.should.be.false;
                res.should.be.json
                done();
            });


    });

    it('should tell in what language the text is written', function (done) {
        chai.request(server)
            .post('/detectLanguage')
            .send({
                sentence: 'Hello. My name is Andre. This is English language.'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                // console.log(res.body.result[0].language);
                res.body.result[0].language.should.equal('en');
                done();
            });
    });

    it('should count all words in sentence "That is awesome is list a list a a list list list ok ok ok numbers"',function(done){
        chai.request(server)
        .post('/wordFrequencyCounter')
        .send({
            'input':'That is awesome is list a list a a list list list ok ok ok numbers'
        })
        .end(function(err,res){
            res.should.have.status(200);
            res.body.result.list.should.be.equal(5);
            res.body.result.is.should.be.equal(2);
            res.body.result.awesome.should.be.equal(1);
            res.body.result.numbers.should.be.equal(1);
            res.body.result.ok.should.be.equal(3);
            done();
        });
    });

    it('should tell which roommates match', function(done) {
        chai.request(server)
            .post('/find-roommates')
            .send({
                "preferences": {
                    "Charlie": ["Peter", "Paul", "Sam", "Kelly", "Elise"],
                    "Peter": ["Kelly", "Elise", "Sam", "Paul", "Charlie"],
                    "Elise": ["Peter", "Sam", "Kelly", "Charlie", "Paul"],
                    "Paul": ["Elise", "Charlie", "Sam", "Peter", "Kelly"],
                    "Kelly": ["Peter", "Charlie", "Sam", "Elise", "Paul"],
                    "Sam": ["Charlie", "Paul", "Kelly", "Elise", "Peter"]
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.result.Charlie.should.equal('Paul');
                done();
            });
    });


});
