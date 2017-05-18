var mongoose = require('mongoose');
var Area = require('../models/area.model');
var Artpiece = require('../models/artpiece.model');

function getAll(res, skip, limit) {
    skip = typeof skip !== 'undefined'? skip : 0;
    limit = typeof limit !== 'undefined'? limit : 50;

    Area.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
        .then(function(areas) {
            res.json(areas);
        })
        .catch(function(err) {
            res.status(404).send({message: err});
        });
}

module.exports = {
    getAreas: function(req, res, next) {
        var skip =
            typeof req.body.skip !== 'undefined'? req.body.skip : 0;
        var limit =
            typeof req.body.limit !== 'undefined'? req.body.limit : 50;

        getAll(res, skip, limit);
    },
    getAreaByParams: function getAreaById(req, res, next) {
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
                    Area.findById(mongoose.Types.ObjectId(_id))
                        .exec()
                        .then(function(area) {
                            res.json(area);
                        })
                        .catch(function(err) {
                            res.status(404).send({message: err});
                        });
                    break;
                case 'name':
                    var _name = req.query.name;
                    Area.findOne({name: _name})
                        .exec()
                        .then(function(area) {
                            res.json(area);
                        })
                        .catch(function(err) {
                            res.status(404).send({message: err});
                        });
                    break;
            };
        }
    },
    postArea: function(req, res, next) {
        var newArea = new Area({
            name: req.body.name,
            formalName: req.body.formalName
        });

        newArea.save(function(err){
            if(err)
                res.status(404).send({message: err});

            getAll(res);
        });
    },
    addBeaconInfo: function(req, res, next) {
        var beacon = {
            beaconName: req.body.beaconName,
            majMin: req.body.majMin,
        };

        Area.findOne({name: req.body.name})
            .exec()
            .then(function(area) {
                area.beacons.push(beacon);
                area.save(function(err) {
                    if(err) res.status(404).send({message: err});

                    getAll(res);
                });
            })
            .catch(function(err) {
                res.status(404).send({message: err});
            });
    },
    initializeApplication: function(req, res, next) {
        if(Object.keys(req.query)[0] !== 'area') {
            res.status(412).send({
                message: "Request failed due to wrong parameters. " +
                 "Must be id or name."
             });
        } else {
            var list = [];
            var _id = req.query.area;

            Artpiece.find()
                .select('subjectFormal')
                .sort({subjectNumber: 1})
                .exec()
                .then(function(names){
                    list = names;
                })
                .catch(function(err) {
                    next(err);
                });

            Area.findById(mongoose.Types.ObjectId(_id))
                .populate('locationList',
                    'name pointA.name pointB.name pointC.name ' +
                    'pointA.optimizedAccuracy pointA.accuracyRange ' +
                    'pointA.prunedRSSI pointA.rssiRange pointA.estimatedProximity ' +
                    'pointB.optimizedAccuracy pointB.accuracyRange ' +
                    'pointB.prunedRSSI pointB.rssiRange pointB.estimatedProximity ' +
                    'pointC.optimizedAccuracy pointC.accuracyRange ' +
                    'pointC.prunedRSSI pointC.rssiRange pointC.estimatedProximity'
                )
                .select('locationList beacons')
                .sort({created_at: 1})
                .exec()
                .then(function(_area) {
                    res.json({
                        names: list,
                        beacons: _area.beacons,
                        locations: _area.locationList
                    });
                })
                .catch(function(err) {
                    res.status(404).send({message: err});
                });
        }
    }
}
