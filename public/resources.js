(function (w) {
  w.define('resources', {
    // barn
    food: {
      storage: 'barn'
    },
    skin: {
      storage: 'barn'
    },
    leather: {
      storage: 'barn',
      cost: { skin: 1 }
    },
    
    // warehouse
    wood: {
      storage: 'warehouse'
    },
    herb: {
      storage: 'warehouse'
    },
    medicine: {
      storage: 'warehouse',
      cost: { herb: 1 }
    },
    
    // stockpile
    stone: {
      storage: 'stockpile'
    },
    ore: {
      storage: 'stockpile'
    },
    iron: {
      storage: 'stockpile',
      cost: { ore: 1 }
    },
    
    // army
    soldier: {
      storage: 'barracks',
      cost: { villager: 1 }
    },
    
    // population
    villager: {
      storage: 'house',
      cost: { food: 10 }
    },
    
    // lv1 jobs
    farmer: {
      storage: 'house',
      cost: { villager: 1 }
    },
    woodcutter: {
      storage: 'house',
      cost: { villager: 1 }
    },
    miner: {
      storage: 'house',
      cost: { villager: 1 }
    },
    
    // lv2 jobs
    tanner: {
      storage: 'tannery',
      cost: { villager: 1 }
    },
    alchemist: {
      storage: 'apothecary',
      cost: { villager: 1 }
    },
    smith: {
      storage: 'forge',
      cost: { villager: 1 }
    },
    
    // lv1 buildings
    barn: {
      cost: { wood: 5, stone: 3 },
      stores: {
        food: 200,
        skin: 50,
        leather: 10
      }
    },
    warehouse: {
      cost: { wood: 5, stone: 3 },
      stores: {
        wood: 200,
        herb: 50,
        medicine: 10
      }
    },
    stockpile: {
      cost: { wood: 5, stone: 3 },
      stores: {
        stone: 200,
        ore: 50,
        iron: 10
      }
    },
    tent: {
      cost: { wood: 1, skin: 3 },
      stores: { villager: 1 }
    },
    hut: {
      cost: { stone: 1, wood: 3 },
      stores: { villager: 3 }
    },
    house: {
      cost: { iron: 0, stone: 3, wood: 5 },
      stores: { villager: 3 }
    },
    tannery: {
      cost: {},
      stores: { tanner: 3 }
    },
    apothecary: {
      cost: {},
      stores: { alchemist: 3 }
    },
    forge: {
      cost: {},
      stores: { smith: 3 }
    },
    barracks: {
      cost: {},
      stores: { soldier: 5 }
    },
    stable: {
      cost: {},
      stores: { horse: 5 }
    }
  });
} (window));