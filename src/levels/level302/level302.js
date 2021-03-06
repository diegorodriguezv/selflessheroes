import map from './map302.json'
import enMessages from './level302-messages-en.json'
import frMessages from './level302-messages-fr.json'

const winCondition = {
  beforeStart() {
    this.heroes = this.world.heroes.slice().map(hero => hero.shallowCopy())
  },

  check() {
    const startY = this.heroes[0].y
    return this.world.heroes.every(hero => {
      let startHero = this.heroes.find(h => h.id === hero.id)
      return hero.y === startY + 2 && hero.x === startHero.x
    })
  },
}


const movedOfTheCrossLossCondition = {
  beforeStart() {
    this.heroes = this.world.heroes.slice().sort((a, b) => a.x - b.x).map(hero => hero.shallowCopy())
    this.isOnCrossMap = this.heroes.map(h => false)
    this.newIsOnCrossMap = this.isOnCrossMap.slice()
  },

  step() {
    this.isOnCrossMap = this.newIsOnCrossMap.slice()
    for (let i = 0; i < this.heroes.length; i++) {
      let startHero = this.heroes[i]
      let hero = this.world.findWorldObjectByID(this.heroes[i].id)
      this.newIsOnCrossMap[i] = hero.x === startHero.x && hero.y === startHero.y + 2
    }
  },

  check() {
    for (let i = 0; i < this.isOnCrossMap.length; i++) {
      if (!this.newIsOnCrossMap[i] && this.isOnCrossMap[i]) {
        return true
      }
    }
    return false
  },

  getReason() {
    return 'loss_reason_moved_of_the_cross'
  }
}


const wrongOrderLossCondition = {
  beforeStart() {
    this.heroes = this.world.heroes.slice().sort((a, b) => a.x - b.x).map(hero => hero.shallowCopy())
    this.isOnCrossMap = this.heroes.map(h => false)
    this.newIsOnCrossMap = this.isOnCrossMap.slice()
  },

  step() {
    this.isOnCrossMap = this.newIsOnCrossMap.slice()
    for (let i = 0; i < this.heroes.length; i++) {
      let startHero = this.heroes[i]
      let hero = this.world.findWorldObjectByID(this.heroes[i].id)
      this.newIsOnCrossMap[i] = hero.x === startHero.x && hero.y === startHero.y + 2
    }
  },

  check() {
    let lastHeroOnCross = -1
    let foundNewHeroOnCross = false

    for (let i = 0; i < this.isOnCrossMap.length; i++) {
      if (this.newIsOnCrossMap[i] && !this.isOnCrossMap[i]) {
        if (lastHeroOnCross < i - 1 || foundNewHeroOnCross) {
          return true
        }
        foundNewHeroOnCross = true
      }
      if (this.newIsOnCrossMap[i]) {
        lastHeroOnCross = i
      }
    }
    return false
  },

  getReason() {
    return 'loss_reason_wrong_order'
  }
}

const level = {
  mapConfig: map,
  messages: {
    en: enMessages,
    fr: frMessages
  },

  maxStep: 40,
  speedTarget: 11,
  lengthTarget: 5,
  deterministic: true,

  compilerConfig: {
    excludePrimary: ['clone', 'jump', 'anchor'],
    terrainTypes: ['floor', 'wall'],
    objectTypes: [],
    actionFunctions: ['step_once', 'tell', 'listen'],
    valueFunctions: [],
    variables: 0,
    messages: 8,
    leftComparisonExpressions: ['direction'],
    rightComparisonExpressions: ['terrain_type'],
    forbiddenExpressions: ['everyone']
  },

  ruleset: {
    win: winCondition,
    lose: [movedOfTheCrossLossCondition, 'or', wrongOrderLossCondition, 'or', 'default_loss']
  },
}

export default level