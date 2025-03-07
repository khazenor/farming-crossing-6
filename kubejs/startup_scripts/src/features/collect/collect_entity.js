const CollectEntity = {
  listToSpawnEggs (typeList) {
    return typeList.map(eType => this.spawnEggFromEntityType(eType))
  },
  spawnEggFromEntityType (entityType) {
    return `${entityType}_spawn_egg`
  },
  isEntityCollection (collectionId) {
    return `${collectionId}` === 'entities'
  }
}