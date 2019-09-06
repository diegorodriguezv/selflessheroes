export default class EggsMatrixGenerator {
  constructor({
    originMarkerID,
    width,
    height,
    strategy
  }) {
    this.originMarkerID = originMarkerID
    this.width = width
    this.height = height
    this.strategy = strategy
  }

  generate(world) {
    this.originMarker = world.findConfigObjectByID(this.originMarkerID)

    if (this.strategy.type === 'random_columns') {
      this.generateRandomColumns(world)
    }
  }

  generateRandomColumns(world) {
    for (let x = this.originMarker.x; x < this.originMarker.x + this.width; x++) {
      let emptySpots = []
      for (let i = 0; i < this.height; i++) {
        emptySpots.push(i)
      }
      let eggs = Math.floor(world.rng() * (this.strategy.maxEggs - this.strategy.minEggs + 1)) + this.strategy.minEggs
      while (emptySpots.length + eggs > this.height) {
        let pick = Math.floor(world.rng() * emptySpots.length)
        let y = this.originMarker.y + emptySpots[pick]

        let eggConfig = {
          id: world.getAvailableObjectID(),
          x: x,
          y: y,
          ...this.strategy.eggConfig,
        }
        world.createObject('egg', eggConfig)
        emptySpots.splice(pick, 1)
      }
    }
  }
}