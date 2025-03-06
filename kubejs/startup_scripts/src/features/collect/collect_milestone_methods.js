const CollectMilestoneMethods = {
  isNumberAMilestoneForCategory(number, categoryId) {
    return Object.keys(
      CollectCaches.rewardsByMilestonesForCategory(categoryId)
    ).includes(number)
  },
  rewardForCategoryMilestone (milestoneNumber, categoryId) {
    return CollectCaches.rewardsByMilestonesForCategory(categoryId)[milestoneNumber]
  },
  rewardForCollectionCompleted (collectionId) {
    let milestones = CollectCaches.milestonesForCollection(collectionId)
    let lastMilestone = milestones[milestones.length - 1]
    return CollectCaches.rewardsByMilestonesForCategory(collectionId)[lastMilestone]
  },
  nextMilestoneForCollection (collectionId, number) {
    for (let milestone of CollectCaches.milestonesForCollection(collectionId)) {
      if (milestone > number) {
        return milestone
      }
    }
    return null
  },
  isMilestoneForCollection (collectionId, number) {
    return CollectCaches.milestonesForCollection(collectionId).includes(number)
  }
}