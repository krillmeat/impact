class Minefield{
  constructor(elem,callback){
      console.log("BUILDING MINEFIELD");
      this.elem = elem;
      this.type = "";
      this.dimensions = [0,0];
      this.matrix = [];
      this.bombCount = 5;
      this.totalTiles = 0;
      this.clickedTiles = 0;
      this.gameOn = true;

      this.callback = callback;
  }

  buildMinefield(type){
      console.log("Minefield Type: ",type);
      this.type = type;
      this.dimensions = [10,10];
      this.totalTiles = this.dimensions[0] * this.dimensions[1];

      if(type == "a"){ 
          this.bombCount = 15;
      } else if(type == "b"){
          this.bombCount = 20;
      } else{
          this.bombCount = 25;
      }

      this.createMatrix(this.dimensions);

      let field = document.createElement("ul");
          field.classList.add("field");

      field.style.width = (this.matrix[0].length*50)+4+"px";

      for(let c = 0; c < this.matrix.length; c++){
          let row = document.createElement("ul");
              row.classList.add('row');
              row.dataset.rv = "r"+(c+1);
          
          for(let r = 0; r < this.matrix[c].length; r++){
              let tile = document.createElement("li");
              tile.classList.add("tile");
              tile.dataset.status = "blank";
              tile.setAttribute("onclick",`minefield.checkTile(${c},${r})`);
              tile.setAttribute("oncontextmenu",`minefield.setFlag(${c},${r})`);
              tile.dataset.coord = (c+1)+"x"+(r+1);

              row.appendChild(tile);

              this.matrix[c][r].setElem(tile);
          }

          field.appendChild(row);
      }
      
      this.elem.appendChild(field);
  }

  createMatrix(dimensions){
      let rows = dimensions[1];
      let cols = dimensions[0];

      for(let r = 0; r < rows; r++){
          this.matrix.push([]);
          for(let c = 0; c < cols; c++){
              this.matrix[r].push(new Tile("blank"));   
          }
      }

      let bc = 0;
      while(bc < this.bombCount){

          let spot = [Math.floor(Math.random() * this.matrix.length),Math.floor(Math.random() * this.matrix[0].length)];

          this.matrix[spot[0]][spot[1]].setType("bomb");

          bc++;
      }
  }

  checkTile(x,y){
      let tile = this.matrix[x][y];
      if(this.gameOn && (tile.status == "blank" || tile.status == "flagged") ){
          tile.setStatus("clicked");
          if(tile.type == "bomb"){
              tile.setStatus("bomb-detonated");
              this.blowUp();
          }else{
              this.checkNumber(x,y);
              this.clickedTiles++;
          }
  
          if(this.clickedTiles >= this.totalTiles - this.bombCount){
              console.log("YOU DID IT!");
              callback(this.elem,"win");
              this.gameOn = false;
          }
      }
  }

  checkNumber(x,y){
      let count = 0;
      let startRow = x == 0 ? 0 : -1;
      let startColumn = y == 0 ? 0 : -1;
      let endRow = x == (this.matrix.length - 1) ? 1 : 2;
      let endColumn = y == (this.matrix[0].length - 1) ? 1 : 2;
      for(let i = startRow; i < endRow; i++){
          for(let r = startColumn; r < endColumn; r++){
              if( this.matrix[x + i][y + r] != undefined && this.matrix[x + i][y + r].type == "bomb" ){
                  count++;
              }
          }
      }
      this.matrix[x][y].elem.setAttribute("bombs",count);
      if(count == 0){
          this.clickAdjacent(x,y);
      }
  }

  clickAdjacent(x,y){
      let startRow = x == 0 ? 0 : -1;
      let startColumn = y == 0 ? 0 : -1;
      let endRow = x == (this.matrix.length - 1) ? 1 : 2;
      let endColumn = y == (this.matrix[0].length - 1) ? 1 : 2;
      for(let i = startRow; i < endRow; i++){
          for(let r = startColumn; r < endColumn; r++){
              let tile = this.matrix[x + i][y + r];
              if( tile != undefined && tile.status == "blank"){
                 tile.elem.click();
              }
          }
      }
  }

  blowUp(){
      console.log("GAME OVER!");
      this.gameOn = false;

      this.elem.dataset.game = "lost";

      for(let r = 0; r < this.matrix.length; r++){
          for(let c = 0; c < this.matrix[r].length; c++){
              let tile = this.matrix[r][c];
              if(tile.status == "blank"){
                  tile.setStatus(tile.type);
              }
          }
      }

      this.callback(this.elem,"lose");
  }

  setFlag(x,y){
      if(this.matrix[x][y].type == 'bomb'){
          this.matrix[x][y].setStatus("flagged-bomb");
      } else {
          this.matrix[x][y].setStatus("flagged");
      }
  }
}