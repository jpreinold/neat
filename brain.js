
// -----------------------------  Brain ----------------------------- //
// -------------------  Brain is a Neural Network ------------------- //
// Each Brain consists of a list of Nodes and a list of Connections
// @constructor - numInputs: number of inputs the brain will receive
// @constructor - numOutputs: number of outputs the brain can use

class Brain {
  constructor(numInputs, numOutputs){
    this.nodes = [];                // The List of Nodes
    this.connections = [];          // The List of Connections
    this.numInputs = numInputs;     // Number of numInputs
    this.numOutputs = numOutputs;   // Number of Outputs
    this.numNodes = 0;              // Number of Nodes in the Brain structure
    this.numConnections = 0;        // Number of Connections in the Brain structure


    // Set up basic I/O Brain structure
    for(let i = 0; i < numInputs; i++){
      this.nodes.push(this.createNewNode(nodeType.IN));

    }
    for(let i = 0; i < numOutputs; i++){
      this.nodes.push(this.createNewNode(nodeType.OUT));
      this.numNodes += 1;
    }

  }

  // Returns the index of the Node in this.nodes based off of the inNodeId
  // @param - nodeId: id of the Node
  // @return - index of the Node with the id nodeId, -1 if Node not found
  getNodeIndex(nodeId){
    let i;
    let found = false;
    for(i = 0; i < this.numNodes && !found; i++){
      if(this.nodes[i].getId() == nodeId){
        found = true;
      }
    }
    if(!found) { i = -1 };
    return i;
  }

  // Creates a new Node object
  // @return - new Node object
  createNewNode(type){

    let newNode;

    newNode = new Node(this.numNodes, type);
    this.numNodes += 1;

    return newNode;
  }

  // Creates a new Connection object
  // @return - new Connection object
  createNewConnection(inNodeId, outNodeId, weight, enabled, innov){
    let newConnection;

    newConnection = new Connection(inNodeId, outNodeId, weight, enabled, innov);
    this.numConnections += 1;

    return newConnection;
  }


  think(inputs){

  }

  setColor(value){
    value = int(value * 100);
    let r = map(value, 0, 100, negativeColor.R, positiveColor.R);
    let g = map(value, 0, 100, negativeColor.G, positiveColor.G);
    let b = map(value, 0, 100, negativeColor.B, positiveColor.B);
    fill(r, g, b);
  }

  // Displays brain structure within boundaries given
  visualize(x, y, width, height){
    let nodeRadius = height / 20;
    let nodePadding = height / 15;
    let inputLayerHeight = this.numInputs * (nodePadding) - nodePadding;
    let outputLayerHeight = this.numOutputs * (nodePadding) - nodePadding;
    let offset = (height - inputLayerHeight) / 2;

    // visualize inputs
    for(let i = 0; i < this.numInputs; i++){

      push();
      strokeWeight(2);
      stroke(0);

      if(this.nodes[i].getIsValueSet()){
        this.setColor(this.nodes[i].getValue());
      } else {
        //fill(255);
        this.setColor(Math.random());
      }

      let xPos = x + (nodePadding * 2);
      let yPos = (y + nodePadding) * i + offset;
      let wid = nodeRadius;
      let hgt = nodeRadius;
      ellipse(xPos, yPos, wid, hgt);
      pop();
    }

    offset = (height - outputLayerHeight) / 2;

    // visualize outputs
    for(let i = this.numOutputs; i > 0; i--){

      push();
      strokeWeight(2);
      stroke(0);

      if(this.nodes[this.nodes.length - i].getIsValueSet()){
        this.setColor(this.nodes[i].getValue());
      } else {
        //fill(255);
        this.setColor(Math.random());
      }

      let xPos = x + width - (nodePadding * 2);
      let yPos = (y + nodePadding) * i + offset;
      let wid = nodeRadius;
      let hgt = nodeRadius;
      ellipse(xPos, yPos, wid, hgt);
      pop();
    }


  }

  // Returns String representation of Brain structure
  toString(){
    let string = "Brain Structure: \n";
    string += "   Nodes:\n";
    for(let i = 0; i < this.nodes.length; i++){
      string += "      " + this.nodes[i].toString() + "\n";
    }
    string += "   Connections:\n";
    for(let i = 0; i < this.connections.length; i++){
      string += "      " + this.connections[i].toString() + "\n";
    }
    return string;
  }
}
