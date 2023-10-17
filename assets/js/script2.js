{/* <svg width="200" height="200">
  <circle class="circle" cx="100" cy="100" r="80"  />
</svg>
<span class="timer">30</span>





@keyframes circletimer
  0%
    stroke-dashoffset: 500
    stroke-dasharray: 500
  100%
    stroke-dashoffset: 0
    stroke-dasharray: 500

svg
  background-color: transparent
  position: absolute
  background-color: transparent
  top: 50%
  left: 50%
  transform: translate(-50%, -50%) rotateZ(-90deg)
  .circle
    stroke: rgba(188, 0, 84, 1)
    stroke-width: 16
    fill: transparent
    stroke-dashoffset: 500
    stroke-dasharray: 0
    animation: 30s circletimer linear

.timer
  position: absolute
  display: block
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  color: rgba(188, 0, 84, 1)
  font-size: 42px
  font-weight: 700







  var timer = document.querySelector('.timer');

function clearCountdown(interval) {
  clearTimeout(interval);
}

function countdown() {
  var countdownBegin = 30;
  var count = setInterval(function() {
    console.log(countdownBegin);
    
    if (countdownBegin <= 0) {      
      timer.innerHTML = 'Done!';
      clearCountdown(count);
    } else {
      --countdownBegin;
      timer.innerHTML = countdownBegin;  
    }    
  }, 1000);
}

countdown(); */}