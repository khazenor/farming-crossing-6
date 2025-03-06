const CollectMilestones = {
  rewardsByMilestonesForCategory (categoryId) {
    let milestones = this.milestonesForCollection(categoryId)
    let rewardsByMilestones = {}

    for (let i = 0; i < milestones.length; i++) {
      let prev = i ? milestones[i - 1] : 0
      let cur = milestones[i]
      let reward = CollectRewards.rewardForRange(
        CollectLists[categoryId].startingRewardPerObject,
        CollectLists[categoryId].rewardIncreasePerObject,
        prev,
        cur
      )
      if (i === milestones.length - 1) {
        reward = reward * CollectConst.collectionCompletedRewardMultiplier
      }
      rewardsByMilestones[cur] = reward
    }
    return rewardsByMilestones
  },
  milestonesForCollection (collectionId) {
    let categoryLength = CollectCaches.categoryLists[collectionId].length
    let milestones = this._milestonesForCollectionLength(categoryLength)
    return milestones
  },
  _milestonesForCollectionLength (length) {
    let genericMilestones = this._genericMilestones
    let milestones = []
    let curMilestoneIdx = 0
    while (genericMilestones[curMilestoneIdx] <= length) {
      milestones.push(genericMilestones[curMilestoneIdx])
      curMilestoneIdx ++
    }
    let prevDiff = (
      milestones[milestones.length - 1] -
      milestones[milestones.length - 2]
    )
    let curDiff = (
      length - 
      milestones[milestones.length - 1]
    )
    if (curDiff < prevDiff) {
      milestones.pop()
      milestones.push(length)
    }
    return milestones
  },
  get _genericMilestones () {
    let prev = CollectConst.rewardMilestoneStart
    let rewardMilestones = [prev]
    let cur = CollectConst.rewardMilestoneStart
    let temp = null
    while (cur < CollectConst.rewardMilestoneCap) {
      temp = cur
      cur = prev + cur
      prev = temp
      rewardMilestones.push(cur)
    }
    return rewardMilestones
  }
}