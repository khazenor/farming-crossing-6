const entityInteractedHandler = (event) => {
  CollectMethods.checkAndLogCollectible(
    event,
    EventHelpers.targetType(event)
  )
}