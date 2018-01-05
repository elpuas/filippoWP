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
         $('.page-home').css({'background-image' : 'url(http://localhost:8080/elpuas/wp-content/uploads/2018/01/myhome.gif)'});
         //console.log('top');
      }
      if ( scrll >= whtIDoContent ) {
         $('.page-home').css({'background-image' : 'none' });
          // console.log('what i do section');
      }
      if ( scrll >= mWorkContent ) {
          $('.page-home').css({'background-image' : 'url(http://localhost:8080/elpuas/wp-content/uploads/2018/01/MW.jpg)' });
           //console.log('my work section');
      }
      if ( scrll >= mBlogContent ) {
        $('.page-home').css({'background-image' : 'none' });
            //console.log('myBlog section');
      }
    });
    // Calculate Viewport Height;
    var viewportHeight = $(window).height();
    $('.mc-entry-content, .wid-entry-content, .mw-entry-content, .mb-entry-content').css('min-height', (viewportHeight));

   // Menu Toogle Function
      $(".menu-toggle").click( function() {
        $(".bar").toggleClass("noAnim");
    });

    // Add Animation to Menu Hover
      $('.menu li').hover(
     function(){ $(this).addClass('animated infinite pulse') },
     function(){ $(this).removeClass('animated infinite pulse') }
   )

      if( $('.filo-carousel--post-link').length )         // use this if you are using class to check
      {
        $('.filo-carousel--post-link a img').hover(
       function(){ $(this).addClass('animated infinite tada') },
       function(){ $(this).removeClass('animated infinite tada') }
     )
   }

  // Fire Div On Viewport Show
 /*

  $(".my-element-class").inViewport(function(px){
    if(px) $(this).addClass("triggeredCSS3") ;
});

*/


});
