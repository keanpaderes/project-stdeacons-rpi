var express = require('express');
var artpieceCtrl = require('../controllers/artpiece.controller');
var router = express.Router();

router.route('/')
    /* GET '/api/pieces/'
    * Get all artpieces
    * @property {Number} req.body.skip [OPTIONAL] - skips n number.
    * @property {Number} req.body.limit [OPTIONAL] - limits to n number.
    * @returns {ArtpiecesArray[]}
    */
    .get(artpieceCtrl.getArtpieces)
    
    /* POST '/api/pieces/'
    * Post a new artpiece
    * @property {Number} req.body.subjectNumber - number of the artpiece.
    * @property {String} req.body.subjectName - db name of the artpiece.
    * @property {String} req.body.subjectFormal - formal name of the artpiece.
    * @property {Number} req.body.faveCount [OPTIONAL] - favorite count of piece.
    * @returns {ArtpiecesArray[]}
    */
    .post(artpieceCtrl.postArtpiece);

router.route('/specific')
    /* GET '/api/pieces/specific?id=<subjectNumber>'
    * Get specific artpiece by id
    * @params {Number} req.query.id - number of the artpiece.
    * @returns {ArtpiecesArray[]}
    */
    .get(artpieceCtrl.getArtpiece);

router.route('/names')
    /* GET '/api/pieces/names'
    * Get the names of the artpiece sorted by subjectNumber
    * @returns {ArtpiecesNamesArray[]}
    */
    .get(artpieceCtrl.listArtpieces);

router.route('/test')
    .get(function(req, res, next) {
        res.send({
            msg: "This is a test."
        });
    });

module.exports = router;
