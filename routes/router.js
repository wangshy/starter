let service = require('../services/service');
let path = require('path');
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let options = {
    root: path.join(__dirname, '..', 'public'),
  }
  res.sendFile('index.html', options);
});

router.get('/start', function(req, res, next) {
  res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  if (!service.running) {
    service.start();
  }
  res.send("data: " + service.result + '\n\n');

});

router.get('/stop', function(req, res, next) {
  if (service.running) {
    service.stop();
  }
  res.sendStatus(200);
});

module.exports = router;
