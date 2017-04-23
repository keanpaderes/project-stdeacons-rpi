var Artpiece = require('../models/artpiece.model');

function getAll(res) {
    Subject.find().exec(function(err, subjs) {
        if(err){
            res.send(err);
        }

        res.json(subjs);
    });
};

module.exports = {
    getArtpieces: function(req, res, next) {
        getAll(res);
    },
    postArtpiece: function(req, res, next) {
        var newArt = new Artpiece({
            subjectName: req.body.subjectName,
            information: req.body.information,
            isDisease: req.body.isDisease,
            symptoms: req.body.symptoms,
            treatment: req.body.treatment,
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
