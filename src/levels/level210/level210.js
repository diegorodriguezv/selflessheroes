import map from './map210.json'
import enMessages from './level210-messages-en.json'
import frMessages from './level210-messages-fr.json'

const winCondition = {
  beforeStart() {
    this.realAvg = Math.floor(this.world.eggs.reduce((acc, egg) => acc + egg.value, 0) / this.world.eggs.length)

    let eggsOriginMarker = this.world.findConfigObjectByID(120)
    let avgs = []

    for (let i = 0; i < 10; i++) {
      let eggLine = this.world.eggs.filter(egg => egg.x === eggsOriginMarker.x + i)
      avgs.push(Math.floor(eggLine.reduce((acc, egg) => acc + egg.value, 0) / eggLine.length))
    }
    this.linesAvg = Math.floor(avgs.reduce((acc, avg) => acc + avg, 0) / 10)
  },

  check() {
    // It accepts the real average and the average of average of lines
    // These two values can differ a bit due to integer division
    return this.world.eggs.every(egg => egg.value === this.realAvg) ||
      this.world.eggs.every(egg => egg.value === this.linesAvg)
  }
}

const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 800,
  speedTarget: 177,
  lengthTarget: 27,

  compilerConfig: {
    excludePrimary: ['clone'],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'hero', 'nothing'],
    actionFunctions: ['step_once', 'take', 'drop', 'write'],
    valueFunctions: ['set', 'calc'],
    variables: 2,
    leftComparisonExpressions: ['direction', 'variable', 'myitem'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'variable', 'integer', 'myitem']
  },

  ruleset: {
    win: [winCondition],
    lose: 'default_loss'
  },

  worldGenerator: [{
    type: 'eggs_matrix',
    config: {
      originMarkerID: 120,
      width: 10,
      height: 10,

      strategy: {
        type: 'simple',
        eggConfig: {
          value: 'rng(0,99)',
        }
      }
    }
  }, ]
}

export default level