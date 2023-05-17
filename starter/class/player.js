const { Character } = require("./character");
const { Enemy } = require("./enemy");
const { Food } = require("./food");
const { World } = require("./world");

class Player extends Character {
  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  hit(name) {
    // get enemy in current room by name;
    // we apply damage to it
    // if no enemy found
    // we print no enemy found message

    const enemy = this.currentRoom.getEnemyByName(name);

    if (enemy) {
      enemy.applyDamage(this.strength);
      console.log(name + " recieved damage");
      enemy.setPlayer(this);
      return;
    }

    console.log("no enemy found");
  }

  takeItem(itemName) {
    // find item in current room
    // we remove it from current room
    // add to players items

    const item = this.currentRoom.getItemByName(itemName);

    if (item) {
      this.currentRoom.items.splice(
        this.currentRoom.items.indexOf(item), 1
      );
      this.items.push(item);
      console.log(itemName + " taken");
      return;
    }

    console.log("not found");
  }

  dropItem(itemName) {
    // get item by name
    // if found we remove from inventory
    // add item into current room items.

    let item = this.getItemByName(itemName);

    if (item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.currentRoom.items.push(item);
      console.log(itemName + " dropped");
      return;
    }

    console.log("not found here");
  }

  eatItem(itemName) {
    // get item by name
    const item = this.getItemByName(itemName);

    // if item, remove from items array.
    if (item instanceof Food) {
      this.items.splice(this.items.indexOf(item), 1);
      console.log("You ate " + item.description);
      this.health += 20;
      return;
    }

    console.log("You have no food");
  }

  getItemByName(itemName) {
    const item = this.items.find((item) => item.name === itemName);
    return item ?? "not found";
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player,
};
