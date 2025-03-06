const MilesTicketRecipes = {
  addRecipes: (event) => {
    RecipeHelpers.addShapeless(
      event,
      `${MilesTicketConsts.numTicketsToBundle}x ${MilesTicketConsts.ticketId}`,
      [MilesTicketConsts.bookletId]
    )
  }
}