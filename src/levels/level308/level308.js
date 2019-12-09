import map from './map308.json'

const winCondition = {
  check() {
    return this.world.heroes.some(hero => hero.x === 10)
  },
}

const worldGenerator = {
  generate(world) {
    let switches = world.switches.slice()
      .sort((a, b) => a.y - b.y)
      .map(s => s.id)
    const xOrigin = 2
    const yOrigin = 2
    const width = 4
    const height = 11

    for (let i = 0; i < width; i++) {
      let code = []
      for (let j = 0; j < height - 1; j++) {
        let id = world.getAvailableObjectID()
        let value = world.rng() > 0.5 ? 1 : 0
        code.push(value)

        let eggConfig = {
          id: id,
          x: xOrigin + 2 * i,
          y: yOrigin + j,
          value: value,
          // lottery: "rng(0,1)",
          // showLottery: true,
        }
        world.createObject('egg', eggConfig)
      }

      let triggers = switches.filter((switchID, index) => code[index] === 1).join(',')
      let triggersNot = switches.filter((switchID, index) => code[index] === 0).join(',')

      for (let j = 0; j < height; j++) {
        let spikesConfig = {
          id: world.getAvailableObjectID(),
          x: xOrigin + 2 * i + 1,
          y: yOrigin + j,
          triggers: triggers,
          triggersNot: triggersNot,
          enabled: true,
        }
        world.createObject('spikes', spikesConfig)
      }
    }
  }
}

const level = {
  mapConfig: map,
  name: {
    en: "Cryptex",
    fr: "Cryptex",
  },
  objective: {
    en: "Move the hero from the left, all the way to the right.\n\n%%icon mdi mdi-information-outline$%% In order to lower the %%icon icon-spikes$%% spikes, you must enable the right %%icon icon-switch$%% switches.\nThe combination is written on the %%icon icon-egg$%% eggs:\n1 = enable the switch\n0 = disable the switch",
    fr: "Déplace le héro de gauche jusqu'au bord droit.\n\n%%icon mdi mdi-information-outline$%% Pour baisser les %%icon icon-spikes$%% piques, il faut activer les bons %%icon icon-switch$%% boutons.\nLa combinaison est inscrite sur les %%icon icon-egg$%% œufs\u00A0:\n1 = activer le bouton\n0 = désactiver le bouton",
  },

  maxStep: 1600,
  speedTarget: 445,
  lengthTarget: 36,

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['floor', 'wall'],
    objectTypes: ['egg', 'hero', 'switch', 'spikes', 'nothing'],
    actionFunctions: ['step_once', 'tell', 'listen'],
    valueFunctions: ['set', 'calc'],
    variables: 3,
    messages: 8,
    leftComparisonExpressions: ['direction', 'variable'],
    rightComparisonExpressions: ['terrain_type', 'object_type', 'integer'],
    forbiddenExpressions: ['myitem'],
  },

  ruleset: {
    win: [winCondition],
    lose: ['one_hero_dead', 'or', 'default_loss']
  },

  worldGenerator: worldGenerator
}

export default level