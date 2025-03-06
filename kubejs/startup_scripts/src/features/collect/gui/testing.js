const testGui = (event) => {
  _testCodes.showMenu2(event)
}

const _testCodes = {
  showMenu (event) {
    ///////////////
    // Menu Data //
    ///////////////
    let player = event.player
    
    let ironMenu = new MenuType(Text.blue("Iron Menu"));
    ironMenu.addSlot({page: 0, x: 0, y: 0, item: "minecraft:stone"});
    ironMenu.addSlot({page: 0, x: 4, y: 3, label: "Unused", item: "minecraft:stone"});
    ironMenu.addSlot({page: 0, x: 8, y: 0, label: "Unused", item: "minecraft:stone"});
    ironMenu.addSlot({page: 0, x: 4, y: 1, label: "The Eye", item: "minecraft:ender_eye",
      onLeftClicked: (player) => player.sendSystemMessage("Eye Left Clicked"),
      onRightClicked: (player) => player.sendSystemMessage("Eye Right Clicked")});
    ironMenu.addSlot({page: 1, x: 4, y: 0, label: "Unused", item: "minecraft:stone"});
    ironMenu.addSlot({page: 1, x: 2, y: 2, label: "Unused", item: "minecraft:stone"});
    ironMenu.addSlot({page: 1, x: 6, y: 2, label: "The Dirt", item: "minecraft:dirt",
      onThrown: (player) => player.sendSystemMessage("Dirt Thrown")});
    ironMenu.addSlot({page:2, x: 4, y: 2, label: "Explode", item: "minecraft:tnt",
      onLeftClicked: (player) => player.getLevel().createExplosion(player.x, player.y, player.z).explode()});
    
    let goldMenu = new MenuType(Text.red("Gold Menu"));
    goldMenu.addSlot({page: 0, x: 4, y: 2, label: "Random Stuff", item: "minecraft:stick"});
    goldMenu.addSlot({page: 1, x: 4, y: 2, label: "Random Stuff", item: "minecraft:dead_bush"});
    goldMenu.addSlot({page: 2, x: 4, y: 2, label: "Random Stuff", item: "minecraft:flint"});
    goldMenu.addSlot({page: 3, x: 2, y: 2, label: "Random Stuff", item: "minecraft:coal"});
    goldMenu.addSlot({page: 3, x: 4, y: 2, label: "Random Stuff", item: "minecraft:coal"});
    goldMenu.addSlot({page: 3, x: 6, y: 2, label: "Random Stuff", item: "minecraft:coal"});
    
    ironMenu.show(player)
  },
  showMenu2 (event) {
    let testMenu = new MenuType('testing')
    let subCollectionIdsByCollectionId = CollectCaches.subCollectionIdsByCollectionId
    let subCollectionIds = subCollectionIdsByCollectionId['blocks']

    let curPage = 0
    let curRow = 1
    let rowLength = 5
    let colLength = 9
    let colStart = 1
    let rowStart = 1
    
    for (let subCollectionId of subCollectionIds) {
      let collectedIds = CollectLogger.playerCollectionByCategory(event, subCollectionId)
      let subCollectionItemIds = CollectCaches.categoryLists[subCollectionId]
      let itemIds = ArrayHelper.arrayDiff(subCollectionItemIds, collectedIds)
      testMenu.addSlot({
        page: curPage,
        x:0, y: curRow,
        label: CollectTransHelper.categoryName(subCollectionId),
        item: "minecraft:slime_ball"
      })
      let curCol = colStart
      for (let itemId of itemIds) {
        testMenu.addSlot({
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

    testMenu.show(event.player)
  },
  testCertificateMessage () {
    let certificateId = CollectTransHelper.certificateId('items')
    EventMethods.tellPlayer(
      event,
      Text.translate(
        CollectTransHelper.messageKey('categoryCompletedCongrats'),
        TransHelper.itemName(certificateId)
      )
    )
  }
}