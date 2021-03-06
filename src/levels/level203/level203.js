import map from './map203.json'
import enMessages from './level203-messages-en.json'
import frMessages from './level203-messages-fr.json'

const winCondition = {
  beforeStart() {
    let eggsOriginMarker = this.world.findConfigObjectByID(99)
    this.targetEggs = this.world.eggs.filter(egg => egg.x === eggsOriginMarker.x).sort((a, b) => a.y - b.y).map(egg => egg.shallowCopy())
    this.startEggs = this.world.eggs.filter(egg => egg.x > eggsOriginMarker.x).map(egg => egg.shallowCopy())
  },

  check() {
    for (let targetEgg of this.targetEggs) {
      let startEggs = this.startEggs.filter(egg => egg.y === targetEgg.y)
      for (let startEgg of startEggs) {
        let actualEgg = this.world.findWorldObjectByID(startEgg.id)
        if (actualEgg.value !== targetEgg.value ||
          !!actualEgg.owner ||
          actualEgg.x !== startEgg.x ||
          actualEgg.y !== startEgg.y) {
          return false
        }
      }
    }
    return true
  }
}

const wrongValueOnEggLossCondition = {
  beforeStart() {
    let eggsOriginMarker = this.world.findConfigObjectByID(99)
    this.targetEggs = this.world.eggs.filter(egg => egg.x === eggsOriginMarker.x).sort((a, b) => a.y - b.y).map(egg => egg.shallowCopy())
    this.startEggs = this.world.eggs.filter(egg => egg.x > eggsOriginMarker.x).map(egg => egg.shallowCopy())
  },

  check() {
    let eggsOriginMarker = this.world.findConfigObjectByID(120)

    return this.world.eggs.some(egg => {
      let startEgg = this.startEggs.find(e => egg.id === e.id)
      return startEgg &&
        egg.x >= eggsOriginMarker.x &&
        egg.value !== 0 &&
        egg.value !== this.targetEggs.find(targetEgg => targetEgg.y === startEgg.y).value
    })
  },

  getReason() {
    return 'loss_reason_wrong_value_on_egg'
  }
}

const displacedTargetEggLossCondition = {
  beforeStart() {
    let eggsOriginMarker = this.world.findConfigObjectByID(99)
    this.targetEggs = this.world.eggs.filter(egg => egg.x === eggsOriginMarker.x).sort((a, b) => a.y - b.y)
  },

  check() {
    return this.targetEggs.some(egg => !!egg.owner)
  },

  getReason() {
    return 'loss_reason_target_egg_displaced'
  }
}

const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 400,
  speedTarget: 50,
  lengthTarget: 7,

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['hero', 'egg', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop', 'write'],
    valueFunctions: ['set'],
    variables: 1,
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'integer', 'myitem']
  },

  ruleset: {
    win: [winCondition],
    lose: [displacedTargetEggLossCondition, 'or', wrongValueOnEggLossCondition, 'or', 'default_loss']
  },

  worldGenerator: [{
    type: 'eggs_matrix',
    config: {
      originMarkerID: 120,
      width: 6,
      height: 5,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 0,
        }
      }
    }
  }, {
    type: 'eggs_matrix',
    config: {
      originMarkerID: 99,
      width: 1,
      height: 5,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,99)',
        }
      }
    }
  }, ]
}

export default level