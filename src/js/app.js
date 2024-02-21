class Entity {
  constructor(speedEntity){
    let self = this;
    this.data = {
      x: 0,
      y: 0,
      speed: speedEntity,
      speedX: 0,
      speedY: 0,
      endX: 0,
      endY: 0,
      direction: null,
      moveFn: {
        leftBottom(){
          self.data.x += self.data.speedX;
          self.data.y += self.data.speedY;
          if(self.data.x + self.data.speedX >= self.data.endX){
            self.data.x = self.data.endX;  
            self.data.speedX = 0;
          }
          if(self.data.y + self.data.speedY >= self.data.endY){
            self.data.y = self.data.endY;
            self.data.speedY = 0;
          }
        },
        leftTop(){
          self.data.x += self.data.speedX;
          self.data.y -= self.data.speedY;
          if(self.data.x + self.data.speedX >= self.data.endX){
            self.data.x = self.data.endX; 
            self.data.speedX = 0;
          }
          if(self.data.y - self.data.speedY <= self.data.endY){
            self.data.y = self.data.endY;
            self.data.speedY = 0;
          }
        },
        rightBottom(){
          self.data.x -= self.data.speedX;
          self.data.y += self.data.speedY;
          if(self.data.x - self.data.speedX <= self.data.endX){
            self.data.x = self.data.endX; 
            self.data.speedX = 0;
          }
          if(self.data.y + self.data.speedY >= self.data.endY){
            self.data.speedY = 0;
            self.data.y = self.data.endY;
          }
        },
        rightTop(){
          self.data.x -= self.data.speedX;
          self.data.y -= self.data.speedY;
          if(self.data.x - self.data.speedX <= self.data.endX){
            self.data.x = self.data.endX; 
            self.data.speedX = 0;
          }
          if(self.data.y - self.data.speedY <= self.data.endY){
            self.data.y = self.data.endY;
            self.data.speedY = 0;
          }

        },
      }
    }
  }
  setRoadTo(toX, toY){
    this.data.endX = toX;
    this.data.endY = toY;
    this.directionSet(toX, toY);
    var distX = distBetweenCoordinates(this.data.x, toX);
    var distY = distBetweenCoordinates(this.data.y, toY);
    var angle = Math.atan(distY/distX);
    this.data.speedX = Math.cos(angle) * this.data.speed;
    this.data.speedY = Math.sin(angle) * this.data.speed;
    console.log(this.data);
  }

  directionSet(toX, toY){
    if(toX === this.data.x && toY === this.data.y){
      this.data.direction = null;
    }else if(toX > this.data.x && toY > this.data.y){
      this.data.direction = "leftBottom";
    }else if(toX > this.data.x && toY < this.data.y){
      this.data.direction = "leftTop";
    }else if(toX < this.data.x && toY > this.data.y){
      this.data.direction = "rightBottom";
    }else if(toX < this.data.x && toY < this.data.y){
      this.data.direction = "rightTop";
    }
  }
  move(){
    this.data.direction = this.data.direction || "leftBottom";
    this.data.moveFn[this.data.direction]()
    // console.log(this.data);
  }
}


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