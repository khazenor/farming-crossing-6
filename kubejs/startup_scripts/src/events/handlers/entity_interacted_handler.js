const entityInteractedHandler = (event) => {
  CollectMethods.checkAndLogCollectible(
    event,
    EventMethods.targetType(event)
  )
}