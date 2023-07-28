const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Specify the port you want your server to listen on

app.use(cors());

const imageRouter = require('./routes/image');

// Use the user routes
app.use('/getImageData', imageRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});