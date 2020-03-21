import map from './map008.json'
import deMessages from './level008-messages-de.json'
import enMessages from './level008-messages-en.json'
import frMessages from './level008-messages-fr.json'

const level = {
  mapConfig: map,
  messages: {
    de: deMessages,
    en: enMessages,
    fr: frMessages
  },

  startingCode: "a:\nstep(e)\njump a\n",
  maxStep: 200,
  speedTarget: 71,
  lengthTarget: 4,
  deterministic: true,

  compilerConfig: {
    excludePrimary: ['assign', 'clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['bonfire', 'nothing'],
    actionFunctions: ['step_once', 'fireball'],
    leftComparisonExpressions: ['direction'],
    rightComparisonExpressions: ['object_type', 'terrain_type']
  },

  ruleset: {
    win: 'all_bonfires',
    lose: 'default_loss'
  }
}

export default level