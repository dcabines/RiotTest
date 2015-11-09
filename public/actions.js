(function (w) {
  function defaultJob(resource) {
    return {
      resource: resource,
      worker: 'user',
      rate: 1
    };
  }

  w.define('actions', {
    work: {
      create: function (job) {
        return {
          name: 'work',
          job: job
        };
      },
      handler: function (state, action) {
        var job = w.require('jobs')[action.job] || defaultJob(action.job);
        var resources = w.require('resources');
        var workers = state[job.worker];
        var resource = resources[job.resource];

        if (!resource) {
          console.log('Resource ' + job.resource + ' not found');
          return;
        }

        if (resource.storage) {
          var currentResources = state[job.resource];
          var storage = state[resource.storage];
          var eachStore = resources[resource.storage].stores[job.resource];
          
          // check to see if we can store it
          var maxResources = storage * eachStore;

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
            var resourceCost = costConfig[resource] * workers;
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

        if (job.special) {
          // check chance, roll random
          // add 1 to special resource
        }
        
        // increment the resource
        state[job.resource] += job.rate * workers;
      }
    }
  });
} (window));