var express = require('express');
var locationCtrl = require('../controllers/location.controller');
var router = express.Router();

router.route('/')
    /* GET '/api/locations/'
    * Get all locations
    * @property {Number} req.body.skip [OPTIONAL] - skips n number.
    * @property {Number} req.body.limit [OPTIONAL] - limits to n number.
    * @returns {LocationsArray[]}
    */
    .get(locationCtrl.getLocations)

    /* POST '/api/locations/'
    * Post a new location
    * @property {String} req.body.name - db name of the location.
    * @property {ObjectId} req.body.area - object id of the area it is located.
    * @returns {LocationsArray[]}
    */
    .post(locationCtrl.postLocation);

router.route('/gather')
    /* PUT '/api/locations/gather'
    * Add Accuracy and RSSI values of each point
    * @property {String} req.body.name - db name of the location.
    * @property {String} req.body.point - beacon point.
    * @property {Number} req.body.accuracy - beacon distance reading.
    * @property {String} req.body.proximity - beacon proximity reading.
    * @property {Number} req.body.rssi - beacon rssi reading.
    * @returns {LocationsArray[]}
    */
    .put(locationCtrl.addAccRssi);

router.route('/specific')
    /* GET '/api/locations/specific?id=<_id>' or
    *  GET '/api/locations/specific?name=<name>'
    * Get specific location by id or name
    * @params {ObjectId} req.query.id - object id of the location.
    * [OR]
    * @params {String} req.query.name - name of the area.
    * @returns {LocationsArray[]}
    */
    .get(locationCtrl.getLocationByParams);

router.route('/compute')
    .post(locationCtrl.computeValues);

module.exports = router;
