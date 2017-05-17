var express = require('express');
var fs = require('fs');
var url = require('url');
var areaRoutes = require('./area.route');
var artpieceRoutes = require('./artpiece.route');
var locationRoutes = require('./location.route');
var router = express.Router();

router.get('/', function(req, res){
    res.send({hello:'Hello world!'});
})
.post('/logs', function(req, res) {
    var filePath = __dirname + '/../../public/data/beacon_logs.txt';
    fs.appendFile(filePath, req.body.string, function() {
        res.json({msg: "Success!"});
    });
});

router.route('/range_logs')
    .post(function(req, res) {
        var filePath = __dirname + '/../../public/data/range_logs.txt';
        fs.appendFile(filePath, req.body.string, function() {
            res.json({msg: "Success!"});
        });
    });

router.use('/areas', areaRoutes);
router.use('/locations', locationRoutes);
router.use('/pieces', artpieceRoutes);

module.exports = router;
