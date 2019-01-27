const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('ewallet:db')

mongoose.set({useNewUrlParser: true});
mongoose.set({debug: true});

const db_uri = `${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = {
  Connect: function () {
     mongoose.connect(db_uri, function (err) {
      if (err) console.log(err);
      console.log('Connected to mongodb successfully');
    })
  }
};