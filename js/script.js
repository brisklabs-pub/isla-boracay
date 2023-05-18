// Slideshow function
var slideIndex = 0;
showSlides();

function showSlides() {
  var slides = document.getElementsByClassName("mySlides");

  // Hide all slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Increment slide index
  slideIndex++;

  // Wrap around when last slide is reached
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Display current slide
  slides[slideIndex - 1].style.display = "block";

  // Call the function every 2 seconds
  setTimeout(showSlides, 2000);
}
