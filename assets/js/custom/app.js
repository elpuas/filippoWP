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
    // Slider
    // $('.carousel-inner .carousel-item:first').addClass('active');
      $('.carousel').carousel({
          interval: 2000
        });
    // Change Homepage Background
    var elements = $('article .entry-content'); //  Get Content Elements
    // Get Distance From Top Each Element
    var MCCoord = $(elements[0]).offset().top;
    var WidCoord = $(elements[1]).offset().top;
    var MWCoord = $(elements[2]).offset().top;
    var MBCoord = $(elements[3]).offset().top;

    $(document).scroll(function() {
      // Round to the Nearest Integer
      var mContent = Math.round(MCCoord);
      var whtIDoContent = Math.round(WidCoord);
      var mWorkContent = Math.round(MWCoord);
      var mBlogContent = Math.round(MBCoord);
      // Scroll Variable
      var scrll = $(document).scrollTop();
      // Conditionals
      if ( scrll >= 0 && scrll < whtIDoContent  ) {
         $('body').css({'background-color' : '#43bda1' , 'background-image' : 'url(https://www.elpuas.com/wp-content/uploads/2017/11/4_1.jpg)'});
         //console.log('top');
      }
      if ( scrll >= whtIDoContent ) {
         $('body').css({'background-color' : '#f26522', 'background-image' : 'url(https://www.elpuas.com/wp-content/uploads/2017/11/7_1.jpg)' });
          // console.log('what i do section');
      }
      if ( scrll >= mWorkContent ) {
          $('body').css({'background-color' : '#0072bc', 'background-image' : 'url(https://www.elpuas.com/wp-content/uploads/2017/11/computer.jpg)' });
           //console.log('my work section');
      }
      if ( scrll >= mBlogContent ) {
        $('body').css({'background-color' : '#6b539b', 'background-image' : 'none' });
            //console.log('myBlog section');
      }
    });
    // Calculate Viewport Height;
    var viewportHeight = $(window).height();
    $('.mc-entry-content, .wid-entry-content, .mw-entry-content, .mb-entry-content').css('min-height', (viewportHeight));

   // Document Ready Function

   var clicked = true;
      $(".bar-c").click( function() {
        if (clicked) {
          $(".bar").addClass("noAnim");
          clicked = false;
        } else {
          $(".bar").removeClass("noAnim");
          clicked = true;
        }
      });
});
