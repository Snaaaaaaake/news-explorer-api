const cors = require('cors');

module.exports = cors({
  origin: [
    'https://news-explorer24.ru',
    'https://www.news-explorer24.ru',
    'http://news-explorer24.ru',
    'http://www.news-explorer24.ru',
    'https://snaaaaaaake.github.io',
    'http://snaaaaaaake.github.io',
    'http://localhost:8080',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
});
