/////////////////////   Title animation on mousemove   /////////////////////

$( document ).ready(function() {
	setTimeout(function() {
			$(".home").mousemove(function(e) {
					parallaxIt(e, ".one", -50);
					parallaxIt(e, ".two", 30);
					parallaxIt(e, ".three", 50);
					parallaxIt(e, ".four", 20);
			});

			function parallaxIt(e, target, movement) {
					var $this = $(".home");
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;


					TweenMax.to(target, 1, {
							x: (relX - $this.width() / 2) / $this.width() * movement,
							y: (relY - $this.height() / 2) / $this.height() * movement
					});
			}
    }, 1500);
});

/////////////////////   Nav Submenu Accordion   /////////////////////

$( document ).ready(function() {
	$( function() {
	    $( "#accordion" ).accordion({
				collapsible: true
			});
	  } );
});

/////////////////////   Navigation Dropdown   /////////////////////

$('.menu__item').click(function() {
    if($(this).hasClass('active'))
    {
        $(this).addClass('inactive').removeClass('active');
    }
    else
    {
       $(this).addClass('active').removeClass('inactive');
    }
  });

/////////////////////   Expertise boxes load  /////////////////////
if (top.location.pathname === '/expertise'){
		// wait until DOM is ready
		// $(document).ready(function(){
		  // wait until window is loaded - all images, styles-sheets, fonts, links, and other media assets
		  $(window).on("load", function(){
		      // OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
		    window.requestAnimationFrame(function() {
					var timeline = new TimelineMax();
					timeline.from("#two", 1, {x:-400},0)
					timeline.from("#three", 1, {x:-600},0)
					timeline.from("#four", 1, {x:-800},0)
				  timeline.from("#five", 1, {y:800},0)
					timeline.from("#six", 1, {x:-1200},0)
					timeline.from("#seven", 1, {y:-800},0)
					timeline.from("#eight", 1, {y:-1200},0)
					timeline.from("#nine", 1, {x:400},0)
					timeline.from("#ten", 1, {x:600},0)
					timeline.from("#eleven", 1, {x:800},0)
					timeline.from("#twelve", 1, {y:-600},0)
					timeline.from("#thirteen", 1, {y:800},0)
					timeline.from("#fourteen", 1, {y:600},0)
		    });
		  });
		// });
	}

	/////////////////////   Expertise boxes load  /////////////////////
if (top.location.pathname === '/fitness'){

	var root  = document.documentElement;
	var body  = document.body;
	var pages = document.querySelectorAll(".pop");
	var tiles = document.querySelectorAll(".tile");

	for (var i = 0; i < tiles.length; i++) {
	  addListeners(tiles[i], pages[i]);
	}

	function addListeners(tile, page) {

	  tile.addEventListener("click", function() {
	    animateHero(tile, page);
	  });

	  page.addEventListener("click", function() {
	    animateHero(page, tile);
	  });
	}

	function animateHero(fromHero, toHero) {

	  var clone = fromHero.cloneNode(true);

	  var from = calculatePosition(fromHero);
	  var to = calculatePosition(toHero);

	  TweenLite.set([fromHero, toHero], { visibility: "hidden" });
	  TweenLite.set(clone, { position: "absolute", margin: 0 });

	  body.appendChild(clone);

	  var style = {
	    x: to.left - from.left,
	    y: to.top - from.top,
	    width: to.width,
	    height: to.height,
	    autoRound: false,
	    ease: Power1.easeOut,
	    onComplete: onComplete
	  };

	  TweenLite.set(clone, from);
	  TweenLite.to(clone, 0.3, style)

	  function onComplete() {

	    TweenLite.set(toHero, { visibility: "visible" });
	    body.removeChild(clone);
	  }
	}

	function calculatePosition(element) {

	  var rect = element.getBoundingClientRect();

	  var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
	  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

	  var clientTop  = root.clientTop  || body.clientTop  || 0;
	  var clientLeft = root.clientLeft || body.clientLeft || 0;

	  return {
	    top: Math.round(rect.top + scrollTop - clientTop),
	    left: Math.round(rect.left + scrollLeft - clientLeft),
	    height: rect.height,
	    width: rect.width,
	  };
	}
}
