import { createStore } from 'redux';

function update(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return action.state;

    case 'SET_RADIUS':
      var newState = state.slice(0);
      newState[action.index].r = action.value
      return newState;

    case 'SET_POSITION':
      var newState = state.slice(0);
      newState[action.index].x = action.x
      newState[action.index].y = action.y
      return newState;

    case 'CYCLE_COLOR':
      var newState = state.slice(0);
      newState[action.index].c = (state[action.index].c + 1) % 21;
      return newState;

    default:
      return state;
  }
}

let store = createStore(update);

module.exports = store;
