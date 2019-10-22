//Glitch effect
{
	imagesLoaded('.glitch__img', { background: true }, () => {
		document.body.classList.remove('loading');
		document.body.classList.add('imgloaded');
	});
}

//Title animation on mousemove
$(document).mousemove(function(event){
   var xPos = (event.clientX/$(window).width())-0.5,
       yPos = (event.clientY/$(window).height())-0.5,
       box = $('.box'),
       coord = $('.coordinates');

  TweenLite.to(box, 0.6, {
    rotationY: 15 * xPos,
    rotationX: 15 * yPos,
    ease: Power1.easeOut,
    transformPerspective: 900,
    transformOrigin: 'center'
  });
});
