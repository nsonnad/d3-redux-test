var d3 = require('d3');
var store = require('./store');
var actions = require('./actions');

var body = d3.select('body');
var pre = body.append('pre').classed('state-pre', true);
var div = body.append('div');
var dimensions = { width: 640, height: 340 }
var colors = d3.scale.category20();

var svg = body.append('svg').attr(dimensions);

var drag = d3.behavior.drag()
  .on('drag', function(d, i) {
    let newX = d.x + d3.event.dx;
    let newY = d.y + d3.event.dy;
    actions.setPosition(newX, newY, i);
  });

function circles(state) {
  let circGroup = svg.selectAll('circle').data(state);

  circGroup.enter().append('circle')
    .on('click', actions.cycleColor)
    .call(drag);

  circGroup.exit().remove();

  circGroup.attr({
    fill: (d) => colors(d.c),
    cx: (d) => d.x,
    cy: (d) => d.y,
    r: (d) => d.r
  });

}

function inputs(state) {
  var inputGroup = div.selectAll('div.input').data(state);
  var inputEnter = inputGroup.enter().append('div').attr('class', 'input');
  inputGroup.exit().remove();

  inputEnter.append('h4');
  inputEnter.append('input').attr({
    type: 'range',
    min: 1,
    max: 50,
  })

  inputGroup.select('h4').text((d) => d.r.toString())
  inputGroup.select('input').attr({
    value: (d) => d.r
  })
  .on('input', actions.setRadius);
}

function showState(state) {
  pre.text(JSON.stringify(state, null, 2));
}

function randCircle(ix) {
  return {
    id: ix,
    x: Math.floor(Math.random() * dimensions.width),
    y: Math.floor(Math.random() * dimensions.height),
    r: Math.floor(Math.random() * 20),
    c: Math.floor(Math.random() * 21)
  };
}

store.subscribe(() => {
  let newState = store.getState();
  circles(newState);
  inputs(newState);
  showState(newState);
});

const initialState = [1,2,3,4,5].map(randCircle);

store.dispatch({ type: 'INITIALIZE', state: initialState });
