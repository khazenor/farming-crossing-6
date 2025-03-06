const EventGetters = {
  player: (event) => {
    return event.player
  },
  isPlayerShifting: (event) => {
    return event.player.shiftKeyDown
  },
  mainHandItem: (event) => {
    return event.player.mainHandItem
  },
  numItemsInPlayer: (event, itemId) => {
    let count = 0
    for (let itemStack of event.player.inventory.allItems) {
      if (itemStack.id === itemId) {
        count += itemStack.count
      }
    }
    return count
  },
  playerData: (event) => {
    return event.player.persistentData
  }
}

const EventMethods = {
  tellPlayer: (event, msg) => {
    EventGetters.player(event).tell(msg)
  },
  givePlayerItemStack: (event, itemId, count) => {
    let itemObj = Item.of(itemId)
    itemObj.count = count
    EventGetters.player(event).give(itemObj)
  },
  removeItemsInPlayer: (event, itemId, numToRemove) => {
    let player = EventGetters.player(event)
    let numLeftToRemove = numToRemove
    for (let itemStack of player.inventory.allItems) {
      if (itemStack.id === itemId) {
        if (itemStack.count <= numLeftToRemove) {
          numLeftToRemove -= itemStack.count
          itemStack.count = 0
        } else {
          itemStack.count -= numLeftToRemove
          numLeftToRemove = 0
        }
        if (numLeftToRemove <= 0) {
          break
        }
      }
    }
  },
  add: (event, target, data) => {
    event.add(target, data)
  },
  targetType: (event) => {
    return StrHelper.cleanStr(event.target.type)
  }
}