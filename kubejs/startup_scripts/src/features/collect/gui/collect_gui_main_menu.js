const CollectGuiMainMenu = {
  openMainMenu (event) {
    let mainMenu = new MenuWrapper(Text.translate('collect.gui.name.mainMenu'))

    mainMenu.addSlot({
      label:CollectTransHelper.categoryName('blocks'),
      item: CollectLists['blocks'].icon,
      onLeftClicked: (_clickedEvent) => {
        CollectGuiSubMenus.openSubMenuForCategory(event, 'blocks')
      }
    })

    mainMenu.addSlot({
      label:CollectTransHelper.categoryName('items'),
      item: CollectLists['items'].icon,
      onLeftClicked: (_clickedEvent) => {
        CollectGuiSubMenus.openSubMenuForCategory(event, 'items')
      }
    })

    mainMenu.addSlot({
      label:CollectTransHelper.categoryName('entities'),
      item: CollectLists['entities'].icon,
      onLeftClicked: (_clickedEvent) => {
        CollectGuiSubMenus.openSubMenuForCategory(event, 'entities')
      }
    })

    mainMenu.menu.show(event.player)
  }
}