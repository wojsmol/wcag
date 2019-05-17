/* still fairly hacky, but...proof of concept of a faked slider
   that also works well for keyboard and particularly touch+AT
   users - the secret is the real input that these users will
   interact with (rather than any ARIA slider roles etc) */

var t = document.querySelector(".custom-slider-button");
t.addEventListener('pointerdown', sliderdown, false);
t.addEventListener('pointermove', slidermove, false);
t.addEventListener('pointerup', sliderup, false);

var track = document.querySelector(".custom-slider-track");
track.addEventListener('pointerup', trackhit, false);

var realSlider = document.querySelector(".custom-slider input[type='range']");

realSlider.addEventListener('change', change, false);

function sliderdown(e) {
	var t = e.target;
	t.setPointerCapture(e.pointerId);
	t.classList.add("active");
}

function sliderup(e) {
  var t = e.target;
	t.classList.remove("active");
  e.stopPropagation();
  realSlider.focus();
}

function slidermove(e) {
  var t = e.target;

  if ((t.hasPointerCapture && t.hasPointerCapture(e.pointerId)) || t.classList.contains('active')) {
  	var newpos = e.clientX - t.parentElement.offsetLeft - (t.offsetWidth/2);
	  if (newpos < 0) {
		  newpos = 0;
	  } else if ( newpos > (t.parentElement.offsetWidth - t.offsetWidth)) {
		  newpos = t.parentElement.offsetWidth - t.offsetWidth;
	  }
	  t.style.left = newpos +'px';
    realSlider.value = (newpos/(track.clientWidth - t.clientWidth)) * (realSlider.max - realSlider.min);
  }
}

function trackhit(e) {
  var t = e.target.querySelector(".custom-slider-button");

  var newpos = e.clientX - t.parentElement.offsetLeft - (t.offsetWidth/2);
	if (newpos < 0) {
	  newpos = 0;
	} else if ( newpos > (t.parentElement.offsetWidth - t.offsetWidth)) {
	  newpos = t.parentElement.offsetWidth - t.offsetWidth;
	}
	t.style.left = newpos +'px';
  realSlider.value = (newpos/(track.clientWidth - t.clientWidth)) * (realSlider.max - realSlider.min);
  realSlider.focus();
}

function change(e) {
  var newpos = (realSlider.value / (realSlider.max - realSlider.min)) * (track.clientWidth - t.clientWidth);
  t.style.left = newpos +'px'; 
}
