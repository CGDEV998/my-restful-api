const express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var apiRoutes = express.Router();


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


apiRoutes.get('/', (req, res) => {
    res.send("api is a success");
})

apiRoutes.get('/user', (req, res) => {
    res.json({message: "successful get - user"});
});

apiRoutes.get('/user/:id', (req, res) => {
    res.json({message: "successful get - user/id"});
});

apiRoutes.post('/user', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        username: req.body.username,
    }));
});

apiRoutes.put('/user/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        username: req.body.username,
    }));
});

apiRoutes.delete('/user/:id', (req, res) => {
    res.json({message: "successful delete"});
});

apiRoutes.patch('/user/:id', (req, res) => {
    res.json({message: "successful patch"});
});

app.get('/', (req, res) => {
    res.json({message: "successful get"});
});

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log('Running on port: ' + port);
})
module.exports = app;
