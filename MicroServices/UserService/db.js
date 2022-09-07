const mongoose = require('mongoose');

mongoose_connection_path = 'mongodb://userdb:27017/user'

mongoose.connect(mongoose_connection_path, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./models/user.model');