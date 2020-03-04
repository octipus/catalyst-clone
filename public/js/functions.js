/////////////////////   Glitch Effect   /////////////////////
{
	imagesLoaded('.glitch__img', { background: true }, () => {
		document.body.classList.remove('loading');
		document.body.classList.add('imgloaded');
	});
}

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

/////////////////////   Expertise boxes load  /////////////////////

window.onload = function() {

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

}

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
