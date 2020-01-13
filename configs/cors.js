const cors = require('cors');

module.exports = cors({
  origin: ['https://mesto-praktikum.site', 'https://www.mesto-praktikum.site', 'http://mesto-praktikum.site', 'http://www.mesto-praktikum.site', 'http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
});
