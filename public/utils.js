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
      var prices = w.require('prices');
      var actions = w.require('actions');
      var hasPrice = prices.hasPrice(resource);
      var name = hasPrice ? 'spawn' : 'increment';
      var action = actions[name].create(resource);

      return action;
    },
    
    priceCheck: function (action, state) {
      state = state || {};
      var quantity = action.quantity || 1;

      for (var resource in action.cost) {
        var cost = action.cost[resource] * quantity;

        if (state[resource] < cost) {
          return false;
        }
      }

      return true;
    }
  });
} (window, window.riot));