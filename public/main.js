(function (w, riot) {
  var utils = w.require('utils');
  var actions = w.require('actions');
  var resources = w.require('resources');
  var initialState = w.require('initialState');

  var reducer = utils.reducer(actions);
  var store = utils.state(reducer, initialState);

  riot.mount('clicker', {
    store: store,
    action: utils.getAction,
    cost: utils.priceCheck
  });

  setInterval(function () {
    for (var resource in resources) {
      var current = resources[resource];
      var action = actions.work.create(current.resource);

      if (current.resource) {
        store.dispatch(action);
      }
    }
  }, 250);
} (window, window.riot));