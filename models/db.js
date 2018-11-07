var mongoose = require('mongoose');
var config = require('config');

mongoose.set({useNewUrlParser: true});
mongoose.set({debug: true});

var db_uri = `${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = {
  Connect: function () {
     mongoose.connect(db_uri, function (err) {
      if (err) {
        console.log(err); return;
      }
    
      console.log('Connected to mongodb successfully');
    })
  }
};