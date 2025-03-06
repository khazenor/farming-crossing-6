const CollectGuiMainMenu = {
  openMainMenu (event) {
    let mainMenu = new MenuType(Text.translate('collect.gui.name.mainMenu'))
    mainMenu.addSlot({page: 0, x: 0, y: 0,
      label:CollectTransHelper.categoryName('blocks'),
      item: "minecraft:oak_log",
      onLeftClicked: (_clickedEvent) => {
        CollectGuiSubMenus.openSubMenuForCategory(event, 'blocks')
      }
    });
    mainMenu.show(event.player)
  }
}