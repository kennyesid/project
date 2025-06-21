const mongoose = require('mongoose');

const mongoConecttion = async() => {
  try {
    const urlDatabase = `${ process.env.MONGO_URL }/${ process.env.MONGO_DB_NAME }`;

    await mongoose.connect(urlDatabase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (error) {
    console.log('Database offline: ' + error);
  }
};

module.exports = {
  mongoConecttion
};