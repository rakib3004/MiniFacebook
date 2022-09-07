const mongoose = require('mongoose');

mongoose_connection_path = 'mongodb://storydb:27017/story'

mongoose.connect(mongoose_connection_path, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./models/user.model');