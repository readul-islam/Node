var Logger = require("./Logger");

var logger = new Logger();

class Product {
  constructor(name, inventory = []) {
    this.name = name;
    this.inventory = inventory;
    logger.log(`New Product: ${name} has ${inventory.length} items in stock.`);
  }
}

module.exports = Product;
