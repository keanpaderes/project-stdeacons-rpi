var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: {
        type:  String,
        required: true
    },
    pointA: {
        name: String,
        initialAccuracyArray: [Number],
        initialProximityArray: [String],
        initialRSSIArray: [Number],
        optimizedAccuracy: Number,
        accuracyRange: String,
        estimatedProximity: String,
        prunedRSSI: Number,
        rssiRange: String
    },
    pointB: {
        name: String,
        initialAccuracyArray: [Number],
        initialProximityArray: [String],
        initialRSSIArray: [Number],
        optimizedAccuracy: Number,
        accuracyRange: String,
        estimatedProximity: String,
        prunedRSSI: Number,
        rssiRange: String
    },
    pointC: {
        name: String,
        initialAccuracyArray: [Number],
        initialProximityArray: [String],
        initialRSSIArray: [Number],
        optimizedAccuracy: Number,
        accuracyRange: String,
        estimatedProximity: String,
        prunedRSSI: Number,
        rssiRange: String
    },
    _area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    }
}, { timestamps: true });

LocationSchema.method({});

LocationSchema.statics = {};

module.exports = mongoose.model('Location', LocationSchema);
