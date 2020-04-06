const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9]*$');
              return regex.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        },
    },
    Password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(v) {
                let regex = new RegExp('^[a-zA-Z0-9]*$');
              return regex.test(v);
            },
            message: props => `${props.value} is not a valid Password!`
        },
    },
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('Password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.Password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.Password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);