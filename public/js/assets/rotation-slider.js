!function(r){"use strict";Berserk.behaviors.rotate_slider_init={attach:function(e,i){var s={slideHeight:400,slideWidth:375};s.slideCount=r(".rotate-slid").length,s.slideAngle=360/r(".rotate-slid").length,s.sliderElement=r(".rotate-slider"),s.slides=r(".rotate-slid"),s.slidesContainer=r(".rotate-container"),s.slideAngle=360/s.slideCount,s.halfAngleRad=s.slideAngle/2*Math.PI/180,s.innerRadius=1/Math.tan(s.halfAngleRad)*s.slideWidth/2,s.outerRadius=Math.sqrt(Math.pow(s.innerRadius+s.slideHeight,2)+Math.pow(s.slideWidth/2,2)),s.upperArcHeight=s.outerRadius-(s.innerRadius+s.slideHeight),s.lowerArcHeight=s.innerRadius-s.innerRadius*Math.cos(s.halfAngleRad),s.slideFullWidth=Math.sin(s.halfAngleRad)*s.outerRadius*2,s.slideFullHeight=s.upperArcHeight+s.slideHeight+s.lowerArcHeight,s.slideSidePadding=(s.slideFullWidth-s.slideWidth)/2,s.fullArcHeight=s.outerRadius-s.outerRadius*Math.cos(s.halfAngleRad),s.lowerArcOffset=(s.slideFullWidth-Math.sin(s.halfAngleRad)*s.innerRadius*2)/2,s.slidesContainer.css("height",2*s.outerRadius+"px"),s.slidesContainer.css("width",2*s.outerRadius+"px"),s.slidesContainer.css("transform","translateX(-50%)"),s.slidesContainer.css("top","-"+s.upperArcHeight+"px");var t="M 0 "+s.fullArcHeight;t+=" A "+s.outerRadius+" "+s.outerRadius+" 0 0 1 "+s.slideFullWidth+" "+s.fullArcHeight,t+=" L "+(s.slideFullWidth-s.lowerArcOffset)+" "+s.slideFullHeight,t+=" A "+s.innerRadius+" "+s.innerRadius+" 0 0 0 "+s.lowerArcOffset+" "+s.slideFullHeight+" Z",r("#slideClip").find("path").attr("d",t);var l=0;s.slides.each(function(){r(this).css("transform-origin","center "+(s.innerRadius+s.slideHeight)+"px");var e=s.slideWidth+2*s.slideSidePadding+"px",i=s.slideHeight+s.upperArcHeight+s.lowerArcHeight+"px";r(this).css("width",e),r(this).css("height",i),r(this).css("top",s.upperArcHeight+"px"),r(this).css("transform","translateX(-50%) rotate("+s.slideAngle*l+"deg) translateY(-"+s.upperArcHeight+"px)"),r(this).css("-webkit-clip-path","url(#slideClip)"),r(this).css("clip-path","url(#slideClip)"),l++});var d=0;window.setInterval(function(){s.slidesContainer.hasClass("animate")||s.slidesContainer.addClass("animate"),d-=s.slideAngle,s.slidesContainer.css("transform","translateX(-50%) rotate("+d+"deg)")},4e3)}}}(jQuery);