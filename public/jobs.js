(function (w) {
  w.define('jobs', {
    // lv1 jobs
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
    },
    
    // lv2 jobs
    tanner: {
      resource: 'skins',
      product: 'leather',
      rate: 0.02
    },
    alchemist: {
      resource: 'herbs',
      product: 'medicine',
      rate: 0.02
    },
    smith: {
      resource: 'ore',
      product: 'iron',
      rate: 0.02
    }
  });
} (window));