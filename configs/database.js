const { NODE_ENV, DATABASE } = process.env;
const databaseAdress = NODE_ENV === 'production' ? DATABASE : 'mongodb://localhost:27017/newsuserapi';
const databaseSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
module.exports = { databaseAdress, databaseSettings };
