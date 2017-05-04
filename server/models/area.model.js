var mongoose = require('mongoose');
var Beacon = require('./beacon.model');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    name: {
        type:  String,
        required: true
    },
    numberOfBeacons: {
        type: Number,
        required: true
    },
    pieceList: [{
        type: Schema.Types.ObjectId,
        ref: 'Artpiece'
    }],
    locationList: [{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }]
}, { timestamps: true });

AreaSchema.method({});

AreaSchema.statics = {};

module.exports = mongoose.model('Area', AreaSchema);
