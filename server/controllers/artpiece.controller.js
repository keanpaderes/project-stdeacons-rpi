var Artpiece = require('../models/artpiece.model');

function getAll(res) {
    Artpiece.find()
        .exec(function(err, subjs) {
            if(err) res.send(err);
            res.json(subjs);
        });
};

module.exports = {
    getArtpieces: function(req, res, next) {
        getAll(res);
    },
    getArtpiece: function(req, res, next) {
        var id = req.query.id;

        Artpiece.find({
            subjectNumber: id
        })
        .exec(function(err, subj) {
            if(err) res.send(err);
            res.json(subj);
        });

    },
    listArtpieces: function(req, res, next) {
        Artpiece.find()
            .select('subjectFormal')
            .sort({subjectNumber: 1})
            .exec(function(err, names){
                if(err) res.send(err);
                res.json(names);
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
                res.send(err);

            // get and return all the todos after you create another
            getAll(res);
        });
    }
}
