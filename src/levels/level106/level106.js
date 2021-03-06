import map from './map106.json'
import enMessages from './level106-messages-en.json'
import frMessages from './level106-messages-fr.json'

const winCondition = {
  beforeStart() {
    this.maxEggValue = this.world.eggs.reduce((accumulator, egg) => Math.max(egg.value, accumulator), 0)
  },

  check() {
    const cauldronID = 30
    let cauldron = this.world.findWorldObjectByID(cauldronID)
    return cauldron.items.length === 1 && cauldron.items[0].value === this.maxEggValue
  }
}

const notMaximumEggLossCondition = {
  beforeStart() {
    this.maxEggValue = this.world.eggs.reduce((accumulator, egg) => Math.max(egg.value, accumulator), 0)
  },

  check() {
    const cauldronID = 30
    let cauldron = this.world.findWorldObjectByID(cauldronID)
    return cauldron.items.length > 0 && cauldron.items[0].value < this.maxEggValue
  },

  getReason() {
    return 'loss_reason_not_maximum_egg_in_cauldron'
  }
}

const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 150,
  speedTarget: 23,
  lengthTarget: 6,

  compilerConfig: {
    excludePrimary: ['assign', 'clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'cauldron', 'nothing'],
    actionFunctions: ['take', 'drop'],
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['direction', 'object_type', 'terrain_type', 'myitem']
  },

  ruleset: {
    win: [winCondition],
    lose: [notMaximumEggLossCondition, 'or', 'default_loss']
  }
}

export default level