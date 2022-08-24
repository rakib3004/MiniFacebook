
const app = require('express')();

app.get('/', (res,req)=>
res.json({message: 'Institute of Information Technology'})
);


const port = process.env.PORT || 8000;


app.listen(port, ()=> console.log(`Our world focus on PORT ${port}`))