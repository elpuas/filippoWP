jQuery( document ).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.
  $(".menu-toggle").click(function() {
    $('.slide-menu').slideToggle("slow");
  });
  // TypeIt.js
  $('#heroText').typeIt({
    strings: ["​Full Stack Designer & Front-end Dev, I’m a Web Artisan and WordPress Wrangler."],
    speed: 50,
    breakLines: false,
    autoStart: false,
    loopDelay: 750,
    loop: false
  });
  // Nav Bar
    var $menuRevealBtn = $('.menu-toggle');
    var $sideNav = $('#side-nav');
    var $sideNavMask = $('#side-nav-mask');

    $menuRevealBtn.on('click', function() {
      $sideNav.toggleClass('visible');
      $sideNavMask.toggleClass('visible');
    });
});
