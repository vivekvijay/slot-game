
const handler = require('./serviceHandler');
const express = require('express');
const app = express();
const port = 8080;

//Serves static content from folder "public"
app.use(express.static('public'));

//Called on application load for initial configuration
app.get('/config', handler.getInitialCOnfig);

//Triggered on button click to get winning result
app.get('/result', handler.getResult);

app.listen(port, () => console.log(`App listening on port ${port}!`));
