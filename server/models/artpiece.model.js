var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtpieceSchema = new Schema({
    subjectNumber: {
        type: Number,
        required: true
    },
    subjectName: {
      type: String,
      required: true
    },
    subjectFormal: {
      type: String,
      required: true
    },
    faveCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true});

//Add methods
ArtpieceSchema.method({});

//Statics
ArtpieceSchema.statics = {};

module.exports = mongoose.model('Artpiece', ArtpieceSchema);
