(function (w, riot) {
  w.App = {
    state: function (reducer, initialState, obj) {
      var state = initialState || {};
      obj = riot.observable(obj);

      obj.dispatch = function (action) {
        state = reducer(state, action);
        this.trigger('update', state);
      };

      return obj;
    },
    reducer: function (actions) {
      return function (state, action) {
        return actions[action.name](state, action);
      };
    }
  };
} (window, window.riot));

(function (app, riot) {
  var reducer = app.reducer({
    'resource:increment': function (state, action) {
      state[action.resource] += 1;
      return state;
    },
    'resource:init': function (state, action) {
      state[action.resource] = 0;
      return state;
    }
  });

  riot.mount('clicker', {
    resource: 'food',
    timeout: '500',
    store: app.state(reducer)
  });
} (window.App, window.riot));