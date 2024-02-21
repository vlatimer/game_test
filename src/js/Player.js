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