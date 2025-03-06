const MilesTicketTooltips = {
  tooltipHandler: (event) => {
    EventMethods.add(
      event,
      MilesTicketConsts.bookletId,
      [
        Text.translate(
          TransHelper.defaultTransKey(MilesTicketConsts.bookletId, 1),
          StrHelper.cleanFloor(MilesTicketConsts.numTicketsToBundle)
        ),
        Text.translate(TransHelper.defaultTransKey(MilesTicketConsts.bookletId, 2))
      ]
    )

    EventMethods.add(
      event,
      MilesTicketConsts.ticketId,
      Text.translate(TransHelper.defaultTransKey(MilesTicketConsts.ticketId, 1))
    )
  }
}