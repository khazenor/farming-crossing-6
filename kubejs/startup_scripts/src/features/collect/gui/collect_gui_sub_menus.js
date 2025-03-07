const CollectGuiSubMenus = {
  openSubMenuForCategory (event, categoryId) {
    let subMenu = new MenuWrapper(CollectTransHelper.categoryName(categoryId), { colStart: 1 })
    let subCollectionIdsByCollectionId = CollectCaches.subCollectionIdsByCollectionId
    let subCollectionIds = subCollectionIdsByCollectionId[categoryId]
    
    for (let subCollectionId of subCollectionIds) {
      let collectedIds = CollectLogger.playerCollectionByCategory(event, subCollectionId)
      let subCollectionItemIds = CollectCaches.categoryLists[subCollectionId]
      let itemIds = ArrayHelper.arrayDiff(subCollectionItemIds, collectedIds)
      subMenu.addSlot({
        label: CollectTransHelper.categoryName(subCollectionId),
        item: "minecraft:slime_ball"
      }, { "col": 0 })
      for (let itemId of itemIds) {
        subMenu.addSlot({
          label: TransHelper.itemName(itemId),
          item: itemId
        })
      }
      subMenu.nextRow()
    }

    subMenu.menu.show(event.player)
  }
}