import map from './map105.json'
import enMessages from './level105-messages-en.json'
import frMessages from './level105-messages-fr.json'

const winCondition = {
  beforeStart() {
    this.selectedEggs = this.world.eggs.filter(egg => egg.value < 4).map(egg => egg.shallowCopy())
  },

  check() {
    const cauldronIDs = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
    let targetEggs = this.selectedEggs.map(egg => egg.id).sort()
    let cauldronEggs = []

    for (let id of cauldronIDs) {
      let cauldron = this.world.findWorldObjectByID(id)
      cauldronEggs = cauldronEggs.concat(cauldron.items.map(item => item.id))
    }

    if (cauldronEggs.length !== targetEggs.length) {
      return false
    }

    cauldronEggs.sort()
    for (let i = 0; i < cauldronEggs.length; i++) {
      if (cauldronEggs[i] !== targetEggs[i]) {
        return false
      }
    }
    return true
  }
}

const wrongNumberEggLossCondition = {
  check() {
    const cauldronIDs = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
    for (let id of cauldronIDs) {
      let cauldron = this.world.findWorldObjectByID(id)

      for (let item of cauldron.items) {
        if (cauldron && item.value >= 4) {
          return true
        }
      }
    }
    return false
  },

  getReason() {
    return 'loss_reason_one_egg_ge_4'
  }
}

const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 1000,
  speedTarget: 146,
  lengthTarget: 9,

  compilerConfig: {
    excludePrimary: ['assign', 'clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'cauldron', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop'],
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'integer']
  },

  ruleset: {
    win: [winCondition],
    lose: [wrongNumberEggLossCondition, 'or', 'default_loss']
  },

  worldGenerator: [{
    type: 'eggs_matrix',
    config: {
      originMarkerID: 99,
      width: 10,
      height: 8,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,9)',
          showLottery: true
        }
      }
    }
  }]
}

export default level