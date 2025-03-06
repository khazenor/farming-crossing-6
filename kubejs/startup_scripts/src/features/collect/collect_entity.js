const CollectEntity = {
  listToSpawnEggs (typeList) {
    return typeList.map(eType => this._spawnEggFromEntityType(eType))
  },
  _spawnEggFromEntityType (entityType) {
    return `${entityType}_spawn_egg`
  }
}