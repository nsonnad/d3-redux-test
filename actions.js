var store = require('./store');

function setRadius(d, ix) {
  store.dispatch({
    type: 'SET_RADIUS',
    value: +this.value,
    index: ix
  });
}

function setPosition(x, y, ix) {
  store.dispatch({
    type: 'SET_POSITION',
    x: x,
    y: y,
    index: ix
  });
}

function cycleColor(d, ix) {
  store.dispatch({
    type: 'CYCLE_COLOR',
    index: ix
  });
}

module.exports = {
  setRadius: setRadius,
  setPosition: setPosition,
  cycleColor: cycleColor
};
