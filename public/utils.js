// (function(w){}(window));

(function (w) {
  var cache = {};

  w.define = function (name, obj) {
    cache[name] = obj;
    return obj;
  };

  w.require = function (name) {
    return cache[name];
  };
} (window));

(function (w, riot) {
  w.define('utils', {
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
        actions[action.name].handler(state, action);
        return state;
      };
    },

    getAction: function (resource) {
      var name = 'user';
      var actions = w.require('actions');
      var action = actions[name].create(resource); // more actions later

      return action;
    },

    priceCheck: function (action, state) {
      state = state || {};
      
      var resources = w.require('resources');
      var quantity = action.quantity || 1;
      var config = resources[action.resource]

      for (var resource in config.cost) {
        var cost = config.cost[resource] * quantity;

        if (state[resource] < cost) {
          return false;
        }
      }

      return true;
    }
  });
} (window, window.riot));