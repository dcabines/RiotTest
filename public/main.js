(function (w, riot) {
  var jobs = w.require('jobs');
  var actions = w.require('actions');
  var initialState = w.require('initialState');
  var utils = w.require('utils');
  
  var reducer = utils.reducer(actions);
  var store = utils.state(reducer, initialState);
  
  var jobList = Object.keys(jobs);

  riot.mount('clicker', {
    store: store,
    action: utils.getAction,
    cost: utils.priceCheck
  });

  setInterval(function () {
    jobList.forEach(function (worker) {
      var action = actions.work.create(worker);
      store.dispatch(action);
    });
  }, 250);
} (window, window.riot));