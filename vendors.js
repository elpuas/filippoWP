!function(t,e){"use strict";var i=t(document);t.fn.typeIt=function(i){return this.each(function(){var s=t(this),h=s.data("typeit");h!==e&&(clearTimeout(h.tTO),clearTimeout(h.dTO),s.removeData("typeit")),s.data("typeit",new t.typeIt(s,i))})},t.typeIt=function(i,s){this.d={strings:[],speed:100,deleteSpeed:e,lifeLike:!0,cursor:!0,cursorSpeed:1e3,breakLines:!0,breakDelay:750,deleteDelay:750,startDelay:250,startDelete:!1,loop:!1,loopDelay:750,html:!0,autoStart:!0,callback:function(){}},this.queue=[],this.queueIndex=0,this.hasStarted=!1,this.inTag=!1,this.stringsToDelete="",this.style='style="display:inline;position:relative;font:inherit;color:inherit;"',this.s=t.extend({},this.d,s),this.el=i,this._init()},t.typeIt.prototype={_init:function(){this.el.find(".ti-container, .ti-cursor, .ti-placeholder").remove(),this._elCheck(),this.s.strings=this._toArray(this.s.strings),this.el.html('<i class="ti-placeholder" style="display:inline-block;line-height:0;visibility:hidden;overflow:hidden;">.</i><span '+this.style+' class="ti-container"></span>'),this.tel=this.el.find("span"),this.insert=function(t){this.tel.append(t)},this.s.startDelete&&(this.tel.html(this.stringsToDelete),this.queue.push([this["delete"]])),this._generateQueue(),this._kickoff()},_kickoff:function(){this._cursor(),this.s.autoStart?this._startQueue():this._isVisible()?(this.hasStarted=!0,this._startQueue()):i.on("scroll",function(){this._isVisible()&&!this.hasStarted&&(this.hasStarted=!0,this._startQueue())}.bind(this))},_generateQueue:function(){for(var t=0;t<this.s.strings.length;t++)if(this.queue.push([this.type,this.s.strings[t]]),t<this.s.strings.length-1){var e=this.queue.length,i=this.s.breakLines?this.s.breakDelay:this.s.deleteDelay;this.queue.push([this.s.breakLines?this["break"]:this["delete"]]),this.queue.splice(e,0,[this.pause,i/2]),this.queue.splice(e+2,0,[this.pause,i/2])}},_startQueue:function(){this._to(function(){this._executeQueue()}.bind(this),this.s.startDelay)},type:function(t,e){e="undefined"==typeof e||e,t=this._toArray(t),e&&(t=this._rake(t),t=t[0]),this.tTO=setTimeout(function(){if(this._setPace(this),this.s.html&&t[0].indexOf("<")!==-1&&t[0].indexOf("</")===-1&&!this.inTag){for(var e=t.length-1;e>=0;e--)t[e].indexOf("</")!==-1&&(this.tagCount=1,this.tagDuration=e);this._makeNode(t[0])}else this._print(t[0]);t.splice(0,1),t.length?this.type(t,!1):this._executeQueue()}.bind(this),this.typePace)},pause:function(t){t=t===e?this.s.breakDelay:t,this._to(function(){this._executeQueue()}.bind(this),t)},"break":function(){this.insert("<br>"),this._executeQueue()},mergeSet:function(e){this.s=t.extend({},this.s,e),this._executeQueue()},_print:function(e){this.inTag?(t(this.tag,this.el).last().append(e),this.tagCount<this.tagDuration?this.tagCount++:this.inTag=!1):this.insert(e)},empty:function(){this.tel.html(""),this._executeQueue()},"delete":function(t){this.deleteTimeout=setTimeout(function(){this._setPace();for(var i=this.tel.html().split(""),s=t===e||null===t?i.length-1:t+1,h=i.length-1;h>-1;h--){if(">"!==i[h]&&";"!==i[h]||!this.s.html){i.pop();break}for(var n=h;n>-1;n--){if("<br>"===i.slice(n-3,n+1).join("")){i.splice(n-3,4);break}if("&"===i[n]){i.splice(n,h-n+1);break}if("<"===i[n]&&">"!==i[n-1]){if(";"===i[n-1])for(var r=n-1;r>-1;r--)if("&"===i[r]){i.splice(r,n-r);break}i.splice(n-1,1);break}}break}if(this.tel.html().indexOf("></")>-1)for(var u=this.tel.html().indexOf("></")-2;u>=0;u--)if("<"===i[u]){i.splice(u,i.length-u);break}this.tel.html(i.join("")),s>(t===e?0:2)?this["delete"](t===e?e:t-1):this._executeQueue()}.bind(this),this.deletePace)},_isVisible:function(){var e=t(window),i={top:e.scrollTop(),left:e.scrollLeft()};i.right=i.left+e.width(),i.bottom=i.top+e.height();var s=this.el.outerHeight(),h=this.el.outerWidth();if(!h||!s)return!1;var n=this.el.offset();n.right=n.left+h,n.bottom=n.top+s;var r=!(i.right<n.left||i.left>n.right||i.bottom<n.top||i.top>n.bottom);if(!r)return!1;var u={top:Math.min(1,(n.bottom-i.top)/s),bottom:Math.min(1,(i.bottom-n.top)/s),left:Math.min(1,(n.right-i.left)/h),right:Math.min(1,(i.right-n.left)/h)};return u.left*u.right>=1&&u.top*u.bottom>=1},_executeQueue:function(){if(this.queueIndex<this.queue.length){var t=this.queue[this.queueIndex];this.queueIndex++,this.isLooping&&1===this.queueIndex?this._to(function(){t[0].bind(this)(t[1])}.bind(this),this.s.loopDelay/2):t[0].bind(this)(t[1])}else this.s.loop?(this.queueIndex=0,this.isLooping=!0,this._to(function(){this["delete"]()}.bind(this),this.s.loopDelay/2)):this.s.callback()},_to:function(t,e){setTimeout(function(){t()}.bind(this),e)},_elCheck:function(){!this.s.startDelete&&this.el.html().replace(/(\r\n|\n|\r)/gm,"").length>0?this.s.strings=this.el.html().trim():this.s.startDelete&&(this.stringsToDelete=this.el.html())},_toArray:function(t){return t.constructor===Array?t.slice(0):t.split("<br>")},_cursor:function(){if(this.s.cursor){this.el.append("<span "+this.style+'class="ti-cursor">|</span>');var t=this.s.cursorSpeed,e=this;!function i(){e.el.find(".ti-cursor").fadeTo(t/2,0).fadeTo(t/2,1),e._to(i,t)}()}},_setPace:function(){var t=this.s.speed,i=this.s.deleteSpeed!==e?this.s.deleteSpeed:this.s.speed/3,s=t/2,h=i/2;this.typePace=this.s.lifeLike?this._randomInRange(t,s):t,this.deletePace=this.s.lifeLike?this._randomInRange(i,h):i},_randomInRange:function(t,e){return Math.abs(Math.random()*(t+e-(t-e))+(t-e))},_rake:function(t){for(var e=0;e<t.length;e++)if(t[e]=t[e].split(""),this.s.html){this.tPos=[];for(var i,s=this.tPos,h=!1,n=0;n<t[e].length;n++)"<"!==t[e][n]&&"&"!==t[e][n]||(s[0]=n,h="&"===t[e][n]),(">"===t[e][n]||";"===t[e][n]&&h)&&(s[1]=n,n=0,i=t[e].slice(s[0],s[1]+1).join(""),t[e].splice(s[0],s[1]-s[0]+1,i),h=!1)}return t},_makeNode:function(e){this.tag=t(t.parseHTML(e)),this._print(this.tag),this.inTag=!0}},t.fn.tiType=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.type,s]),this)},t.fn.tiEmpty=function(){var s=t(this).data("typeit");return s===e?i:(s.queue.push([s.empty]),this)},t.fn.tiDelete=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h["delete"],s]),this)},t.fn.tiPause=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.pause,s]),this)},t.fn.tiBreak=function(){var s=t(this).data("typeit");return s===e?i:(s.queue.push([s["break"]]),this)},t.fn.tiSettings=function(s){var h=t(this).data("typeit");return h===e?i:(h.queue.push([h.mergeSet,s]),this)}}(jQuery);