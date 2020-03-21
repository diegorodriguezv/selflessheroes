import map from './map014.json'
import deMessages from './level014-messages-de.json'
import enMessages from './level014-messages-en.json'
import frMessages from './level014-messages-fr.json'

const level = {
  mapConfig: map,
  messages: {
    de: deMessages,
    en: enMessages,
    fr: frMessages
  },

  maxStep: 2000,
  speedTarget: 203,
  lengthTarget: 13,
  deterministic: true,

  compilerConfig: {
    excludePrimary: ['assign', 'clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['switch', 'nothing'],
    actionFunctions: ['step_once'],
    leftComparisonExpressions: ['direction'],
    rightComparisonExpressions: ['object_type', 'terrain_type']
  },

  ruleset: {
    win: 'all_switches',
    lose: 'default_loss'
  }
}

export default level