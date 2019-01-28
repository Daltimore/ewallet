const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('ewallet:db')

mongoose.set({});

const options = {
  useNewUrlParser: true,
  useCreateIndex: true
}

const db_uri = `${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = {
  Connect: function () {
     mongoose.connect(db_uri, options, function (err) {
      if (err) {
        debug(err)
        process.exit(1);
      };
      debug('Connected to mongodb successfully');
    })
  }
};