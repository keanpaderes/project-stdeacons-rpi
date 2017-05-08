var express = require('express');
var areaCtrl = require('../controllers/area.controller');
var router = express.Router();

router.route('/')
    /* GET '/api/areas/'
    * Get all areas
    * @property {Number} req.body.skip [OPTIONAL] - skips n number.
    * @property {Number} req.body.limit [OPTIONAL] - limits to n number.
    * @returns {AreasArray[]}
    */
    .get(areaCtrl.getAreas)

    /* POST '/api/areas/'
    * Post a new artpiece
    * @property {String} req.body.name - db name of the area.
    * @property {String} req.body.formalName - formal name of the area.
    * @returns {AreasArray[]}
    */
    .post(areaCtrl.postArea);

router.route('/beacons')
    /* PUT '/api/areas/beacons'
    * Put a new beacon info
    * @property {String} req.body.name - db name of the area.
    * @property {String} req.body.beaconName - name of the beacon.
    * @property {String} req.body.minMaj - minor and major values of the beacon.
    * @returns {AreasArray[]}
    */
    .put(areaCtrl.addBeaconInfo);

router.route('/init')
    /* GET '/api/areas/init?area=<_id>'
    * Get required items of application
    * @params {ObjectId} req.query.area - object id of the area.
    * @returns {JSONObject}
    */
    .get(areaCtrl.initializeApplication);

router.route('/specific')
    /* GET '/api/areas/specific?id=<_id>' or
    *  GET '/api/areas/specific?name=<name>'
    * Get specific area by id or name
    * @params {ObjectId} req.query.id - object id of the area.
    * [OR]
    * @params {String} req.query.name - name of the area.
    * @returns {AreasArray[]}
    */
    .get(areaCtrl.getAreaByParams);

module.exports = router;
