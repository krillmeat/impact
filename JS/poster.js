const displayString = "know your impact";

class POSTER{
  constructor(elem,outcome){
    this.elem = elem;
    this.outcome = outcome;
  }

  buildPoster(minefieldElem){
    let detonatedCoord;
    let stringIndex = [0,0,0,0];
    let posterParent = document.createElement("div");
        posterParent.classList.add("poster-parent");
        posterParent.dataset.outcome = this.outcome;

    if(this.outcome === "lose"){
      detonatedCoord = minefieldElem.querySelector(".tile[data-status='bomb-detonated']").dataset.coord.split("x");
    }

    for(let r = 0; r < 12; r++){
      let posterRow = document.createElement("div");
          posterRow.classList.add("poster-row");

      for(let c = 0; c < 12; c++){
        let posterTile = document.createElement("div");
            posterTile.classList.add("poster-tile");

        let mineTile = document.querySelector(`ul.field li.tile[data-coord='${r+1}x${c+1}']`);

        // CLICKED
        if(mineTile.dataset.status === "clicked"){
          let bombs = mineTile.getAttribute("bombs");
          if(bombs !== 0 && bombs !== "0"){
            posterTile.dataset.bombs = bombs;
            posterTile.dataset.state = 'clicked';
            posterTile.dataset.coord = `${r+1}x${c+1}`;
            posterTile.innerHTML = `<span>${displayString.charAt(stringIndex[bombs])}</span>`;
            stringIndex[bombs] = stringIndex[bombs] >= displayString.length ? 0 : stringIndex[bombs]+1;
          }
        }

        // BOMB
        else if(mineTile.dataset.status === "bomb"){
          posterTile.dataset.state = "bomb";
          let color = this.outcome === "lose" ? "orange" : "gray";
          let pictureDigit = Math.ceil( Math.random() * 6 );
          let distanceCalc = [ Math.abs( detonatedCoord[0] - (r+1) ), Math.abs( detonatedCoord[1] - (c+1) ) ];
          let distance;

          if(distanceCalc[0] <= 2 && distanceCalc[1] <= 2){
            distance = "near";
          } else if(distanceCalc[0] > 4 && distanceCalc[1] >4){
            distance = "far";
          }
          
          posterTile.dataset.distance = distance;
          console.log("DISTANCE = ",distance);
          posterTile.innerHTML = `<img src='MEDIA/SQUARES/${pictureDigit}-${color}.png'/>`;
        }

        // FLAGGED BOMB
        else if(mineTile.dataset.status === "flagged-bomb"){
          posterTile.dataset.state = "flagged-bomb";
          let pictureDigit = Math.ceil( Math.random() * 7 );
          let distance = 1;
          posterTile.dataset.distance = distance;
          posterTile.innerHTML = `<img src='MEDIA/SQUARES/${pictureDigit}-gray.png'/>`;
        }

        // DETONATED BOMB
        else if(mineTile.dataset.status === "bomb-detonated"){
          posterTile.dataset.state = "bomb-detonated";
          let pictureDigit = Math.ceil( Math.random() * 7 );
          posterTile.innerHTML = `<img src='MEDIA/SQUARES/${pictureDigit}-orange.png'/>`;
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