class Player extends Entity{
  constructor(node){
    super(30);
    this.node = node;
  }
  positioning(){
    this.node.style.top = (this.data.y - 50) + 'px';
    this.node.style.left = (this.data.x - 50) + 'px';
  }
  go(){
    this.move();
    this.positioning();
  }
}


const player1 = new Player(document.querySelector(".player"));
const map = document.querySelector(".map");

function start(){
  setInterval(()=> {
    player1.go();
  }, 100);

  map.addEventListener("click", (event) => {
    if(event.target.className === "map"){
      let x = event.offsetX;
      let y = event.offsetY;
      player1.setRoadTo(x, y);
      addClickElem(x, y);
    }
  })
}