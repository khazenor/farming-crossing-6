// priority: -1
StartupEvents.registry('item', event => {
  let itemIds = [].concat(
    MilesTicketCustomItems,
    CollectCustomItems.simpleItemIds
  )
  for (let itemId of itemIds) {
    event.create(itemId)
  }

  let nonStackableIds = CollectCustomItems.nonStackableIds
  for (let itemId of nonStackableIds) {
    event.create(itemId).maxStackSize(1)
  }
})

// test codes
CollectTestCodes.testMilestoneRewards()