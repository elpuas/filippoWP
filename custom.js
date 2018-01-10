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
      if ($('article').find('.entry-content').length > 3 ) {


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
         $('.page-home').css({'background-image' : 'url(/elpuas/wp-content/uploads/2018/01/home-edited-video-blue.gif)'});
         //console.log('top');
      }
      if ( scrll >= whtIDoContent ) {
         $('.page-home').css({'background-image' : 'none' });
          // console.log('what i do section');
      }
      if ( scrll >= mWorkContent ) {
          $('.page-home').css({'background-image' : 'none' });
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
}
   // Menu Toogle Function
      $(".menu-toggle").click( function() {
        $(".bar").toggleClass("noAnim");
    });

    // Add Animation to Menu Hover
      $('.menu li').hover(
     function(){ $(this).addClass('animated infinite pulse') },
     function(){ $(this).removeClass('animated infinite pulse') }
      )
      if( $('.page-home').length ) {
        $('.filo-carousel--post-link a img').hover(
       function(){ $(this).addClass('animated infinite tada') },
       function(){ $(this).removeClass('animated infinite tada') }
     );
   }

   function goToByScroll(id){
             // Remove "link" from the ID
           id = id.replace("link", "");
             // Scroll
           $('html,body').animate({
               scrollTop: $("#"+id).offset().top},
               'slow');
       }

       $('.arrow').click(function(e) {
             // Prevent a page reload when a link is pressed
           e.preventDefault();
             // Call the scroll function
           goToByScroll($(this).attr("id"));
       });



 /*

   $(".entry-content").each(function(){
       $(this).append('<span id="" class="arrow animated infinite pulse"></span>').click(function(){
       $('html,body').animate({ scrollTop:$(this).next().offset().top}, 'slow')
   });
  })

*/
   $('.entry-content').addClass("hidden").viewportChecker({
       classToAdd: 'visible animated bounceInUp',
       offset: 100
    });

    $('.fili-scrollUp').click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });

    // Slider
    // $('.carousel-inner .carousel-item:first').addClass('active');
      $('.carousel').carousel({
          interval: 2000
        });

    // End Document Ready >>>>>>>>>>>>
});
