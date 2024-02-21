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