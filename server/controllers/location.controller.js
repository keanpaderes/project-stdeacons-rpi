var mongoose = require('mongoose');
var Area = require('../models/area.model');
var Location = require('../models/location.model');
var tools = require('../helpers/tools');

function getAll(res, skip, limit) {
    skip = typeof skip !== 'undefined'? skip : 0;
    limit = typeof limit !== 'undefined'? limit : 50;

    Location.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
        .then(function(locations) {
            res.json(locations);
        })
        .catch(function(err) {
            res.status(404).send({message: err});
        });
}

module.exports = {
    getLocations: function(req, res, next) {
        var skip =
            typeof req.body.skip !== 'undefined'? req.body.skip : 0;
        var limit =
            typeof req.body.limit !== 'undefined'? req.body.limit : 50;

        getAll(res, skip, limit);
    },
    getLocationByParams: function(req, res, next) {
        if(Object.keys(req.query)[0] !== 'id' &&
            Object.keys(req.query)[0] !== 'name') {
            res.status(412).send({
                message: "Request failed due to wrong parameters. " +
                 "Must be id or name."
             });
        } else {
            switch(Object.keys(req.query)[0]) {
                case 'id':
                    var _id = req.query.id;

                    Location.findById(mongoose.Types.ObjectId(_id))
                        .exec()
                        .then(function(location) {
                            res.json(location);
                        })
                        .catch(function(err) {
                            res.status(404).send({message: err});
                        });
                    break;
                case 'name':
                    var _name = req.query.name;
                    Location.findOne({name: _name})
                        .exec()
                        .then(function(location) {
                            res.json(location);
                        })
                        .catch(function(err) {
                            res.status(404).send({message: err});
                        });
                    break;
            };
        }
    },
    postLocation: function(req, res, next) {
        var newLocation = new Location({
            name: req.body.name,
            _area: req.body.area
        });

        newLocation.save(function(sErr){
            if(sErr)
                next({message: sErr});
            Area.findById(mongoose.Types.ObjectId(req.body.area))
                .exec()
                .then(function(area) {
                    area.locationList.push(newLocation._id);
                    area.save(function(aErr){
                        if(aErr)
                            next({message: aErr});
                        getAll(res);
                    });
                })
                .catch(function(err) {
                    res.status(404).send({message: err});
                });
        });
    },
    addAccRssi: function(req, res, next) {
        Location.findOne({
            name: req.body.name
        })
        .exec()
        .then(function(location) {
            var point;
            switch(req.body.point) {
                case '33345:3091':
                    location.pointA.name = req.body.point;
                    point = location.pointA;
                    break;
                case '61539:34663':
                    location.pointB.name = req.body.point;
                    point = location.pointB;
                    break;
                case '55656:22263':
                    location.pointC.name = req.body.point;
                    point = location.pointC;
                    break;
            };

            if(!Array.isArray(point.initialAccuracyArray))
                point.initialAccuracyArray = [];
            if(!Array.isArray(point.initialProximityArray))
                point.initialProximityArray = [];
            if(!Array.isArray(point.initialRSSIArray))
                point.initialRSSIArray = [];

            point.initialAccuracyArray.push(
                parseFloat(req.body.accuracy));
            point.initialProximityArray.push(req.body.proximity);
            point.initialRSSIArray.push(
                parseInt(req.body.rssi));

            location.save(function(err){
                if(err) res.status(404).send({message: err});

                res.json({
                    name: location.name,
                    accuracy: location.initialAccuracyArray,
                    proximity: location.initialProximityArray,
                    rssi: location.initialRSSIArray
                });
            });
        })
        .catch(function(err) {
            res.status(404).send({message: err});
        });
    },
    computeValues: function(req, res, next) {
        Location.findOne({name: req.body.name})
            .select('pointA pointB pointC')
            .exec()
            .then(function(location) {
                var retArr = [];

                for(var i = 0; i<3; i++){
                    var newObj = {};
                    switch(i) {
                        case 0:
                            newObj.name = location.pointA.name;
                            newObj.accuracy =
                                location.pointA.initialAccuracyArray;
                            newObj.proximity =
                                location.pointA.initialProximityArray;
                            newObj.rssi =
                                location.pointA.initialRSSIArray;
                            newObj.oRssi = tools.rssiAveraging(newObj.rssi);
                            newObj.opt = tools.optimizedAveraging(newObj.accuracy);
                            newObj.oProx = tools.proximityEstimation(newObj.proximity);
                            retArr.push(newObj);
                            break;
                        case 1:
                            newObj.name = location.pointB.name;
                            newObj.accuracy =
                                location.pointB.initialAccuracyArray;
                            newObj.proximity =
                                location.pointB.initialProximityArray;
                            newObj.rssi =
                                location.pointB.initialRSSIArray;
                            newObj.oRssi = tools.rssiAveraging(newObj.rssi);
                            newObj.opt = tools.optimizedAveraging(newObj.accuracy);
                            newObj.oProx = tools.proximityEstimation(newObj.proximity);
                            retArr.push(newObj);
                            break;
                        case 2:
                            newObj.name = location.pointC.name;
                            newObj.accuracy =
                                location.pointC.initialAccuracyArray;
                            newObj.proximity =
                                location.pointC.initialProximityArray;
                            newObj.rssi =
                                location.pointC.initialRSSIArray;
                            newObj.oRssi = tools.rssiAveraging(newObj.rssi);
                            newObj.opt = tools.optimizedAveraging(newObj.accuracy);
                            newObj.oProx = tools.proximityEstimation(newObj.proximity);
                            retArr.push(newObj);
                            break;
                    }
                }
                res.json(retArr);
            })
            .catch(function(err) {
                console.log(err);
                res.status(404).send({message: err});
            });
    }
}
