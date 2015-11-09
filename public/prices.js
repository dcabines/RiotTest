(function (w) {
  w.define('prices', {
    unemployed: {
      house: 1,
      food: 10
    },
    
    // lv1 jobs
    farmer: {
      unemployed: 1
    },
    woodcutter: {
      unemployed: 1
    },
    miner: {
      unemployed: 1
    },
    
    // lv2 jobs
    tanner: {
      unemployed: 1
    },
    alchemist: {
      unemployed: 1
    },
    smith: {
      unemployed: 1
    },
    
    // lv1 buildings
    house: {
      wood: 5,
      stone: 3
    },
    
    hasPrice: function (name) {
      var prices = w.require('prices');
      var priceList = Object.keys(prices);
      
      return priceList.indexOf(name) !== -1;
    }
  });
} (window));