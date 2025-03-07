const CollectMethods = {
  checkAndLogCollectible: (event, collectibleId) => {
    if (CollectHelper.isIdNewCollectible(event, collectibleId)) {
      let collectionId = CollectListHelper.collectionIdOfCollectible(collectibleId)
      let subCollectionId = CollectListHelper.subCollectionIdOfCollectible(collectibleId)
      CollectLogger.logCollectibleByCategory(event, collectibleId, collectionId)
      CollectLogger.logCollectibleByCategory(event, collectibleId, subCollectionId)
      CollectLogger.logCollectible(event, collectibleId)

      EventHelpers.tellPlayer(event, '')
      
      let collectionCompleted = CollectHelper.categoryCompleted(event, collectionId)
      let milestoneReached = CollectHelper.milestoneReached(event, collectionId)
      let isNextMilestoneCollectionCompletion = CollectHelper.isNextMilestoneCollectionCompletion(
        event,
        collectionId
      )
      let subCatCompleted = CollectHelper.categoryCompleted(event, subCollectionId)
      if (collectionCompleted) {
        CollectHelper.handleCollectionCompleted(event, collectionId)
      } else if (milestoneReached) {
        CollectHelper.handleMilestoneReached(event, collectionId)
      }

      if (subCatCompleted) {
        CollectHelper.handleSubCollectionCompleted(event, subCollectionId)
      }

      if (!collectionCompleted && !milestoneReached && !subCatCompleted) {
        EventHelpers.tellPlayer(event, CollectTransHelper.collectedMessage(collectionId))
      }
      
      if (!collectionCompleted && !milestoneReached) {
        if (!isNextMilestoneCollectionCompletion) {
          EventHelpers.tellPlayer(
            event,
            CollectHelper.nextMilestoneRewardMessage(event, collectionId)
          )
        }
        CollectHelper.tellPlayerCollectionProgress(event, collectionId)
      }

      if (!subCatCompleted) {
        CollectHelper.tellPlayerCollectionProgress(event, subCollectionId)
      }
    }
  },
  debugClearPlayerCollection: (event) => {
    if (EventHelpers.isPlayerShifting(event)) {
        CollectLogger.clearCollectibles(event)
        EventHelpers.tellPlayer(event, Text.translate('item.kubejs.debug_clear_player_collection.message'))
    }
  },
  get isCollectListCategoriesValid () {
    let categories = CollectListHelper.categoryIds
    let length = categories.length
    for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
        if (categories[i] === categories[j]) {
          return false
        }
      }
    }
    return true
  } 
}