/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * https://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

// Plugin @RokoCB :: Return the visible amount of px
// of any element currently in viewport.
// stackoverflow.com/questions/24768795/
$(window).load(function(){
// Plugin @RokoCB :: Return the visible amount of px
// of any element currently in viewport.
// stackoverflow.com/questions/24768795/
;(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el){
       function visPx(){
         var H = $(this).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));


/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * https://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);



$('.carousel').carousel({
	interval: 0
});

!function(t,e){"use strict";var i=t(document);t.fn.typeIt=function(i){return this.each(function(){var s=t(this),h=s.data("typeit");h!==e&&(clearTimeout(h.tTO),clearTimeout(h.dTO),s.removeData("typeit")),s.data("typeit",new t.typeIt(s,i))})},t.typeIt=function(i,s){this.d={strings:[],speed:100,deleteSpeed:e,lifeLike:!0,cursor:!0,cursorSpeed:1e3,breakLines:!0,breakDelay:750,deleteDelay:750,startDelay:250,startDelete:!1,loop:!1,loopDelay:750,html:!0,autoStart:!0,callback:function(){}},this.queue=[],this.queueIndex=0,this.hasStarted=!1,this.inTag=!1,this.stringsToDelete="",this.style='style="display:inline;position:relative;font:inherit;color:inherit;"',this.s=t.extend({},this.d,s),this.el=i,this._init()},t.typeIt.prototype={_init:function(){this.el.find(".ti-container, .ti-cursor, .ti-placeholder").remove(),this._elCheck(),this.s.strings=this._toArray(this.s.strings),this.el.html('<i class="ti-placeholder" style="display:inline-block;line-height:0;visibility:hidden;overflow:hidden;">.</i><span '+this.style+' class="ti-container"></span>'),this.tel=this.el.find("span"),this.insert=function(t){this.tel.append(t)},this.s.startDelete&&(this.tel.html(this.stringsToDelete),this.queue.push([this["delete"]])),this._generateQueue(),this._kickoff()},_kickoff:function(){this._cursor(),this.s.autoStart?this._startQueue():this._isVisible()?(this.hasStarted=!0,this._startQueue()):i.on("scroll",function(){this._isVisible()&&!this.hasStarted&&(this.hasStarted=!0,this._startQueue())}.bind(this))},_generateQueue:function(){for(var t=0;t<this.s.strings.length;t++)if(this.queue.push([this.type,this.s.strings[t]]),t<this.s.strings.length-1){var e=this.queue.length,i=this.s.breakLines?this.s.breakDelay:this.s.deleteDelay;this.queue.push([this.s.breakLines?this["break"]:this["delete"]]),this.queue.splice(e,0,[this.pause,i/2]),this.queue.splice(e+2,0,[this.pause,i/2])}},_startQueue:function(){this._to(function(){this._executeQueue()}.bind(this),this.s.startDelay)},type:function(t,e){e="undefined"==typeof e||e,t=this._toArray(t),e&&(t=this._rake(t),t=t[0]),this.tTO=setTimeout(function(){if(this._setPace(this),this.s.html&&t[0].indexOf("<")!==-1&&t[0].indexOf("</")===-1&&!this.inTag){for(var e=t.length-1;e>=0;e--)t[e].indexOf("</")!==-1&&(this.tagCount=1,this.tagDuration=e);this._makeNode(t[0])}else this._print(t[0]);t.splice(0,1),t.length?this.type(t,!1):this._executeQueue()}.bind(this),this.typePace)},pause:function(t){t=t===e?this.s.breakDelay:t,this._to(function(){this._executeQueue()}.bind(this),t)},"break":function(){this.insert("<br>"),this._executeQueue()},mergeSet:function(e){this.s=t.extend({},this.s,e),this._executeQueue()},_print:function(e){this.inTag?(t(this.tag,this.el).last().append(e),this.tagCount<this.tagDuration?this.tagCount++:this.inTag=!1):this.insert(e)},empty:function(){this.tel.html(""),this._executeQueue()},"delete":function(t){this.deleteTimeout=setTimeout(function(){this._setPace();for(var i=this.tel.html().split(""),s=t===e||null===t?i.length-1:t+1,h=i.length-1;h>-1;h--){if(">"!==i[h]&&";"!==i[h]||!this.s.html){i.pop();break}for(var n=h;n>-1;n--){if("<br>"===i.slice(n-3,n+1).join("")){i.splice(n-3,4);break}if("&"===i[n]){i.splice(n,h-n+1);break}if("<"===i[n]&&">"!==i[n-1]){if(";"===i[n-1])for(var r=n-1;r>-1;r--)if("&"===i[r]){i.splice(r,n-r);break}i.splice(n-1,1);break}}break}if(this.tel.html().indexOf("></")>-1)for(var u=this.tel.html().indexOf("></")-2;u>=0;u--)if("<"===i[u]){i.splice(u,i.length-u);break}this.tel.html(i.join("")),s>(t===e?0:2)?this["delete"](t===e?e:t-1):this._executeQueue()}.bind(this),this.deletePace)},_isVisible:function(){var e=t(window),i={top:e.scrollTop(),left:e.scrollLeft()};i.right=i.left+e.width(),i.bottom=i.top+e.height();var s=this.el.outerHeight(),h=this.el.outerWidth();if(!h||!s)return!1;var n=this.el.offset();n.right=n.left+h,n.bottom=n.top+s;var r=!(i.right<n.left||i.left>n.right||i.bottom<n.top||i.top>n.bottom);if(!r)return!1;var u={top:Math.min(1,(n.bottom-i.top)/s),bottom:Math.min(1,(i.bottom-n.top)/s),left:Math.min(1,(n.right-i.left)/h),right:Math.min(1,(i.right-n.left)/h)};return u.left*u.right>=1&&u.top*u.bottom>=1},_executeQueue:function(){if(this.queueIndex<this.queue.length){var t=this.queue[this.queueIndex];this.queueIndex++,this.isLooping&&1===this.queueIndex?this._to(function(){t[0].bind(this)(t[1])}.bind(this),this.s.loopDelay/2):t[0].bind(this)(t[1])}else this.s.loop?(this.queueIndex=0,this.isLooping=!0,this._to(function(){this["delete"]()}.bind(this),this.s.loopDelay/2)):this.s.callback()},_to:function(t,e){setTimeout(function(){t()}.bind(this),e)},_elCheck:function(){!this.s.startDelete&&this.el.html().replace(/(\r\n|\n|\r)/gm,"").length>0?this.s.strings=this.el.html().trim():this.s.startDelete&&(this.stringsToDelete=this.el.html())},_toArray:function(t){return t.constructor===Array?t.slice(0):t.split("<br>")},_cursor:function(){if(this.s.cursor){this.el.append("<span "+this.style+'class="ti-cursor">|</span>');var t=this.s.cursorSpeed,e=this;!function i(){e.el.find(".ti-cursor").fadeTo(t/2,0).fadeTo(t/2,1),e._to(i,t)}()}},_setPace:function(){var t=this.s.speed,i=this.s.deleteSpeed!==e?this.s.deleteSpeed:this.s.speed/3,s=t/2,h=i/2;this.typePace=this.s.lifeLike?this._randomInRange(t,s):t,this.deletePace=this.s.lifeLike?this._randomInRange(i,h):i},_randomInRange:function(t,e){return Math.abs(Math.random()*(t+e-(t-e))+(t-e))},_rake:function(t){for(var e=0;e<t.length;e++)if(t[e]=t[e].split(""),this.s.html){this.tPos=[];for(var i,s=this.tPos,h=!1,n=0;n<t[e].length;n++)"<"!==t[e][n]&&"&"!==t[e][n]||(s[0]=n,h="&"===t[e][n]),(">"===t[e][n]||";"===t[e][n]&&h)&&(s[1]=n,n=0,i=t[e].slice(s[0],s[1]+1).join(""),t[e].splice(s[0],s[1]-s[0]+1,i),h=!1)}return t},_makeNode:function(e){this.tag=t(t.parseHTML(e)),this._print(this.tag),this.inTag=!0}},t.fn.tiType=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.type,s]),this)},t.fn.tiEmpty=function(){var s=t(this).data("typeit");return s===e?i:(s.queue.push([s.empty]),this)},t.fn.tiDelete=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h["delete"],s]),this)},t.fn.tiPause=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.pause,s]),this)},t.fn.tiBreak=function(){var s=t(this).data("typeit");return s===e?i:(s.queue.push([s["break"]]),this)},t.fn.tiSettings=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.mergeSet,s]),this)}}(jQuery);
