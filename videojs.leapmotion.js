(function() {
  var video;
  var controller = new Leap.Controller({enableGestures: true});
  var disableFastGestures = false;
  function sleepAfterValidGesture(g) {
    if (console) console.log(g);
    disableFastGestures = true;
    var dialog = document.createElement('div');
    dialog.className = 'videojs-leapmotion-hud';
    dialog.textContent = g;
    video.el().appendChild(dialog);
    setTimeout(function(){
      video.el().removeChild(dialog);
    }, 1000);
    setTimeout(function(){
      disableFastGestures = false;
    }, 2000);
  }
  controller.loop(function(frame) {
    if (disableFastGestures) return;
    if (video && frame.valid && frame.gestures.length) {//
      var s = frame.gestures[0];
      switch (s.type) {
        case 'swipe':
          if (s.state == 'start'){
            if (s.direction.x > 0.8) { //left -> right
              var t = video.currentTime() - 5;
              video.currentTime(t<0 ? 0 : t);
              sleepAfterValidGesture('Step backward');
            } else if (s.direction.x < 0.8) { // right -> left
              var t = video.currentTime() + 5;
              video.currentTime(t>video.duration() ? video.duration() - 2.5 : t);
              sleepAfterValidGesture('Step forward');
            }
          }
          break;
        case 'keyTap':
          if (video.paused()) {
            video.play();
            sleepAfterValidGesture('Play');
          } else {
            video.pause();
            sleepAfterValidGesture('Pause');
          }
          break;
      }
    }
  });

  videojs.plugin('LeapMotionPlugin', function (options) {
    this.ready(function(e) {
      if (console) console.log('Ready');
      video = this;
    });
  });
})();