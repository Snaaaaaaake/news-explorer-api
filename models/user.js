const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { ErrorUnauthorized } = require('../modules/errors');
const { error401Message } = require('../configs/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    validate: {
      validator(e) {
        return validator.isEmail(e);
      },
      message: (props) => `'${props.value}' Эта строка должна быть почтой!`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  if (!email || !password) {
    throw new ErrorUnauthorized(error401Message.wrong);
  }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(error401Message.wrong));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(error401Message.wrong));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
