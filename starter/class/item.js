class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  getItemByName() {
    return this.name;
  }

  getItemByDescription() {
    return this.description;
  }

}

module.exports = {
  Item,
};
