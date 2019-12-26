class Population {
  constructor(numInputs, numOutputs){
    this.brains = [];
    this.innovations = [];
    for(let i = 0; i < populationSize; i++){
      this.brains.push(new Brain(numInputs, numOutputs));
      let numInitConnections = randInt(1, 3);
      let numInitHiddenNodes = randInt(0, 1);
      for(let j = 0; j < numInitConnections; j++){
        this.brains[i].mutateAddConnection();
        let innovationNumber = this.getInnovationNumber(this.brains[i].getConnection(j));
        this.brains[i].setInnovationNumber(j, innovationNumber);
      }
      for(let j = 0; j < numInitHiddenNodes; j++){
        let indices = this.brains[i].mutateAddNode();
        let firstConnInnovationNumber = this.getInnovationNumber(this.brains[i].getConnection(indices[0]));
        let secondConnInnovationNumber = this.getInnovationNumber(this.brains[i].getConnection(indices[1]));
        this.brains[i].setInnovationNumber(indices[0], firstConnInnovationNumber);
        this.brains[i].setInnovationNumber(indices[1], secondConnInnovationNumber);
      }
    }
    // for(let i = 0; i < this.innovations.length; i++){
    //   console.log(this.innovations[i].toString());
    // }
    // for(let i = 0; i < this.brains.length; i++){
    //   console.log(this.brains[i].toString());
    // }
  }

  getInnovationNumber(connection){
    let isNew = true;
    let innovationNumber = this.innovations.length + 1;
    for(let i = 0; i < this.innovations.length; i++){
      if(this.innovations[i].getInNodeId() == connection.getInNodeId()
        && this.innovations[i].getOutNodeId() == connection.getOutNodeId() ){
          innovationNumber = i + 1;
          isNew = false;
        }
    }
    if(isNew){
      this.innovations.push(connection);
    }
    return innovationNumber;
  }

  visualize(){
    for(let i = 0; i < this.brains.length; i++){
      let x, y, width, height;
      x = i * (windowWidth / this.brains.length);
      y = 0;
      width = windowWidth / this.brains.length;
      height = windowHeight / this.brains.length;
    	nodeRadius = width / 20;
    	nodePadding = width / 15;
      this.brains[i].visualize(x, y, width, height);
    }
  }

}
