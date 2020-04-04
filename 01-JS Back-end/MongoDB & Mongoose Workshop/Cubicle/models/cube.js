const mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true,
        maxlength: 200
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
    Accessories: [{ type : mongoose.SchemaTypes.ObjectId, ref: 'Accessory' }]
});

module.exports = mongoose.model('Cube', cubeSchema);