const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
	unique: true,
    validate: {
      validator(u) {
        return validator.isURL(u);
      },
      message: (props) => `'${props.value}' Эта строка должна быть ссылкой!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(u) {
        return validator.isURL(u);
      },
      message: (props) => `'${props.value}' Эта строка должна быть ссылкой!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
