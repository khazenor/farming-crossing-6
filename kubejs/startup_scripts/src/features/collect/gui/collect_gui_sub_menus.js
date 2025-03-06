const CollectGuiSubMenus = {
  openSubMenuForCategory (event, categoryId) {
    let subMenu = new MenuType(CollectTransHelper.categoryName(categoryId))
    let subCollectionIdsByCollectionId = CollectCaches.subCollectionIdsByCollectionId
    let subCollectionIds = subCollectionIdsByCollectionId[categoryId]

    let curPage = 0
    let curRow = 1
    let rowLength = 5
    let colLength = 9
    let colStart = 1
    let rowStart = 0
    
    for (let subCollectionId of subCollectionIds) {
      let collectedIds = CollectLogger.playerCollectionByCategory(event, subCollectionId)
      let subCollectionItemIds = CollectCaches.categoryLists[subCollectionId]
      let itemIds = ArrayHelper.arrayDiff(subCollectionItemIds, collectedIds)
      subMenu.addSlot({
        page: curPage,
        x:0, y: curRow,
        label: CollectTransHelper.categoryName(subCollectionId),
        item: "minecraft:slime_ball"
      })
      let curCol = colStart
      for (let itemId of itemIds) {
        subMenu.addSlot({
          page: curPage,
          x: curCol, y:curRow,
          label: TransHelper.itemName(itemId),
          item: itemId
        })
        if (curCol < colLength - 1) {
          curCol += 1
        } else {
          curCol = colStart
          if (curRow < rowLength - 1) {
            curRow += 1
          } else {
            curPage += 1
            curRow = rowStart
          }
        }
      }
      if (curRow < rowLength - 1) {
        curRow += 1
      } else {
        curPage += 1
        curRow = rowStart
      }
    }

    subMenu.show(event.player)
  }
}