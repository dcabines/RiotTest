(function (w) {
  w.define('jobs', {
    // user job
    food: {
      worker: 'user',
      resource: 'food',
      special: 'skin',
      rate: 1,
      chance: 0.25
    },
    wood: {
      worker: 'user',
      resource: 'wood',
      special: 'herb',
      rate: 1,
      chance: 0.25
    },
    stone: {
      worker: 'user',
      resource: 'stone',
      special: 'ore',
      rate: 1,
      chance: 0.25
    },
    
    // lv1 jobs
    farmer: {
      worker: 'farmer',
      resource: 'food',
      special: 'skin',
      rate: 0.05,
      chance: 0.1
    },
    woodcutter: {
      worker: 'woodcutter',
      resource: 'wood',
      special: 'herb',
      rate: 0.025,
      chance: 0.1
    },
    miner: {
      worker: 'miner',
      resource: 'stone',
      special: 'ore',
      rate: 0.02,
      chance: 0.1
    },
    
    // lv2 jobs
    tanner: {
      worker: 'tanner',
      resource: 'leather',
      rate: 1
    },
    alchemist: {
      worker: 'alchemist',
      resource: 'medicine',
      rate: 1
    },
    smith: {
      worker: 'smith',
      resource: 'iron',
      rate: 1
    }
  });
} (window));