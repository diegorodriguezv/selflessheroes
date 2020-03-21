import map from './map103.json'
import deMessages from './level103-messages-de.json'
import enMessages from './level103-messages-en.json'
import frMessages from './level103-messages-fr.json'

const level = {
  mapConfig: map,
  messages: {
    de: deMessages,
    en: enMessages,
    fr: frMessages
  },

  maxStep: 100,
  speedTarget: 22,
  lengthTarget: 5,
  deterministic: true,

  compilerConfig: {
    excludePrimary: ['assign', 'clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'nothing'],
    actionFunctions: ['take', 'drop'],
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['terrain_type', 'object_type']
  },

  ruleset: {
    win: [{
      type: 'eggs_in_cauldrons',
      config: {
        eggCauldronMap: [{
          eggs: [26],
          cauldron: 30
        }]
      }
    }],
    lose: 'default_loss'
  }
}

export default level