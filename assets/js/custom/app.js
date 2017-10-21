jQuery( document ).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.
  $(".menu-toggle").click(function() {
    $('.slide-menu').slideToggle("slow");
  });
  // TypeIt.js
  $('#heroText').typeIt({
    strings: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac varius ipsum. Praesent a blandit enim."],
    speed: 50,
    autoStart: false,
    loopDelay: 750
  });
});
