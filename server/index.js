const express = require('express');
const bodyParser = require('body-parser');
const connect  = require('./config/index.js');
const router = require('./route/index.js');
const postRouter = require('./route/post.js');
const dotEnv=require('dotenv')

const app = express();

dotEnv.config()
connect()

app.use(bodyParser.json());

app.use('/api/v1/user', router)
app.use('/api/v1/post', postRouter);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 8000');
})

