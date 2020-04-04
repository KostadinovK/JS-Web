const mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    Id: {
        type: mongoose.SchemaTypes.ObjectId,
        auto: true,
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true,
        maxlength: 50
    },
    ImageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                let regex = new RegExp('^https?://');
              return regex.test(v);
            },
            message: props => `${props.value} is not a valid image url!`
        },
    },
    DifficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    Accessories: [{ type : ObjectId, ref: 'Accessory' }]
}, { _id : false });

module.exports = mongoose.model('Cube', cubeSchema);