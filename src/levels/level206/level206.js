import map from './map206.json'

const winCondition = {
  beforeStart() {
    this.markers = this.world.configObjects.filter(o => o.type === 'marker')
  },

  check() {
    return this.world.eggs.every(egg => {
        return !egg.owner && this.markers.find(marker => marker.x === egg.x && marker.y === egg.y)
      }) &&
      this.world.heroes.every(hero => hero.y === 13)
  }
}

const level = {
  mapConfig: map,
  name: {
    en: "Stegano-graphy",
    fr: "Stégano-graphie",
  },
  objective: {
    en: "Move the %%icon icon-egg$%% eggs down of as many squares as their number to discover the hidden image.\nThen bring %%icon icon-hero$%% heroes all the way down.",
    fr: "Déplace les %%icon icon-egg$%% œufs vers le bas d'autant de cases que leur numéro pour découvrir l'image cachée.\nEnsuite fais descendre les %%icon icon-hero$%% héros tout en bas.",
  },

  maxStep: 300,
  speedTarget: 48,
  lengthTarget: 8,

  compilerConfig: {
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['hero', 'egg', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop'],
    valueFunctions: ['set', 'calc'],
    variables: 1,
    leftComparisonExpressions: ['direction', 'myitem', 'variable'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'integer', 'myitem', 'variable']
  },

  ruleset: {
    win: [winCondition],
    lose: 'default_loss'
  },
}

export default level