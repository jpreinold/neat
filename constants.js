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
