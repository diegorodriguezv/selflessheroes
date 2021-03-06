import map from './map309.json'
import enMessages from './level309-messages-en.json'
import frMessages from './level309-messages-fr.json'

const winCondition = {
  check() {
    return this.world.heroes.every(hero => hero.x >= 11)
  },
}


const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 600,
  speedTarget: 107,
  lengthTarget: 27,

  bossTellsSomething: true,
  bossName: "gatekeeper",

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['floor', 'wall'],
    objectTypes: ['hero', 'npc', 'switch', 'spikes', 'nothing'],
    actionFunctions: ['step_once', 'tell', 'listen'],
    valueFunctions: ['set', 'calc'],
    variables: 1,
    messages: 8,
    leftComparisonExpressions: ['direction', 'variable'],
    rightComparisonExpressions: ['terrain_type', 'object_type', 'integer'],
    forbiddenExpressions: ['myitem'],
  },

  ruleset: {
    win: [winCondition],
    lose: ['one_hero_dead', 'or', 'default_loss']
  },
}

export default level