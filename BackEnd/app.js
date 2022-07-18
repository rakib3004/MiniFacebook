const express = require('express');
var postRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var storyRouter = require('./routes/story');



const app = express();

const mongoose = require('mongoose');

var cors = require('cors');
app.use(cors({
    origin:"http://localhost:4200"
}))

mongoose.connect('mongodb://localhost:27017/MiniFacebook',
{
    useNewUrlParser : true
}
,()=>{
    console.log('database connected')
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/posts',postRouter)

app.listen(3000,console.log("Listening at 3000"));