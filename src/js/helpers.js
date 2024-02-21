function parsePxString(string){
  if(string.length < 3){
    return 0;
  }
  return parseInt(string.slice(0, string.length - 2), 10);
}

function distBetweenCoordinates(x1, x2){
  if(x1 > x2){
    return x1 - x2;
  }
  return x2 - x1;
}

function addClickElem(x, y){
  var newDiv = document.createElement("div");
  newDiv.classList.add('clickRed');
  newDiv.style.top =(y - 15) + 'px';
  newDiv.style.left = (x - 15) + 'px';
  map.appendChild(newDiv);
}