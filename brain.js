
// -----------------------------  Brain ----------------------------- //
// -------------------  Brain is a Neural Network ------------------- //
// Each Brain consists of a list of Nodes and a list of Connections
// @constructor - numInputs: number of inputs the brain will receive
// @constructor - numOutputs: number of outputs the brain can use

class Brain {
  constructor(numInputs, numOutputs){
    this.nodes = [];                // The List of Nodes
    this.connections = [];          // The List of Connections
    this.hiddenLayers = [];         // The List of 2D Hidden Layers
    this.numInputs = numInputs;     // Number of Inputs
    this.numHiddenNodes = 0;        // Number of Hidden Nodes
    this.numHiddenLayers = 0;       // Number of Hidden Layers
    this.numOutputs = numOutputs;   // Number of Outputs
    this.numNodes = 0;              // Number of Nodes in the Brain structure
    this.numConnections = 0;        // Number of Connections in the Brain structure
    this.totalDepth = 2;            // Initial no hidden layers (Only Input and Output layers)


    // Set up basic I/O Brain structure
    for(let i = 0; i < numInputs; i++){
      this.nodes.push(this.createNewNode(nodeType.IN, 0));

    }
    for(let i = 0; i < numOutputs; i++){
      this.nodes.push(this.createNewNode(nodeType.OUT, this.totalDepth - 1));
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
    return i - 1;
  }

  getNodeId(index){
    return this.nodes[index].getId();
  }

  // Creates a new Node object
  // @return - new Node object
  createNewNode(type, depth){

    let newNode;

    newNode = new Node(this.numNodes, type, depth);
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

  mutateAddConnection(){
    let inNodeIndex, outNodeIndex, inNodeId, outNodeId, weight, enabled, innov;
    let selectNewNodes = true;
    while(selectNewNodes){

      inNodeIndex = randInt(0, this.numNodes - this.numOutputs);
      outNodeIndex = randInt(this.numInputs, this.numNodes - 1);
      if(this.nodes[outNodeIndex].getDepth() < this.nodes[inNodeIndex].getDepth()){
        let temp = outNodeIndex;
        outNodeIndex = inNodeIndex;
        inNodeIndex = temp;
      }

      selectNewNodes = false;
      for(let i = 0; i < this.connections.length; i++){   // Traverse connections to see if it Already exists
        if(this.connections[i].getInNodeId() == this.nodes[inNodeIndex].getId()){
          if(this.connections[i].getOutNodeId() == this.nodes[outNodeIndex].getId()){
            selectNewNodes = true;
          }
        }
      }
    }

    inNodeId = this.getNodeId(inNodeIndex);
    outNodeId = this.getNodeId(outNodeIndex);

    weight = randFloat(-1, 1);
    enabled = randBool();
    innov = this.numConnections + 1;

    this.connections.push(this.createNewConnection(inNodeId, outNodeId, weight, enabled, innov));



  }

  mutateAddNode(){

  }

  think(inputs){

  }

  setColorAndWeight(value, weight){
    strokeWeight(Math.round(weight));
    if(value != -1){
      value = int(value * 100);
      let r = map(value, 0, 100, negativeColor.R, positiveColor.R);
      let g = map(value, 0, 100, negativeColor.G, positiveColor.G);
      let b = map(value, 0, 100, negativeColor.B, positiveColor.B);
      stroke(r, g, b);
      fill(r, g, b);
    } else {
      stroke(255);
      fill(255);
    }
  }

  // Displays brain structure within boundaries given
  visualize(x, y, width, height){
    let nodeRadius = height / 20;
    let nodePadding = height / 15;
    let inputLayerHeight = this.numInputs * (nodePadding) - nodePadding;
    let outputLayerHeight = this.numOutputs * (nodePadding) - nodePadding;

    let inputOffset = (height - inputLayerHeight) / 2;
    let outputOffset = (height - outputLayerHeight) / 2;

    let xPos, yPos;

    for(let i = 0; i < this.connections.length; i++){
      push();
      if(this.connections[i].isEnabled()){
        let inNode = this.nodes[this.getNodeIndex(this.connections[i].getInNodeId())];
        let inNodeX = inNode.getX();
        let inNodeY = inNode.getY();
        let outNode = this.nodes[this.getNodeIndex(this.connections[i].getOutNodeId())];
        let outNodeX = outNode.getX();
        let outNodeY = outNode.getY();
        let connectionWeight = this.connections[i].getWeight();
        let thickness = map(Math.abs(connectionWeight), 0, 1, 1, 4);
        this.setColorAndWeight(connectionWeight, thickness);
        //console.log(inNodeX + ", " + inNodeY + ", " + outNodeX + ", " + outNodeX + ", " + thickness + ", " + connectionWeight);
        line(inNodeX, inNodeY, outNodeX, outNodeY);
      }
      pop();

    }

    for(let i = 0; i < this.nodes.length; i++){

      push();
      // Set color for Node
      if(this.nodes[i].getIsValueSet()){
        this.setColorAndWeight(this.nodes[i].getValue(), 2);
      } else {
        this.setColorAndWeight(-1, 2);
      }
      // End Set color for Node

      if(this.nodes[i].position.x == -1 && this.nodes[i].position.x == -1){
        // Set coordinate
        if(this.nodes[i].getType() == nodeType.IN){
          // Inputs
          xPos = x + (nodePadding * 2);
          yPos = (y + nodePadding) * i + inputOffset;
          this.nodes[i].setPosition(xPos, yPos);


        } else if(this.nodes[i].getType() == nodeType.OUT){
          // Outputs
          xPos = x + width - (nodePadding * 2);
          yPos = (y + nodePadding) * (i - (this.numInputs + this.numHiddenNodes)) + outputOffset;
          this.nodes[i].setPosition(xPos, yPos);


        } else {
          // Hidden Layers


        }
        // End Set coordinate
      }

      ellipse(this.nodes[i].position.x, this.nodes[i].position.y, nodeRadius, nodeRadius);

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
