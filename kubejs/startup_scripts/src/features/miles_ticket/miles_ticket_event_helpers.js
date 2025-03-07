const MilesTicketEventMethods = {
  bundleMilesTickets: (event) => {
    if (EventHelpers.isPlayerShifting(event)) {
      let numToBundle = MilesTicketConsts.numTicketsToBundle
      while (EventHelpers.numItemsInPlayer(event, MilesTicketConsts.ticketId) >= numToBundle) {
        EventHelpers.removeItemsInPlayer(
          event,
          MilesTicketConsts.ticketId,
          numToBundle
        )
        EventHelpers.givePlayerItemStack(
          event,
          MilesTicketConsts.bookletId,
          1
        )
      }
    }
  },
  unBundleMilesBooklet: (event) => {
    if (EventHelpers.isPlayerShifting(event)) {
      EventHelpers.mainHandItem(event).count --
      EventHelpers.givePlayerItemStack(
        event,
        MilesTicketConsts.ticketId,
        MilesTicketConsts.numTicketsToBundle
      )
    }
  },
  givePlayerMilesTickets: (event, numTickets) => {
    let bundleRate = MilesTicketConsts.numTicketsToBundle
    let numBooklets = Math.floor(numTickets / bundleRate)
    let numTixLeftover = numTickets - numBooklets * bundleRate

    EventHelpers.givePlayerItemStack(
      event,
      MilesTicketConsts.bookletId,
      numBooklets
    )

    EventHelpers.givePlayerItemStack(
      event,
      MilesTicketConsts.ticketId,
      numTixLeftover
    )

    let bundledDesc = numBooklets
      ? Text.translate(
        'milesTicket.message.bundledDesc',
        StrHelper.cleanFloor(numBooklets),
        StrHelper.cleanFloor(numTixLeftover)
      )
      : ''

    EventHelpers.tellPlayer(
      event,
      Text.translate(
        'milesTicket.message.tixObtained',
        StrHelper.cleanFloor(numTickets),
        bundledDesc
      )
    )
  }
}