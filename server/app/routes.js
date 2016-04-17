var votersCountModel = require('./models/votersCountModel');
var userModel = require('./models/userModel');
var provinceModel = require('./models/provinceModel');
var resultModel = require('./models/resultModel');

module.exports = function (app) {

    var sendDataCallback = function(res, data) {
        console.log("sendDataCallback data: ", data);
        res.send(JSON.stringify(data));
    }
    
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

 //   app.get('/api/post/:id', function (req, res) {      
   //     res.send(postsModel.getPost(req.params.id));
    // });

    app.get('/voters/male', function (req, res) {        
        votersCountModel.getMaleCount(req.params.id,res,sendDataCallback);
    });

    app.get('/voters/female', function (req, res) {        
        votersCountModel.getFemaleCount(req.params.id,res,sendDataCallback);
    });

    app.get('/voters/total', function (req, res) {        
        votersCountModel.getTotalCount(req.params.id,res,sendDataCallback);
    });

    app.get('/voters/age/:age', function (req, res) {        
        votersCountModel.getAgeGroupCount(req.params.age,res,sendDataCallback);
    });

    app.post('/user', function (req, res) {       
        userModel.addUser(req.body,res,sendDataCallback);
    });

    app.put('/user', function (req, res) {       
        userModel.addUser(req.body,res,sendDataCallback);
    });

    app.post('/result', function (req, res) {       
        resultModel.addResult(req.body,res,sendDataCallback);
    });

    app.get('/provinces', function(req,res) {
        provinceModel.getAllProvinces(req, res, sendDataCallback);
    });

    app.get('/province/:prov', function(req,res) {
        provinceModel.getProvince(req.params.prov, res, sendDataCallback);
    })

    app.get('/result/issues', function(req,res){
        resultModel.getIssuesByRating(req,res, sendDataCallback);
    })

    app.get('/result/issues/candidates', function(req,res){
        resultModel.getCandidatesByIssues(req,res, sendDataCallback);
    })

    app.get('/result/candidates/preffered', function(req,res){
        resultModel.getCandidatesByPreffered(req,res, sendDataCallback);
    })

    app.get('/result/candidates/matched', function(req,res){
        resultModel.getCandidatesByMatched(req,res, sendDataCallback);
    })


    app.get('/result/issues/api', function(req,res) {
        // var http = require('http');

        // var options = {
        //   host: 'api.bilangpilipino.com',
        //   path: '/api-bilang-pilipino/api/issues?key=ZV8K1WtKr&token=RHdMXFThCs4tw1dcogyHkTY1X36s'
        // };

        // callback = function(response) {
        //   var str = '';

        //   //another chunk of data has been recieved, so append it to `str`
        //   response.on('data', function (chunk) {
        //     str += chunk;
        //   });

        //   //the whole response has been recieved, so we just print it out here
        //   response.on('end', function () {
        //     console.log(str);
        //     res.send(str);
        //   });
        // }

        // http.request(options, callback).end();


        resultModel.getAllIssues(req,res,sendDataCallback);
    })

    app.get('/issues/:issue_id', function(req,res) {
        resultModel.getIssues(req.params.issue_id, res, sendDataCallback);
    })


    app.get('/stand/:candidate_id', function(req,res ) {
        resultModel.getCandidatesStand(req.params.candidate_id, res, sendDataCallback);
    })

    app.get('/stand/:candidate_id/:issue_id', function(req,res ) {
        resultModel.getStand(req.params, res, sendDataCallback);
    })

    // app.get('/api/posts/:query', function (req, res) {
    //     postsModel.getPosts(req.params.query, sendDataCallback, res);
    // });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};