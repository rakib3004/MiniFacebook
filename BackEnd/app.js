const express = require('express');
var postRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var storyRouter = require('./routes/story');

const app = express();

var cors = require('cors');
app.use(cors({
    origin:"http://localhost:4200"
}))

const mongoose = require('mongoose');
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


let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
  });