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
