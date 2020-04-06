const mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Accessory name is required'],
        minlength: [5, "Accessory Name should be atleast 5 characters long"],
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9 ]*$');
              return regex.test(v);
            },
            message: props => `Name must contain only letters, digits and whitespaces!`
        },
    },
    Description: {
        type: String,
        required: [true, 'Accessory description is required'],
        minlength: [20, "Cube Accessory should be atleast 20 characters long"],
        maxlength: 200,
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9 ]*$');
              return regex.test(v);
            },
            message: props => `Description must contain only letters, digits and whitespaces!`
        },
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