const CollectRewards = {
  rewardForRange (startingPrice, increasePerObject, startIdx, endIdx) {
    let startPricePerObj = this._adjustedPrice(
      startingPrice,
      increasePerObject,
      startIdx
    )
    let endPricePerObj = this._adjustedPrice(
      startingPrice,
      increasePerObject,
      endIdx
    )
    let length = endIdx - startIdx
    let preRoundReward = this._rewardAmount(
      startPricePerObj,
      endPricePerObj,
      length
    )
    return Math.floor(preRoundReward)
  },
  subCollectionCompletionReward (subCollectionId) {
    let startingReward = CollectListHelper.startingRewardForSubCollection(subCollectionId)
    let rewardIncrease = CollectListHelper.rewardIncreaseForSubCollection(subCollectionId)
    let subCollLength = CollectCaches.categoryLists[subCollectionId].length
    let endReward = this._adjustedPrice(startingReward, rewardIncrease, subCollLength)
    let reward = this._rewardAmount(
      startingReward,
      endReward,
      subCollLength
    )
    return Math.floor(reward)
  },
  _rewardAmount (startingPrice, endingPrice, length) {
    return (startingPrice + endingPrice) * length / 2
  },
  _adjustedPrice (startingPrice, increasePerObject, number) {
    return startingPrice + (increasePerObject * number)
  }
}