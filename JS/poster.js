const displayString = "this is the phrase to show about things";

class POSTER{
  constructor(elem,outcome){
    this.elem = elem;
    this.outcome = outcome;
  }

  buildPoster(minefieldElem){
    let stringIndex = 0;
    let posterParent = document.createElement("div");
        posterParent.classList.add("poster-parent");
        posterParent.dataset.outcome = this.outcome;

    for(let r = 0; r < 10; r++){
      let posterRow = document.createElement("div");
          posterRow.classList.add("poster-row");

      for(let c = 0; c < 10; c++){
        let posterTile = document.createElement("div");
            posterTile.classList.add("poster-tile");

        let mineTile = document.querySelector(`ul.field li.tile[data-coord='${r+1}x${c+1}']`);

        if(mineTile.dataset.status === "clicked"){
          let bombs = mineTile.getAttribute("bombs");
          if(bombs !== 0 && bombs !== "0"){
            posterTile.dataset.bombs = bombs;
            posterTile.dataset.state = 'clicked';
            posterTile.dataset.coord = `${r+1}x${c+1}`;
            posterTile.innerHTML = `<span>${displayString.charAt(stringIndex)}</span>`;
            stringIndex = stringIndex >= displayString.length ? 0 : stringIndex+1;
          }
        }

        posterRow.appendChild(posterTile)
      }

      posterParent.appendChild(posterRow);
    }

    this.elem.appendChild(posterParent);
  }

  adjacentMods(){
      let posterParent = this.elem.querySelector(".poster-parent");

      let clicked = posterParent.querySelectorAll(".poster-tile[data-state='clicked'][data-bombs='1']");

      for(let i = 0; i < clicked.length; i++){
        let adjacentCount = 0;
        let coords = clicked[i].dataset.coord.split("x");

        for(let r = coords[0] - 1; r < coords[0] + 1; r++){
          if(r >= 0 && r <= 9){
            for(let c = coords[1] - 1; c < coords[1] + 1; c++){
              if(c >= 0 && c <= 9){
                let offTile = posterParent.querySelector(`.poster-tile[data-coord='${r+1}x${c+1}']`);
                if(offTile?.dataset.state === "clicked" && offTile?.dataset.bombs !== 0){
                  adjacentCount++;
                }
              }
            }
          }
        }

        clicked[i].dataset.adjacent=adjacentCount;
      } /* clicked loop */
  }
}