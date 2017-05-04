var Area = require('../models/area.model');

function getAll(res, skip, limit) {
    skip = typeof skip !== 'undefined'? skip : 0;
    limit = typeof limit !== 'undefined'? limit : 50;

    Area.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(function(err, areas) {
            if(err) res.send(err);
            res,json(areas);
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
    getAreaById: function getAreaById(req, res, next) {
        var id = req.query.id

        Area.findById(id)
            .exec(function(err, area) {
                if(err) return err;
                return area;
            });
    },
    getAreaByName: function getAreaByName(req, res, next) {
        var name = req.body.name;
        Area.find({
            areaName: name
        })
        .exec(function(err, area) {
                if(err) return err;
                return area;
            });
    },
    // postArea: function(req, res, next) {
    //     var newArea = new Area({
    //
    //     });
    // }
}
