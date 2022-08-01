const mongoose = require('mongoose');

mongoose_connection_path = 'mongodb://localhost:27017/MiniFacebook'

mongoose.connect(mongoose_connection_path, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');