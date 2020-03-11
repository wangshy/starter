let trigger = document.querySelector('#trigger');
let timer = null;
let source = null;
trigger.addEventListener("click", function() {
  if (trigger.value == "Start") {
    trigger.value = "Stop";
    trigger.className = "trigger-stop";
    let time = 0;
    timer = setInterval(function() {
      ++time;
      let day = Math.floor(time / 86400);
      let hour = Math.floor((time - day * 86400) / 3600);
      let min = Math.floor((time - day * 86400 - hour * 3600) / 60);
      let sec = time - day * 86400 - hour * 3600 - min * 60;
      document.querySelector('#timer').innerHTML = `<span>${day}: </span><span>${hour}: </span><span>${min}: </span><span>${sec}<span>`;
    }, 1000);
    source = new EventSource('/start');
    source.onmessage = function(event) {
      document.querySelector('#count').innerHTML = `<p>Data from server: ${event.data}</p>`;
    };
  }
  else {
    trigger.value = "Start";
    trigger.className = "trigger-start";
    document.querySelector('#timer').innerHTML = '';
    clearInterval(timer);
    source.close();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
        document.querySelector('#count').innerHTML += `<p>Stopped</p>`;
      }
    }
    xhr.open('GET', '/stop');
    xhr.send();
  }
})
