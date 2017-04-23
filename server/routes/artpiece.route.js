var express = require('express');
var artpieceCtrl = require('../controllers/artpiece.controller');
var router = express.Router();

router.route('/')
    .get(artpieceCtrl.getArtpieces)
    .post(artpieceCtrl.postArtpiece);
router.route('/test')
    .get(function(req, res, next) {
        res.send({
            msg: "This is a test."
        });
    });

module.exports = router;
