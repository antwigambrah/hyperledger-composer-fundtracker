
class localForage {
  setItem (name, item) {
    localStorage.setItem(name, JSON.stringify(item))
  }
  clearStorage () {
    localStorage.clear()
  }
}

export default new localForage()
