const inventoryChangedHandler = (event) => {
  let collectibleId = InventoryChangedHelper.item(event).id
  CollectMethods.checkAndLogCollectible(event, collectibleId)
}