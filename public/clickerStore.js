(function (app) {
  var actions = {
    'click': function (state, action) {
      state = Object.assign({}, state);
      state[action.resource] += 1;
      return state;
    }
  };

  app.register('factory.reducer', 'clicker', function (state, action) {
    return actions[action.name](state, action);
  });
} (window.App));

(function (riot, app) {
  app.register('factory.store', 'clicker', function (opts) {
    var state = {
      Food: 0,
      Wood: 0,
      Stone: 0
    };
    
    var res = riot.observable();
    app.state(res, state, opts.reducer);

    return res;
  });
} (window.riot, window.App));