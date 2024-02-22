class Entity {
  constructor(width, x, y){
    this.data = {
      x: x || 0,
      y: y || 0,
      radius: width / 2, // radius of width circle
    }
  }
}

class MovingEntity extends Entity{
  constructor(speedEntity, width, x ,y){
    super(width, x, y);
    let self = this;
    this.data = {
      ... this.data,
      speed: speedEntity, // Speed in any direction
      speedX: 0,
      speedY: 0,
      endX: 0, // Coordinates entity to go
      endY: 0,
      see: this.data.radius + 50, // radius of watch area
      move: () => {
        self.data.x += self.data.speedX;
        self.data.y += self.data.speedY;
        self.lastMove();
        
        if(1 >= distBetweenPoints(self.data.x, self.data.y, self.data.endX, self.data.endY)){
          self.data.speedX = 0;
          self.data.speedY = 0;
        };
      }
    }
  }
  
  setRoadTo(toX, toY){
    this.data.endX = toX;
    this.data.endY = toY;
    let distX = distBetweenCoordinates(this.data.x, toX);
    let distY = distBetweenCoordinates(this.data.y, toY);
    let angle = Math.atan(distY / distX);
    this.data.speedX = Math.cos(angle) * this.data.speed;
    this.data.speedY = Math.sin(angle) * this.data.speed;
    this.directionSet(toX, toY);
    console.log(this.data);
  }

  lastMove(){
    let dist = distBetweenPoints(this.data.x, this.data.y, this.data.endX, this.data.endY);
    if(dist < this.data.speed && dist){
      let distX = distBetweenCoordinates(this.data.x, this.data.endX);
      let distY = distBetweenCoordinates(this.data.y, this.data.endY);
      let angle = Math.atan(distY / distX);
      this.data.speedX = Math.cos(angle) * dist;
      this.data.speedY = Math.sin(angle) * dist;
      this.directionSet(this.data.endX, this.data.endY);
      return true;
    }
    return false;
  }

  directionSet(toX, toY){
    let xFactor = 0;
    let yFactor = 0; 
    if(toX > this.data.x && toY > this.data.y){
      xFactor = 1;
      yFactor = 1;
    }else if(toX > this.data.x && toY < this.data.y){
      xFactor = 1;
      yFactor = -1;
    }else if(toX < this.data.x && toY > this.data.y){
      xFactor = -1;
      yFactor = 1;
    }else if(toX < this.data.x && toY < this.data.y){
      xFactor = -1;
      yFactor = -1;
    }
    this.data.speedX *= xFactor;
    this.data.speedY *= yFactor;
  }
  
  move(){
    this.data.move()
  }
}

