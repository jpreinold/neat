
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
    this.numInputs = numInputs + 1; // Number of Inputs
    this.numHiddenNodes = 0;        // Number of Hidden Nodes
    this.numHiddenLayers = 0;       // Number of Hidden Layers
    this.numOutputs = numOutputs;   // Number of Outputs
    this.numNodes = 0;              // Number of Nodes in the Brain structure
    this.numConnections = 0;        // Number of Connections in the Brain structure
    this.totalDepth = 2;            // Initial no hidden layers (Only Input and Output layers)
    this.fitness = 0;

    // Set up basic I/O Brain structure
    for(let i = 0; i < numInputs; i++){
      this.nodes.push(this.createNewNode(nodeType.IN, 0));
    }
    this.nodes.push(this.createNewNode(nodeType.IN, 0));  //This is the bias
    this.nodes[this.numInputs - 1].setValue(1);
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

  chooseRandomType(){
    let randType = Math.round(randInt(0, 2));
    switch (randType) {
      case 0:
        return nodeType.IN;
      case 1:
        return nodeType.OUT;
      case 2:
        return nodeType.HID;
    }

  }

  adjustNodesForDepth(depthLevel){
    for(let i = 0; i < this.nodes.length; i++){
      if(this.nodes[i].getDepth() >= depthLevel){
        this.nodes[i].setDepth(this.nodes[i].getDepth() + 1);
        this.nodes[i].setPosition(-1, -1);
      }
    }
    this.totalDepth += 1;
    this.numHiddenLayers += 1;
  }

  getNodesInLayer(layerNumber){
    let nodesInLayer = []
    for(let i = 0; i < this.nodes.length; i++){
      //console.log(this.nodes[i].getDepth());
      if(this.nodes[i].getDepth() == layerNumber){

        nodesInLayer.push(this.nodes[i].getId());
      }
    }
    return nodesInLayer;
  }

  setInnovationNumber(connectionIndex, innovationNumber){
    this.connections[connectionIndex].setInnovationNumber(innovationNumber);
  }

  getConnection(connectionIndex){
    return this.connections[connectionIndex];
  }

  mutateAddNode(){
    let randIndex = randInt(0, this.numConnections - 1);
    //console.log(randIndex);
    while(!this.connections[randIndex].isEnabled()){
      randIndex = randInt(0, this.numConnections - 1);
    }

    let inNodeId = this.connections[randIndex].getInNodeId();
    let outNodeId = this.connections[randIndex].getOutNodeId();
    let connectionWeight = this.connections[randIndex].getWeight();
    let newNodeDepth, inNodeDepth, outNodeDepth;
    let isNewDepth;
    if (this.totalDepth == 2){
      newNodeDepth = 1;
      isNewDepth = true;
    } else {
      inNodeDepth = this.nodes[this.getNodeIndex(inNodeId)].getDepth();
      outNodeDepth = this.nodes[this.getNodeIndex(outNodeId)].getDepth();
      if(outNodeDepth - inNodeDepth == 1){  // 1 Layer length, new depth
        isNewDepth = true;
        newNodeDepth = outNodeDepth;        // inNode -> newNode -> outNode
      } else {
        isNewDepth = false;
        newNodeDepth = randInt(inNodeDepth + 1, outNodeDepth - 1);
      }
    }
    if (isNewDepth){
      this.adjustNodesForDepth(newNodeDepth);
    }

    this.nodes.push(this.createNewNode(nodeType.HID, newNodeDepth));
    let newNodeId = this.nodes[this.nodes.length - 1].getId();
    this.connections[randIndex].setEnabled(false);

    let enabled = true;

    this.connections.push(this.createNewConnection(inNodeId, newNodeId, 1, enabled, -1));
    this.connections.push(this.createNewConnection(newNodeId, outNodeId, connectionWeight, enabled, -1));

    return [this.numConnections - 2 , this.numConnections - 1 ];
  }

  mutateAddConnection(){
    let inNodeIndex, outNodeIndex, inNodeId, outNodeId, weight, enabled;
    let selectNewNodes = true;
    while(selectNewNodes){
      let inNodeType = this.chooseRandomType();
      while(inNodeType == nodeType.OUT || (inNodeType == nodeType.HID && this.totalDepth == 2)){
        inNodeType = this.chooseRandomType();
      }
      let outNodeType = this.chooseRandomType();
      while(outNodeType == nodeType.IN || (outNodeType == nodeType.HID && this.totalDepth == 2)){
        outNodeType = this.chooseRandomType();
      }
      //console.log(inNodeType + ", "  + outNodeType);

      if(inNodeType == nodeType.IN){
        inNodeIndex = randInt(0, this.numInputs - 1);
      } else {
        inNodeIndex = randInt(this.numInputs + this.numOutputs, this.numNodes - 1);
      }
      // console.log(this.numInputs + this.numOutputs);
      // console.log(this.numNodes);
      if(outNodeType == nodeType.OUT){
        outNodeIndex = randInt(this.numInputs, this.numInputs + this.numOutputs - 1);
      } else {
        outNodeIndex = randInt(this.numInputs + this.numOutputs, this.numNodes - 1);
      }

      if(this.nodes[inNodeIndex].getId() == this.nodes[outNodeIndex].getId()){
        continue;
      }

      if(this.nodes[outNodeIndex].getDepth() == this.nodes[inNodeIndex].getDepth()){
        continue;
      }

      //console.log(randInt(0,1));

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
    //enabled = randBool();
    enabled = true;

    this.connections.push(this.createNewConnection(inNodeId, outNodeId, weight, enabled, -1));
    return this.numConnections - 1;



  }

  mutateConnection(connectionIndex){
    let weight = this.connections[connectionIndex].getWeight();
    let uniformPerturbed = getProbability(90);
    if( uniformPerturbed ){

    }
    this.connections[connectionIndex].setWeight();
  }

  getInNodes(nodeId){
    let inNodes = [];
    for(let i = 0; i < this.connections.length; i++){
      let conn = this.connections[i];
      if(conn.getOutNodeId() == nodeId){
        inNodes.push([conn.getInNodeId(), conn.getWeight()]);
      }
    }
    return inNodes;
  }

  sigmoid(value){
    return 1 / (1 + Math.exp( -4.9 * value ));
  }

  activate(value){
    return this.sigmoid(value);
  }

  feedForward(inputs){
    for(let i = 0; i < inputs.length; i++){
      this.nodes[i].setValue(inputs[i]);
      this.nodes[i].setIsValueSet(true);
    }
    for(let i = 1; i < this.numHiddenLayers + 2; i++){
      let layerNodes = this.getNodesInLayer(i);
      for(let j = 0; j < layerNodes.length; j++){
        let nodeId = layerNodes[j];
        let inNodes = this.getInNodes(nodeId);
        let output = 0;
        for(let j = 0; j < inNodes.length; j++){
          let inNodeId = inNodes[j][0];
          let weight = inNodes[j][1];
          let inNode = this.nodes[this.getNodeIndex(inNodeId)];
          output += inNode.getValue() * weight;
        }
        if(inNodes.length != 0){
          output = this.activate(output);
        }

        this.nodes[this.getNodeIndex(nodeId)].setValue(output);
        this.nodes[this.getNodeIndex(nodeId)].setIsValueSet(true);
      }
    }
  }

  think(inputs){
    this.feedForward(inputs);
    let outputs = [];
    for(let i = this.numInputs; i < this.numInputs + this.numOutputs; i++){
      outputs.push(this.nodes[i].getValue());
    }

    return outputs;
  }

  setFitness(fitnes){
    this.fitness = fitness;
  }

  setColorAndWeight(value, weight, isNodeColor){
    strokeWeight(Math.round(weight));
    if(value != -1){
      let r, g, b;
      value = int(value * 100);
      if(isNodeColor){
        r = map(value, 0, 100, notActivatedColor.R, activatedColor.R);
        g = map(value, 0, 100, notActivatedColor.G, activatedColor.G);
        b = map(value, 0, 100, notActivatedColor.B, activatedColor.B);
      } else {
        r = map(value, 0, 100, negativeColor.R, positiveColor.R);
        g = map(value, 0, 100, negativeColor.G, positiveColor.G);
        b = map(value, 0, 100, negativeColor.B, positiveColor.B);
      }
      stroke(r, g, b);
      fill(r, g, b);
    } else {
      stroke(255);
      fill(255);
    }
  }

  setInputOutputCoordinates(visualizeX, visualizeY, visualizeWidth, visualizeHeight){
    let inputLayerHeight = this.numInputs * (nodePadding) - nodePadding;
    let outputLayerHeight = this.numOutputs * (nodePadding) - nodePadding;

    let inputOffset = (visualizeHeight - inputLayerHeight) / 2;
    let outputOffset = (visualizeHeight - outputLayerHeight) / 2;

    let xPos, yPos;

    for(let i = 0; i < this.nodes.length; i++){
      if(this.nodes[i].position.x == -1 && this.nodes[i].position.y == -1){
        // Set coordinate
        if(this.nodes[i].getType() == nodeType.IN){
          // Inputs
          xPos = visualizeX + (nodePadding * 2);
          yPos = (visualizeY + nodePadding) * i + inputOffset;
          if(i == this.numInputs - 1){
            yPos += 30;
          }
          this.nodes[i].setPosition(xPos, yPos);


        } else if(this.nodes[i].getType() == nodeType.OUT){
          // Outputs
          xPos = visualizeX + visualizeWidth - (nodePadding * 2);
          yPos = (visualizeY + nodePadding) * (i - (this.numInputs + this.numHiddenNodes)) + outputOffset;
          this.nodes[i].setPosition(xPos, yPos);


        }
      }
    }
  }

  setHiddenLayerCoordinates(visualizeX, visualizeY, visualizeWidth, visualizeHeight){
    let inputX = visualizeX + (nodePadding * 2);
    let outputX = visualizeX + visualizeWidth - (nodePadding * 2);
    let spread = (outputX - inputX) / (this.numHiddenLayers + 1);
    let xPos, yPos;
    for(let i = 1; i < this.totalDepth - 1; i++){
      let nodesInLayer = this.getNodesInLayer(i);
      let layerHeight = nodesInLayer.length * nodePadding - nodePadding;
      let offset = ((visualizeHeight - layerHeight) / 2);
      for(let j = 0; j < nodesInLayer.length; j++){
        let node = this.nodes[this.getNodeIndex(nodesInLayer[j])];
        xPos = inputX + (i * spread);
        yPos = ((visualizeY + nodePadding * 2) * j) + offset;
        this.nodes[this.getNodeIndex(nodesInLayer[j])].setPosition(xPos, yPos);

      }


    }
    // for(let i = 0; i < this.nodes; i++){
    //   if(this.nodes[i].getType() == nodeType.HID){
    //
    //   }
    // }
  }

  // Displays brain structure within boundaries given
  visualize(x, y, width, height){
    let isNodeColor = true;
    this.setInputOutputCoordinates(x, y, width, height);
    if(this.numHiddenLayers > 0){
      this.setHiddenLayerCoordinates(x, y, width, height);
    }
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
        this.setColorAndWeight(connectionWeight, thickness, !isNodeColor);
        //console.log(inNodeX + ", " + inNodeY + ", " + outNodeX + ", " + outNodeX + ", " + thickness + ", " + connectionWeight);
        line(inNodeX, inNodeY, outNodeX, outNodeY);
      }
      pop();

    }

    for(let i = 0; i < this.nodes.length; i++){

      push();
      // Set color for Node
      if(this.nodes[i].getIsValueSet()){
        this.setColorAndWeight(this.nodes[i].getValue(), 2, isNodeColor);
      } else {
        this.setColorAndWeight(-1, 2, isNodeColor);
      }
      // End Set color for Node

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
