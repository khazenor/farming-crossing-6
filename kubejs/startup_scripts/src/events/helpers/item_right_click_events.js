const getItemRightClickEvents = () => {
  let eventsObj = {}
  eventsObj[MilesTicketConsts.ticketId] = (event) => {
    global.MilesTicketEventMethods.bundleMilesTickets(event)
  }
  eventsObj[MilesTicketConsts.bookletId] = (event) => {
    global.MilesTicketEventMethods.unBundleMilesBooklet(event)
  }
  return eventsObj
}
