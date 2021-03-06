import map from './map202.json'
import enMessages from './level202-messages-en.json'
import frMessages from './level202-messages-fr.json'

const winCondition = {
  beforeStart() {
    this.targetEggs = this.world.eggs.filter(egg => egg.x === 3).map(egg => egg.shallowCopy())
    this.duplicateEggs = this.world.eggs.filter(egg => egg.x === 9).map(egg => egg.shallowCopy())
  },

  check() {
    for (let targetEgg of this.targetEggs) {
      let duplicateEgg = this.duplicateEggs.find(egg => egg.y === targetEgg.y)
      let actualEgg = this.world.findWorldObjectByID(duplicateEgg.id)

      if (actualEgg.value !== targetEgg.value ||
        !!actualEgg.owner ||
        actualEgg.x !== duplicateEgg.x ||
        actualEgg.y !== duplicateEgg.y
      ) {
        return false
      }
    }
    return true
  }
}

const wrongValueOnEggLossCondition = {
  beforeStart() {
    this.targetEggs = this.world.eggs.filter(egg => egg.x === 3).map(egg => egg.shallowCopy())
    this.duplicateEggs = this.world.eggs.filter(egg => egg.x === 9).map(egg => egg.shallowCopy())
  },

  check() {
    for (let targetEgg of this.targetEggs) {
      let duplicateEgg = this.duplicateEggs.find(egg => egg.y === targetEgg.y)
      let actualEgg = this.world.findWorldObjectByID(duplicateEgg.id)
      if (actualEgg.value !== 0 &&
        actualEgg.value !== targetEgg.value) {
        return true
      }
    }
    return false
  },

  getReason() {
    return 'loss_reason_wrong_value_on_egg'
  }
}

const displacedTargetEggLossCondition = {
  beforeStart() {
    this.targetEggs = this.world.eggs.filter(egg => egg.x === 3)
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

  startingCode: "$a = set(w)\n",
  maxStep: 100,
  speedTarget: 15,
  lengthTarget: 7,

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'hero', 'nothing'],
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
      originMarkerID: 99,
      width: 1,
      height: 5,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 0,
        }
      }
    }
  }, ]
}

export default level