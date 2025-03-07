const PlayerDataHelper = {
  addToPlayerList (event, key, val) {
    let playerDataList = EventHelpers.playerData(event)[key]
    if (playerDataList) {
      let jsList = ArrayHelper.toStrArray(playerDataList)
      jsList.push(val)
      EventHelpers.playerData(event)[key] = jsList
    } else {
      EventHelpers.playerData(event)[key] = [val]
    }
  },
  getPlayerList (event, key) {
    if (EventHelpers.playerData(event)[key]) {
      return ArrayHelper.toStrArray(
        EventHelpers.playerData(event)[key]
      )
    } else {
      return []
    }
  },
  clearKey (event, key) {
    if (EventHelpers.playerData(event)[key]) {
      delete EventHelpers.playerData(event)[key]
    }
  }
}