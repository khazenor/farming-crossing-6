const CollectHelper = {
  isIdNewCollectible (event, objectId) {
    if (CollectListHelper.isACollectible(objectId)) {
      let playerCollection = CollectLogger.playerCollection(event)
      if (!playerCollection.includes(objectId)) {
        return true
      }
    }
    return false
  },
  tellPlayerCollectionProgress(event, categoryId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, categoryId).length
    let collectionSize = CollectCaches.categoryLists[categoryId].length
    let percent = collectedNum * 100 / collectionSize
    let subCategoryRewardText = ''
    if (CollectListHelper.isSubCollectionId(categoryId)) {
      subCategoryRewardText = Text.translate(
        CollectTransHelper.messageKey('subCatReward'),
        StrHelper.cleanFloor(
          CollectRewards.subCollectionCompletionReward(categoryId)
        )
      )
    }

    EventMethods.tellPlayer(event, Text.translate(
      CollectTransHelper.messageKey('genericCollected'),
      CollectTransHelper.categoryName(categoryId),
      StrHelper.cleanFloor(collectedNum),
      StrHelper.cleanFloor(collectionSize),
      StrHelper.cleanFloor(percent),
      subCategoryRewardText
    ))
  },
  nextMilestoneRewardMessage(event, collectionId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, collectionId).length
    let nextRewardText = ''
    let nextMilestone = CollectMilestoneMethods.nextMilestoneForCollection(collectionId, collectedNum)
    let nextReward = CollectMilestoneMethods.rewardForCategoryMilestone(nextMilestone, collectionId)
    nextRewardText = Text.translate(
      CollectTransHelper.messageKey('milestone'),
      StrHelper.cleanFloor(nextMilestone),
      StrHelper.cleanFloor(nextMilestone - collectedNum),
      StrHelper.cleanFloor(nextReward)
    )
    return nextRewardText
  },
  isNextMilestoneCollectionCompletion (event, collectionId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, collectionId).length
    let nextMilestone = CollectMilestoneMethods.nextMilestoneForCollection(collectionId, collectedNum)
    let collectionLength = CollectCaches.categoryLists[collectionId].length
    return nextMilestone === collectionLength

  },
  categoryCompleted (event, categoryId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, categoryId).length
    let collectionSize = CollectCaches.categoryLists[categoryId].length
    return collectedNum === collectionSize
  },
  milestoneReached (event, collectionId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, collectionId).length
    let milestones = CollectCaches.milestonesForCollection(collectionId)
    return milestones.includes(collectedNum)
  },
  handleCollectionCompleted (event, categoryId) {
    EventMethods.tellPlayer(
      event,
      Text.translate(
        CollectTransHelper.messageKey('categoryCompleted'),
        CollectTransHelper.categoryNameCaps(categoryId)
      )
    )
    let certificateId = CollectTransHelper.certificateId(categoryId)
    EventMethods.tellPlayer(
      event,
      Text.translate(
        CollectTransHelper.messageKey('categoryCompletedCongrats'),
        Text.translate(TransHelper.itemName(certificateId))
      )
    )
    EventMethods.givePlayerItemStack(
      event, certificateId, 1
    )
    MilesTicketEventMethods.givePlayerMilesTickets(
      event,
      CollectMilestoneMethods.rewardForCollectionCompleted(categoryId)
    )
  },
  handleMilestoneReached (event, categoryId) {
    let collectedNum = CollectLogger.playerCollectionByCategory(event, categoryId).length
    EventMethods.tellPlayer(
      event,
      Text.translate(
        CollectTransHelper.messageKey('milestoneReached'),
        CollectTransHelper.categoryName(categoryId),
        StrHelper.cleanFloor(collectedNum)
      )
    )
    MilesTicketEventMethods.givePlayerMilesTickets(
      event,
      CollectMilestoneMethods.rewardForCategoryMilestone(collectedNum, categoryId)
    )
  },
  handleSubCollectionCompleted (event, subCollectionId) {
    EventMethods.tellPlayer(
      event,
      Text.translate(
        CollectTransHelper.messageKey('categoryCompleted'),
        CollectTransHelper.categoryNameCaps(subCollectionId)
      )
    )
    MilesTicketEventMethods.givePlayerMilesTickets(
      event,
      CollectRewards.subCollectionCompletionReward(subCollectionId)
    )
  }
}