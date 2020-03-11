let express = require('express');
let app = express();
let homeRouter = require('./routes/router');

app.use('/', homeRouter);
app.use(express.static('public'));

app.listen(3000);
