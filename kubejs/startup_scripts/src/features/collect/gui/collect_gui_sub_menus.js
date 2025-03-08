const CollectGuiSubMenus = {
  openSubMenuForCategory (event, categoryId) {
    let subMenu = new MenuWrapper(CollectTransHelper.categoryName(categoryId), { colStart: 1 })
    let subCollectionIdsByCollectionId = CollectCaches.subCollectionIdsByCollectionId
    let subCollectionIds = subCollectionIdsByCollectionId[categoryId]
    
    for (let subCollectionId of subCollectionIds) {
      let collectedIds = CollectLogger.playerCollectionByCategory(event, subCollectionId)
      let subCollectionItemIds = CollectCaches.categoryLists[subCollectionId]
      let itemIds = ArrayHelper.arrayDiff(subCollectionItemIds, collectedIds)
      if (itemIds.length > 0) {
        subMenu.addSlot({
          label: CollectTransHelper.categoryName(subCollectionId),
          item: "minecraft:nether_star"
        }, { "col": 0 })
        for (let itemId of itemIds) {
          let itemIcon
          let label
          if (CollectEntity.isEntityCollection(categoryId)) {
            itemIcon = CollectEntity.spawnEggFromEntityType(itemId)
            label = TransHelper.entityName(itemId)
          } else {
            itemIcon = itemId
            label = TransHelper.itemName(itemId)
          }
          subMenu.addSlot({
            label: label,
            item: itemIcon
          })
        }
        subMenu.nextRow()
      }
    }

    subMenu.menu.show(event.player)
  }
}