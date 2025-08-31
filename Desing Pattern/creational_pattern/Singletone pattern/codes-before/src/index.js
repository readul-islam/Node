var Logger = require("./Logger");
var Customer = require("./Customer");
var Product = require("./Product");

var logger = new Logger();

logger.log("starting app...");

var codelicks = new Customer("Codelicks", 600);
var book_product = new Product("Some books", [
  {
    item: "Book1",
    qty: 5,
    price: 200,
  },
  {
    item: "Book2",
    qty: 20,
    price: 39,
  },
]);

logger.log("finished setup...");

console.log(`${logger.count} total logs`);
logger.logs.map((log) => console.log(`   ${log.message}`));
