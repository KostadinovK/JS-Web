const mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
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
    Cubes: [{ type : mongoose.SchemaTypes.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory', accessorySchema);