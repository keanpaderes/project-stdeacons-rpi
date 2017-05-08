var Artpiece = require('../models/artpiece.model');

function getAll(res) {
    skip = typeof skip !== 'undefined'? skip : 0;
    limit = typeof limit !== 'undefined'? limit : 50;

    Artpiece.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
        .then(function(subjs) {
            res.json(subjs);
        })
        .catch(function(err) {
            res.status(404).send({message: err});
        });
};

module.exports = {
    getArtpieces: function(req, res, next) {
        var skip =
            typeof req.body.skip !== 'undefined'? req.body.skip : 0;
        var limit =
            typeof req.body.limit !== 'undefined'? req.body.limit : 50;

        getAll(res, skip, limit);
    },
    getArtpiece: function(req, res, next) {
        var id = req.query.id;

        Artpiece.find({subjectNumber: id})
            .exec()
            .then(function(subj) {
                res.json(subj);
            })
            .catch(function(err) {
                res.status(404).send({message: err});
            });

    },
    listArtpieces: function(req, res, next) {
        Artpiece.find()
            .select('subjectFormal')
            .sort({subjectNumber: 1})
            .exec()
            .then(function(names){
                res.json(names);
            })
            .catch(function(err) {
                res.status(404).send({message: err});
            });
    },
    postArtpiece: function(req, res, next) {
        var newArt = new Artpiece({
            subjectNumber: req.body.subjectNumber,
            subjectName: req.body.subjectName,
            subjectFormal: req.body.subjectFormal,
            faveCount: req.body.faveCount
        });

        newArt.save(function (err) {
            if (err)
                res.status(404).send({message: err});

            // get and return all the todos after you create another
            getAll(res);
        });
    }
}
