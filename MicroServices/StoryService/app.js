require('./config/config');
require('./db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var Minio = require("minio");



const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/story', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});



const server_ip = 'storyobjectdb'

const accessKey = 'minioadmin'
const secretKey = 'minioadmin'

const port_minio = 9000
const minioClient = new Minio.Client({
    endPoint: server_ip,
    port: port_minio,
    useSSL: false,
    accessKey: accessKey,
    secretKey: secretKey
});

const bucketName = "stories";

(async () => {
  console.log(`Creating Bucket: ${bucketName}`);
  await minioClient.makeBucket(bucketName, "hello-there").catch((e) => {
      console.log(
          `Error while creating bucket '${bucketName}': ${e.message}`
      );
  });

  console.log(`Listing all buckets...`);
  const bucketsList = await minioClient.listBuckets();
  console.log(
      `Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`
  );
})();


var port=3003

// start server
app.listen(port, () => console.log(`Server started at ${port}`));