const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
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