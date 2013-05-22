Leap Motion plugin for Video.js
===============================
A plugin that let you control video playback with [Leap Motion](http://www.leapmotion.com).

Using the Plugin
----------------
Add the following to head (leap.js is from official SDK)

  <link href="videojs.leapmotion.css" rel="stylesheet" />
  <script src="leap.js"></script>
  <script src="videojs.leapmotion.js"></script>

and body (to activate the plugin)

  <script>videojs('your_video_element_id').LeapMotionPlugin();</script>

Supported gestures:

 * Swipe left: step forward 5s 
 * Swipe right: step backward 5s
 * key tap (tap downward): play/pause

License
-------
[MIT](http://opensource.org/licenses/MIT) 