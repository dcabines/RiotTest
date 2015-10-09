(function (riot) {
  var app = {
    state: function (reducer, state, obj) {
      state = state || {};
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

  var store = app.state(reducer);

  riot.mount('clicker', {
    resource: 'Food',
    timeout: '500',
    store: store
  });
  
} (window.riot));