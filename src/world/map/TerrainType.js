export default class TerrainType {
  static keyOf(type) {
    let key = null
    for (let propKey of Object.keys(TerrainType)) {
      if (TerrainType[propKey] === type) {
        key = propKey
        break
      }
    }

    return key
  }
}

TerrainType.floor = Symbol('floorType')
TerrainType.wall = Symbol('wallType')
TerrainType.hole = Symbol('holeType')
TerrainType.infected = Symbol('infectedType')
TerrainType.void = Symbol('voidType')

Object.freeze(TerrainType)