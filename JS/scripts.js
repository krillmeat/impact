var quiz, minefield, poster;

window.onload = function(){
  window.scrollTo(0,0);  
  init();

    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
  });
}

function buildMinefield(){
  console.log("CALLBACK");
  minefield = new Minefield(document.getElementById("minefield-game"),buildPoster);
  minefield.buildMinefield("a");
  document.getElementById("minefield").scrollIntoView();
}

function buildPoster(elem,outcome){
  poster = new POSTER(document.getElementById("poster"),outcome);
  poster.buildPoster(minefield.elem);
  setTimeout(function(){
    poster.adjacentMods();
  },200);
  setTimeout(function(){
    document.getElementById("result").scrollIntoView();
  },500);
}

function init(){
    console.log("%cInitializing...","color:#999");

  quiz = new QUIZ(document.querySelector("section.quiz form"),buildMinefield);
}