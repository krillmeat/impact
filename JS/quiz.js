class QUIZ{
  constructor(elem, callback){
    this.elem = elem;
    this.slides = this.elem.querySelectorAll(".step");
    this.prevButton = document.querySelector("section.quiz button.prev");
    this.nextButton = document.querySelector("section.quiz button.next");

    this.currentSlide = 0;

    this.callback = callback;

    this.setupEvents();
  }

  setupEvents(){
    this.nextButton.addEventListener('click',this.nextSlide.bind(this));
    this.prevButton.addEventListener('click',this.prevSlide.bind(this));
  }

  nextSlide(e){
    let t = e.currentTarget;
    console.log(this.slides.length);

    if(this.currentSlide === this.slides.length - 1){
      this.callback();
    }else{
      this.currentSlide++;
      this.elem.style.transform = `translateX(${-20 * (this.currentSlide)}%)`;
      this.elem.parentElement.parentElement.dataset.step = 'step-'+ ( this.currentSlide+1 );
    }
  }

  prevSlide(e){
    let t = e.currentTarget;
    console.log(this.slides.length);

    if(this.currentSlide === 0){
      this.currentSlide = this.slides.length - 1;
    }else{
      this.currentSlide--;
      this.elem.parentElement.parentElement.dataset.step = 'step-'+ ( this.currentSlide+1 );
    }

    this.elem.style.transform = `translateX(${-20 * (this.currentSlide)}%)`;
  }
}