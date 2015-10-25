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
    miner: {
      unemployed: 1
    },
    house: {
      wood: 5,
      stone: 3
    }
  };
  
  var jobs = {
    farmer: {
      resource: 'food',
      rate: 0.05
    },
    woodcutter: {
      resource: 'wood',
      rate: 0.025
    },
    miner: {
      resource: 'stone',
      rate: 0.02
    }
  };
  
  var actions = {
    increment: {
      create: function (resource, quantity) {
        return {
          name: 'increment',
          resource: resource,
          quantity: quantity
        };
      },
      handler: function (state, action) {
        var quantity = action.quantity || 1;
        state[action.resource] += quantity;
      }
    },
    work: {
      create: function (worker) {
        var job = jobs[worker];
  
        return {
          name: 'work',
          worker: worker,
          rate: job.rate,
          resource: job.resource
        };
      },
      handler: function (state, action) {
        var workers = state[action.worker];
        state[action.resource] += workers * action.rate;
      }
    },
    spawn: {
      create: function (resource, quantity) {
        return {
          name: 'spawn',
          resource: resource,
          quantity: quantity || 1,
          cost: prices[resource]
        };
      },
      handler: function (state, action) {
        var quantity = action.quantity;
  
        for (var resource in action.cost) {
          var cost = action.cost[resource] * quantity;
          state[resource] -= cost;
        }
  
        state[action.resource] += quantity;
      }
    }
  };

  w.App = {
    prices: prices,
    jobs: jobs,
    actions: actions,
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
    }
  };
} (window, window.riot));

(function (app, riot) {
  var initialState = {
    // resources
    food: 0,
    wood: 0,
    stone: 0,
    
    // population
    unemployed: 0,
    farmer: 0,
    woodcutter: 0,
    miner: 0,
    
    // buildings
    house: 0
  };

  var reducer = app.reducer(app.actions);
  var store = app.state(reducer, initialState);

  riot.mount('clicker', {
    store: store,
    action: function (resource) {
      var prices = Object.keys(app.prices);
      var hasPrice = prices.indexOf(resource) !== -1;
      var name = hasPrice ? 'spawn' : 'increment';
      var action = app.actions[name].create(resource);
      
      return action;
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
    }
  });

  setInterval(function () {
    var jobs = Object.keys(app.jobs);
    
    jobs.forEach(function (worker) {
      var action = app.actions.work.create(worker);
      store.dispatch(action);
    });
  }, 250);
} (window.App, window.riot));