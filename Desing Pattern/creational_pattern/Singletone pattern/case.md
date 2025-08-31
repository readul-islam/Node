Sometimes, we need to collect information from multiple sources. To manage this, we often create a "bucket" or structure to store the collected data. However, the problem arises when our application ends up creating multiple separate buckets, making it difficult to consolidate all the information into one place.

To solve this, we can use the Singleton Pattern.

Instead of creating multiple instances (or buckets) throughout our application, we can create a single shared instance and export it using default export. In Node.js, modules are cached after the first import, so when we export a new instance and import it elsewhere, Node.js will always return the same instance. This ensures that all parts of our application interact with the same shared bucket for data collection.

This approach guarantees consistency and avoids duplication of data containers across the app.
