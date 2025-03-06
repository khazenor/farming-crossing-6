const CollectLogger = {
  playerCollection (event) {
    return PlayerDataHelper.getPlayerList(
      event,
      CollectConst.playerCollectedDataKey
    )
  },
  logCollectible (event, collectibleId) {
    PlayerDataHelper.addToPlayerList(
      event,
      CollectConst.playerCollectedDataKey,
      collectibleId
    )
  },
  playerCollectionByCategory (event, categoryId) {
    let collectedObjsInCategory = []
    let collectedObjs = PlayerDataHelper.getPlayerList(
      event,
      categoryId
    )
    for (let collectedObj of collectedObjs) {
      if (CollectCaches.categoryLists[categoryId].includes(collectedObj)) {
        collectedObjsInCategory.push(collectedObj)
      }
    }
    return collectedObjsInCategory
  },
  logCollectibleByCategory (event, collectibleId, categoryId) {
    PlayerDataHelper.addToPlayerList(
      event,
      categoryId,
      collectibleId
    )
  },
  clearCollectibles (event) {
    for (let categoryId of CollectListHelper.allCategoryIds) {
      PlayerDataHelper.clearKey(
        event,
        categoryId
      )
    }
    PlayerDataHelper.clearKey(
      event,
      CollectConst.playerCollectedDataKey
    )
  }
}