const mongoose = require('mongoose');

let cubeSchema = new mongoose.Schema({
    CreatorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    Name: {
        type: String,
        required: [true, 'Cube name is required'],
        minlength: [5, "Cube Name should be atleast 5 characters long"],
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9 ]*$');
              return regex.test(v);
            },
            message: props => `Name should contains only letters, digits and whitespaces!`
        },
    },
    Description: {
        type: String,
        required: [true, 'Cube description is required'],
        minlength: [20, "Cube Description should be atleast 20 characters long"],
        maxlength: 200,
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9 ]*$');
              return regex.test(v);
            },
            message: props => `Description should contains only letters, digits and whitespaces!`
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
    DifficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    Accessories: [{ type : mongoose.SchemaTypes.ObjectId, ref: 'Accessory' }]
});

module.exports = mongoose.model('Cube', cubeSchema);