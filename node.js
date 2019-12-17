const nodeType = {
  IN: "input",
  OUT: "output",
  HID: "hidden"
}

// --------------------------  Node -------------------------- //
// Each Node consists of an id, and a type
// @constructor - id: number of inputs the brain will receive
// @constructor - type: can be "input", "output", or "hidden"
// type should incorporate the nodeType enum

class Node {
  constructor(id, type, depth){
    this.id = id;             // id for the Node
    this.type = type;         // nodeType - i.e. "input", "output", "hidden"
    this.isValueSet = false;
    this.value = null;        // not initialized until incorporated into brain

    this.depth = -1;

    this.position = new Coordinate(-1, -1);  // Used for visualizing
  }

  //  ---------------------- Start getters and setters ------------------------ //
  getId(){
    return this.id;
  }

  setId(id) {
    this.id = int(id)
  }

  getType(){
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getIsValueSet(){
    return this.isValueSet;
  }

  setIsValueSet(isValueSet){
    this.isValueSet = isValueSet;
  }

  getValue(){
    if(!this.isValueSet){
      return -1
    } else {
      return this.value;
    }
  }

  setValue(value){
    this.value = value;
    this.isValueSet = true;
  }

  setPosition(x, y){
    this.position.setCoordinate(x, y);
  }

  getPosition(x, y){
    return this.position.getCoordinate();
  }

  getX(){
    return this.position.getX();
  }

  getY(){
    return this.position.getY();
  }

  setX(x){
    this.position.setX(x);
  }

  setY(y){
    this.position.setX(y);
  }

  getDepth(){
    return this.depth;
  }

  setDepth(depth){
    this.depth = depth;
  }

  //  ---------------------- End getters and setters ------------------------ //

  // Returns a string representation of the Node
  toString(){
    let value = "";
    if(this.isValueSet){
      value = ", value: " + str(this.value);
    }
    return "Node: id: " + this.id + ", type: " + this.type + value + ", Position: (" + this.position.getX() + ", " + this.position.getY() + ")";
  }
}
