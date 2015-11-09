(function (w) {
  w.define('actions', {
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
        var jobs = w.require('jobs');
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
        var prices = w.require('prices');
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
  });
} (window));