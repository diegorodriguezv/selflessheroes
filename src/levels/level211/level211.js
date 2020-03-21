import map from './map211.json'
import deMessages from './level211-messages-de.json'
import enMessages from './level211-messages-en.json'
import frMessages from './level211-messages-fr.json'

const worldGenerator = {
  generate(world) {
    let originMarker = world.findConfigObjectByID(479)

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let x = originMarker.x + j
        let y = originMarker.y + i * 2
        let eggConfig = {
          id: world.getAvailableObjectID(),
          x: x,
          y: y,
          value: 0,
        }
        world.createObject('egg', eggConfig)
      }
    }
  }
}


const level = {
  mapConfig: map,
  messages: {
    de: deMessages,
    en: enMessages,
    fr: frMessages
  },

  maxStep: 600,
  speedTarget: 93,
  lengthTarget: 23,

  bossTellsSomething: true,
  bossName: "kronos",

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['floor', 'wall', 'hole'],
    objectTypes: ['egg', 'hero', 'npc', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop', 'write'],
    valueFunctions: ['set', 'calc'],
    variables: 6,
    messages: 8,
    leftComparisonExpressions: ['direction', 'variable'],
    rightComparisonExpressions: ['terrain_type', 'object_type', 'integer'],
    forbiddenExpressions: ['myitem'],
  },

  ruleset: {
    win: ['all_npc_dead'],
    lose: ['all_hero_dead', 'or', 'too_many_steps']
  },

  worldGenerator: worldGenerator
}

export default level