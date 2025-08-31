var Logger = require("./Logger");

var logger = new Logger();

class Customer {
  constructor(name, funds = 0) {
    this.name = name;
    this.funds = funds;
    logger.log(`New Customer: ${name} has ${funds} in their account.`);
  }
}

module.exports = Customer;
