var express = require('express');
var artpieceRoutes = require('./artpiece.route');
var router = express.Router();

router.get('/', function(req, res){
    res.send({hello:'Hello world!'});
});

router.use('/piece', artpieceRoutes);

module.exports = router;
