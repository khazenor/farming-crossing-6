const ArrayHelper = {
  toStrArray (objArray) {
    let list = []
    for (let val of objArray) {
      list.push(StrHelper.cleanStr(val))
    }
    return list
  },
  addToObjectArray (objArray, key, value) {
    if (objArray[key]) {
      objArray[key].push(value)
    } else {
      objArray[key] = [value]
    }
  },
  arrayDiff (parentArray, subtractArray) {
    let arrayDiff = []
    for (let parentVal of parentArray) {
      if (!subtractArray.includes(parentVal)) {
        arrayDiff.push(parentVal)
      }
    }
    return arrayDiff
  }
}