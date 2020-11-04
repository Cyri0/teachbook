var slideIndex = 0;
showSlides();

function showSlides() {
  console.log(slideIndex + "hi!");
  var slides = document.getElementsByClassName("changeable");


  let actual = slides[slideIndex];

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
    }
  }
  actual.classList.add("active");
  console.log(slides);
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  setTimeout(showSlides, 3000);
}