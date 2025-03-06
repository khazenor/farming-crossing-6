const CollectCustomItems = {
  get simpleItemIds () {
    let ids = []
    ids = ids.concat(
      this._hardCodedIds
    )
    return ids
  },
  get nonStackableIds () {
    return this._certificates
  },
  get _hardCodedIds () {
    return [
      CollectConst.clearCollectionId
    ]
  },
  get _certificates () {
    let ids = []
    for (let categoryId of CollectListHelper.collectionIds) {
      ids.push(CollectTransHelper.certificateId(categoryId))
    }
    return ids
  }
}