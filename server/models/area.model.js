var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    name: {
        type:  String,
        unique: true,
        required: true
    },
    formalName: {
        type:  String,
        unique: true,
        required: true
    },
    beacons: { //JSON of beacons with beacon name and beacon id
        type: Array
    },
    locationList: [{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }]
}, { timestamps: true });

AreaSchema.method({});

AreaSchema.statics = {};

module.exports = mongoose.model('Area', AreaSchema);
