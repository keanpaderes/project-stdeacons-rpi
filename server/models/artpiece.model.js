var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtpieceSchema = new Schema({
    subjectName: {
      type: String,
      required: true
    },
    information: {
      type: String,
      required: true
    },
    isDisease: {
        type: Boolean,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    treatment: String,
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
