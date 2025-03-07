const MilesTicketTooltips = {
  tooltipHandler: (event) => {
    EventHelpers.add(
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

    EventHelpers.add(
      event,
      MilesTicketConsts.ticketId,
      Text.translate(TransHelper.defaultTransKey(MilesTicketConsts.ticketId, 1))
    )
  }
}