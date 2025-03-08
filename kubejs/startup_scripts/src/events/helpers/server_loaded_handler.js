const serverLoadedHandler = (_event) => {
  if (!CollectMethods.isCollectListCategoriesValid) {
    throw new Error("Farming Crossing Modpack Error: Either the script files of the pack is modified or the modpack creator had made a mistake with the modpack.  If you haven't made any change to the modpack, please join the modpack discord and report this issue.");    
  }
}