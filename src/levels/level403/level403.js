import map from './map403.json'
import deMessages from './level403-messages-de.json'
import enMessages from './level403-messages-en.json'
import frMessages from './level403-messages-fr.json'

const winCondition = {
  check() {
    for (let y = 0; y < this.world.map.height; y++) {
      for (let x = 0; x < this.world.map.width; x++) {
        if (this.world.map.isFloor(x, y)) {
          if (this.world.getCharactersAt(x, y).length === 0) {
            return false
          }
        }
      }
    }
    return true
  }
}

const level = {
  mapConfig: map,
  messages: {
    de: deMessages,
    en: enMessages,
    fr: frMessages
  },

  maxStep: 200,
  speedTarget: 17,
  lengthTarget: 4,
  deterministic: true,

  compilerConfig: {
    excludePrimary: [],
    cloneIsDeadly: true,
    terrainTypes: ['floor', 'wall'],
    objectTypes: ['hero', 'nothing'],
    actionFunctions: [],
    valueFunctions: [],
    variables: 0,
    leftComparisonExpressions: ['direction'],
    rightComparisonExpressions: ['object_type', 'terrain_type']
  },

  ruleset: {
    win: [winCondition],
    lose: ['one_hero_dead', 'or', 'default_loss']
  },
}

export default level