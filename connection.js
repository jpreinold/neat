
// ----------------------------  Connection ---------------------------- //
// Each Connection consists of an inNode, an outNode, a weight,
// an enable bit, and an innovation number
// @constructor - id: number of inputs the brain will receive
// @constructor - type: can be "input", "output", or "hidden"
// type should incorporate the nodeType enum

class Connection {
  constructor(inNodeId, outNodeId, weight, enabled, innov){
    this.inNodeId = inNodeId;       // the Id of the Node where the Connection begins
    this.outNodeId = outNodeId;     // the Id of the Node where the Connection ends
    this.weight = weight;       // the weight of the connection: 0 <= weight <= 1
    this.enabled = enabled;      // whether or not the connection is enabled
    this.innov = innov;          // the innovation number
  }

  //  ---------------------- Start getters and setters ------------------------ //

  getInNodeId(){
    return this.inNodeId;
  }

  setInNodeId(inNodeId) {
    this.inNodeId = int(inNodeId);
  }

  getOutNodeId(){
    return this.outNodeId;
  }

  setOutNodeId(outNodeId) {
    this.outNodeId = int(outNodeId);
  }

  getWeight(){
    return this.weight;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  isEnabled(){
    return this.enabled;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  getInnovationNumber(){
    return this.innov;
  }

  setInnovationNumber(innov) {
    this.innov = innov;
  }

  //  ---------------------- End getters and setters ------------------------ //

  // Returns String representation of Connection
  toString(){
    let enabled = "+";
    if(!this.enabled){
      enabled = "-";
    }
    let string = "Connection: " + str(this.inNodeId) + " -> " + str(this.outNodeId) + ", ";
    string += str(this.weight) + ", " + enabled + ", " + this.innov;

    return string;

  }
}
