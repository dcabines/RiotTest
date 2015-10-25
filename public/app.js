(function (w, riot) {
  var prices = {
    unemployed: {
      house: 1,
      food: 10
    },
    farmer: {
      unemployed: 1
    },
    woodcutter: {
      unemployed: 1
    },
    house: {
      wood: 5,
      stone: 2
    }
  };

  w.App = {
    prices: prices,
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
        //state = Object.create(state);
        actions[action.name](state, action);
        return state;
      };
    },
    cost: function (action, state) {
      state = state || {};
      var quantity = action.quantity || 1;

      for (var resource in action.cost) {
        var cost = action.cost[resource] * quantity;

        if (state[resource] < cost) {
          return false;
        }
      }

      return true;
    },
    actions: (function () {
      var harvest = {
        farmer: {
          resource: 'food',
          rate: 0.025
        },
        woodcutter: {
          resource: 'wood',
          rate: 0.05
        }
      };

      var actions = {
        'increment': function (resource, quantity) {
          return {
            name: 'increment',
            resource: resource,
            quantity: quantity
          };
        },
        'work': function (worker) {
          var config = harvest[worker];

          return {
            name: 'work',
            worker: worker,
            rate: config.rate,
            resource: config.resource
          };
        },
        'spawn': function (resource, quantity) {
          return {
            name: 'spawn',
            resource: resource,
            quantity: quantity,
            cost: prices[resource]
          };
        }
      };

      return actions;
    } ())
  };
} (window, window.riot));

(function (app, riot) {
  var reducer = app.reducer({
    'increment': function (state, action) {
      var quantity = action.quantity || 1;
      state[action.resource] += quantity;
    },
    'work': function (state, action) {
      var workers = state[action.worker];
      state[action.resource] += workers * action.rate;
    },
    'spawn': function (state, action) {
      var quantity = action.quantity || 1;

      for (var resource in action.cost) {
        var cost = action.cost[resource] * quantity;
        state[resource] -= cost;
      }

      state[action.resource] += quantity;
    }
  });

  var initialState = {
    // resources
    food: 0,
    wood: 0,
    stone: 0,
    
    // population
    unemployed: 0,
    farmer: 0,
    woodcutter: 0,
    
    // buildings
    house: 0
  };

  var workers = ['farmer', 'woodcutter'];
  var store = app.state(reducer, initialState);

  riot.mount('clicker', {
    store: store,
    action: function (resource) {
      for (var key in app.prices) {
        if(key === resource) return app.actions.spawn(resource);
      }
      
      return app.actions.increment(resource);
    }
  });

  setInterval(function () {
    workers.forEach(function (worker) {
      var action = app.actions.work(worker);
      store.dispatch(action);
    });
  }, 250);
} (window.App, window.riot));