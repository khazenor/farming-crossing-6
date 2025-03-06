const MilesTicketEventMethods = {
  bundleMilesTickets: (event) => {
    if (EventGetters.isPlayerShifting(event)) {
      let numToBundle = MilesTicketConsts.numTicketsToBundle
      while (EventGetters.numItemsInPlayer(event, MilesTicketConsts.ticketId) >= numToBundle) {
        EventMethods.removeItemsInPlayer(
          event,
          MilesTicketConsts.ticketId,
          numToBundle
        )
        EventMethods.givePlayerItemStack(
          event,
          MilesTicketConsts.bookletId,
          1
        )
      }
    }
  },
  unBundleMilesBooklet: (event) => {
    if (EventGetters.isPlayerShifting(event)) {
      EventGetters.mainHandItem(event).count --
      EventMethods.givePlayerItemStack(
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

    EventMethods.givePlayerItemStack(
      event,
      MilesTicketConsts.bookletId,
      numBooklets
    )

    EventMethods.givePlayerItemStack(
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

    EventMethods.tellPlayer(
      event,
      Text.translate(
        'milesTicket.message.tixObtained',
        StrHelper.cleanFloor(numTickets),
        bundledDesc
      )
    )
  }
}