const positiveColor = {
  R: 107,
  G: 255,
  B: 105
}

const negativeColor = {
  R: 255,
  G: 105,
  B: 105
}

const notActivatedColor = {
  R: 255,
  G: 255,
  B: 255
}

const activatedColor = {
  R: 115,
  G: 0,
  B: 153
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random boolean value.
 *
 * @return {boolean} a random true/false
 */
function randBool() {
  return Math.random() >= 0.5;
}

function getProbability( probabilityRate ){
  let prob = randInt(0, 100);
  if(prob < probabilityRate){
    return true;
  } else {
    return false;
  }
}

let nodeRadius;
let nodePadding;
let visualizeX;
let visualizeY;
let visualizeWidth;
let visualizeHeight;

let probInherGeneIsDisabled = 75;
let probConnWeightIsMutated = 80;
let probConnWeightMutationIsUP = 90;
let probConnWeightMutationIsRandom = 10;
let probMutationWOCrossover = 25;
let probAddingNewNode = 3;
let probAddingNewConnection = 5;

let interspeciesMatingRate = .001;

let populationSize = 3;
