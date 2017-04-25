var express = require('express');
var artpieceCtrl = require('../controllers/artpiece.controller');
var router = express.Router();

router.route('/')
    .get(artpieceCtrl.getArtpieces)
    .post(artpieceCtrl.postArtpiece);
router.route('/specific')
    .get(artpieceCtrl.getArtpiece);
router.route('/names')
    .get(artpieceCtrl.listArtpieces);
router.route('/test')
    .get(function(req, res, next) {
        res.send({
            msg: "This is a test."
        });
    });

module.exports = router;
