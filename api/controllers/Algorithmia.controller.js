"use strict";
var request = require('request');
var AlgorithmiaCtrl = function () {

    var AlgorithmiaObj = {};

    AlgorithmiaObj.Hello = function (req, res, next) {

        request({
                method: 'POST',
                url: 'http://api.algorithmia.com/v1/algo/demo/Hello/0.1.0',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Simple simR5LVbr4u6iRdPQ8GgjTAIIL21'
                },
                body: '"'+req.params.name+'"'
            }, function (error, response) {

                res.send(JSON.parse(response.body));

            }
        );


    };

    AlgorithmiaObj.Nudity = function (req, res, next) {

        request({
                method: 'POST',
                url: 'http://api.algorithmia.com/v1/algo/sfw/NudityDetectioni2v/0.2.12',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Simple simR5LVbr4u6iRdPQ8GgjTAIIL21'
                },
                body: '"'+req.body.url+'"'
            }, function (error, response) {

                res.send(JSON.parse(response.body));

            }
        );


    };

    AlgorithmiaObj.Language = function (req, res, next) {
        // console.log(req.body.sentence);
        request({
                method: 'POST',
                url: 'http://api.algorithmia.com/v1/algo/nlp/LanguageIdentification/1.0.0',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Simple simNnv1jd5ZjH0hT2Xa5XUT9/ih1'
                },
                body: JSON.stringify({sentence: req.body.sentence})
            }, function (error, response) {
                res.send(JSON.parse(response.body));
            }
        );


    };

    AlgorithmiaObj.WordFrequencyCounter = function(req,res,next){
        request({
            method: 'POST',
            url: 'http://api.algorithmia.com/v1/algo/diego/WordFrequencyCounter/0.2.0',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Simple simNnv1jd5ZjH0hT2Xa5XUT9/ih1'
            },
            body: '"'+req.body.input+'"'
        },function(error,response){
            res.send(JSON.parse(response.body));
        })
    };

    AlgorithmiaObj.FindRoommates = function (req, res, next) {
        request({
            method: 'POST',
            url: 'http://api.algorithmia.com/v1/algo/matching/StableRoommateAlgorithm/0.1.1',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Simple simNnv1jd5ZjH0hT2Xa5XUT9/ih1'
            },
            body: JSON.stringify(req.body)
        }, function (error, response) {
            res.send(JSON.parse(response.body));
        })
    };

    return AlgorithmiaObj;

};

module.exports = AlgorithmiaCtrl;