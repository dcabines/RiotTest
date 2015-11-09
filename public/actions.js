(function (w) {
  w.define('actions', {
    user: {
      create: function (resource) {
        return {
          name: 'user',
          resource: resource
        };
      },
      handler: function (state, action) {
        var resources = w.require('resources');
        var resource = resources[action.resource];

        if (!resource) {
          console.log('Resource ' + action.resource + ' not found');
          return;
        }

        if (resource.storage) {
          var storage = resources[resource.storage];

          if (!storage) {
            console.log('Storage ' + resource.storage + ' not found');
            return;
          }

          var currentResources = state[action.resource];
          var count = state[resource.storage];
          var capacity = storage.stores[action.resource];
          var maxResources = count * capacity;

          if (currentResources >= maxResources) {
            // send message about not enough storage
            return;
          }
        }

        if (resource.cost) {
          // check to see if we can afford it
          var costcache = {};
          var costConfig = resource.cost;

          for (var resource in costConfig) {
            var resourceCost = costConfig[resource];
            var availableResources = state[resource];

            if (resourceCost > availableResources) {
              // send message about not enough resources
              return;
            }

            costcache[resource] = resourceCost;
          }
          
          // pay the price
          for (var resource in costcache) {
            state[resource] -= costcache[resource];
          }
        }
        
        // increment the resource
        state[action.resource] += 1;
      }
    },
    work: {
      create: function (resource) {
        return {
          name: 'work',
          resource: resource
        };
      },
      handler: function (state, action) {
        var resources = w.require('resources');
        var resource = resources[action.resource];

        if (!resource) {
          console.log('Resource ' + action.resource + ' not found');
          return;
        }

        if (resource.storage) {
          var storage = resources[resource.storage];

          if (!storage) {
            console.log('Storage ' + resource.storage + ' not found');
            return;
          }

          var currentResources = state[action.resource];
          var count = state[resource.storage];
          var capacity = storage.stores[action.resource];
          var maxResources = count * capacity;

          if (currentResources >= maxResources) {
            // send message about not enough storage
            return;
          }
        }

        if (resource.cost) {
          // check to see if we can afford it
          var costcache = {};
          var costConfig = resource.cost;

          for (var resource in costConfig) {
            var resourceCost = costConfig[resource];
            var availableResources = state[resource];

            if (resourceCost > availableResources) {
              // send message about not enough resources
              return;
            }

            costcache[resource] = resourceCost;
          }
          
          // pay the price
          for (var resource in costcache) {
            state[resource] -= costcache[resource];
          }
        }

        if (resource.worker) {
          var worker = resources[resource.worker];
          var numWorkers = state[resource.worker];

          if (!worker) {
            console.log('Worker ' + resource.worker + ' not found');
            return;
          }

          state[action.resource] += numWorkers * worker.rate;
        }
      }
    }
  });
} (window));