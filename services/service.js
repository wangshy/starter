let service = {
  running: false,
  trigger: null,
  result: 1,
  start: function() {
    this.trigger = setInterval(() => ++this.result, 1000);
    this.running = true;
  },
  stop: function() {
    clearInterval(this.trigger);
    this.running = false;
    this.result = 1;
  }
}


module.exports = service;
