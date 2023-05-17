class Character {
  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    for (let item of this.items) {
      this.currentRoom.items.push(
        this.items.pop(item)
      );
    }

    this.currentRoom = null;
  }
}

module.exports = {
  Character,
};
