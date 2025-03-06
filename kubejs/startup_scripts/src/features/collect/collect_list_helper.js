const CollectListHelper = {
  get allCollectibleIds() {
    let byCollection = this.byCollection
    let collectibleIds = []
    for (let collectionId in byCollection) {
      collectibleIds = collectibleIds.concat(byCollection[collectionId])
    }
    return collectibleIds
  },
  get byCollection () {
    let byCollection = {}
    for (let collectionId in CollectLists) {
      let collectibleIds = []
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections
      
      for (let subCollectionId in subCollections) {
        let subCollection = subCollections[subCollectionId]
        collectibleIds = collectibleIds.concat(subCollection)
      }

      byCollection[collectionId] = collectibleIds
    }
    return byCollection
  },
  get byCategory () {
    let byCategory = {}
    for (let collectionId in CollectLists) {
      let collectibleIds = []
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections
      
      for (let subCollectionId in subCollections) {
        let subCollection = subCollections[subCollectionId]
        collectibleIds = collectibleIds.concat(subCollection)
        byCategory[subCollectionId] = subCollection
      }

      byCategory[collectionId] = collectibleIds
    }
    return byCategory
  },
  get allCategoryIds () {
    let categoryIds = []
    for (let collectionId in CollectLists) {
      categoryIds.push(collectionId)
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections
      for (let subCollectionId in subCollections) {
        categoryIds.push(subCollectionId)
      }
    }
    return categoryIds
  },
  get categoryIds () {
    let categoryIds = []
    for (let collectionId in CollectLists) {
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections

      categoryIds.push(collectionId)

      for (let subCollectionId in subCollections) {
        categoryIds.push(subCollectionId)
      }
    }
    return categoryIds
  },
  get subCategoryIds () {
    let subCategoryIds = []
    for (let collectionId in CollectLists) {
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections

      for (let subCollectionId in subCollections) {
        subCategoryIds.push(subCollectionId)
      }
    }
    return subCategoryIds
  },
  get collectionIds () {
    return Object.keys(CollectLists)
  },
  get collectionIdBySubCollectionId () {
    let subCategoryIdByCollection = {}
    for (let collectionId in CollectLists) {
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections

      for (let subCollectionId in subCollections) {
        subCategoryIdByCollection[subCollectionId] = collectionId
      }
    }
    return subCategoryIdByCollection
  },
  get subCollectionIdsByCollectionId () {
    let subCollectionIdsByCollectionId = {}
    for (let collectionId in CollectLists) {
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections

      for (let subCollectionId in subCollections) {
        ArrayHelper.addToObjectArray(
          subCollectionIdsByCollectionId,
          collectionId,
          subCollectionId
        )
      }
    }
    return subCollectionIdsByCollectionId
  },
  isACollectible (objectId) {
    return this.allCollectibleIds.includes(objectId)
  },
  collectionIdOfCollectible (collectableId) {
    let byCollection = this.byCollection
    for (let collectionId in byCollection) {
      let collectionIds = byCollection[collectionId]
      if (collectionIds.includes(collectableId)) {
        return collectionId
      }
    }
    return null
  },
  subCollectionIdOfCollectible (collectableId) {
    for (let collectionId in CollectLists) {
      let collection = CollectLists[collectionId]
      let subCollections = collection.subCollections
      
      for (let subCollectionId in subCollections) {
        let subCollection = subCollections[subCollectionId]
        if (subCollection.includes(collectableId)) {
          return subCollectionId
        }
      }
    }
    return null
  },
  isCollectionId (categoryId) {
    return categoryId in CollectLists
  },
  isSubCollectionId (categoryId) {
    return !this.isCollectionId(categoryId)
  },
  collectionIdFromSubCollectionId (subCollectionId) {
    return CollectCaches.collectionIdBySubCollectionId[
      subCollectionId
    ]
  },
  collectionFromSubCollectionId (subCollectionId) {
    return CollectLists[
      this.collectionIdFromSubCollectionId(subCollectionId)
    ]
  },
  startingRewardForSubCollection (subCollectionId) {
    return this.collectionFromSubCollectionId(subCollectionId).startingRewardPerObject
  },
  rewardIncreaseForSubCollection (subCollectionId) {
    return this.collectionFromSubCollectionId(subCollectionId).rewardIncreasePerObject
  }
}