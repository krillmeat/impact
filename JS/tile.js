class Tile{
  constructor(type){
      this.type = type; // What kind of tile it is (mine, number, blank)
      this.elem;
      this.status = "blank"; // This changes depending on clicked/flagged/blown up/etc.
  }

  setElem(tile){
      this.elem = tile;
  }

  setType(type){
      this.type = type;
  }

  setStatus(status){
      if(this.elem.dataset.status == "flagged" && status == "flagged"){
          this.elem.dataset.status = "blank";
          this.status = "blank";
      } else{
          this.elem.dataset.status = status;
          this.status = status;
      }
  }
}