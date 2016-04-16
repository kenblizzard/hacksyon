var votersCountModel = require('./models/votersCountModel');
var userModel = require('./models/userModel');

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