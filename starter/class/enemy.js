const { Character } = require("./character");

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    // get all exits path in current room
    // select a room at room from exits rooms
    // move enemy to that room.

    let exits = this.currentRoom.getExits();
    let randomExit = exits[Math.floor(Math.random() * exits.length)];
    let nextRoom = this.currentRoom.getRoomInDirection(randomExit);
    this.currentRoom = nextRoom;

    this.cooldown += 1000;
    this.act();
    this.attackTarget = null;
  }

  takeSandwich() {
    // at every room, we check for sandwich
    let food = this.currentRoom.getItemByName(sandwich);

    if (food) {
      this.currentRoom.items.splice(
        this.currentRoom.items.indexOf(food), 1
      );
      this.items.push(food);
      this.health += 10;
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player) {
      if (this.player.currentRoom === this.currentRoom) {
        this.alert(message);
      }
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function (){
      this.cooldown = 0;
    };
    setTimeout(() => resetCooldown, this.cooldown);
  }

  attack() {
    this.attackTarget.applyDamage(this.strength);
    console.log(`The ${this.name} hit you for ${this.strength} damage.`);
    this.cooldown += 3000;
    this.act();
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
      console.log(`The ${this.name} died.`);
    } else {
      this.attackTarget = this.player;
      this.act();
    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    setTimeout(() => this.scratchNose, 3000);
  }

  scratchNose() {
    this.cooldown += 1000;
    this.act();
    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
