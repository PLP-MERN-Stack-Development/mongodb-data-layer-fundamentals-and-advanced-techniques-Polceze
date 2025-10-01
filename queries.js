// Week 1 MERN assignment - MongoDB CRUD Operations, Advanced Queries, Aggregation, and Indexing

// =============================================
// TASK 2: Basic CRUD Operations
// =============================================

print("=== TASK 2: Basic CRUD Operations ===");

// 1. Find all books in a specific genre (I choose Fiction)
const fictionBooks = db.books.find({ genre: "Fiction" }).toArray();
print(`\n1. Found ${fictionBooks.length} Fiction books`);

// 2. Find books published after a certain year (Solution for year 1950)
print("\n2. Books published after 1950:");
const booksAfter1950 = db.books.find({ published_year: { $gt: 1950 } }).toArray();
print(`Found ${booksAfter1950.length} books published after 1950`);

// 3. Find books by a specific author (I pick George Orwell)
const orwellBooks = db.books.find({ author: "George Orwell" }).toArray();
print(`\n3. Found ${orwellBooks.length} books by George Orwell`);

// 4. Update the price of a specific book
print("\n4. Updating price of 'The Great Gatsby' to 11.99:");
const updateResult = db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 11.99 } }
);
print(`Update result: ${JSON.stringify(updateResult)}`);
print("Updated document:");
const updatedBook = db.books.find({ title: "The Great Gatsby" }).toArray();

// 5. Delete a book by its title
print("\n5. Deleting 'Moby Dick':");
const deleteResult = db.books.deleteOne({ title: "Moby Dick" });
print(`Delete result: ${JSON.stringify(deleteResult)}`);
const remainingCount = db.books.countDocuments();
print(`Remaining books count: ${remainingCount}`);

// =============================================
// TASK 3: Advanced Queries
// =============================================

print("\n=== TASK 3: Advanced Queries ===");

// 1. Find books that are both in stock and published after 2010
print("\n1. Books in stock published after 2010:");
const inStockRecent = db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 
}).toArray();
print(`Found ${inStockRecent.length} books in stock published after 2010`);

// 2. Use projection to return only title, author, and price
print("\n2. Books with projection (title, author, price only):");
const projectedBooks = db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
).toArray();
print(`Found ${projectedBooks.length} Fiction books with projection`);

// 3. Implement sorting by price (ascending and descending)
print("\n3a. Books sorted by price (ascending):");
const sortedAsc = db.books.find({}, { title: 1, price: 1, _id: 0 })
  .sort({ price: 1 })
  .toArray();
printjson(sortedAsc);

print("\n3b. Books sorted by price (descending):");
const sortedDesc = db.books.find({}, { title: 1, price: 1, _id: 0 })
  .sort({ price: -1 })
  .toArray();
printjson(sortedDesc);

// 4. Use limit and skip for pagination (5 books per page)
print("\n4. Pagination - Page 1 (books 1-5):");
const page1 = db.books.find({}, { title: 1, author: 1, _id: 0 })
  .limit(5)
  .skip(0)
  .toArray();
printjson(page1);

print("\nPage 2 (books 6-10):");
const page2 = db.books.find({}, { title: 1, author: 1, _id: 0 })
  .limit(5)
  .skip(5)
  .toArray();
printjson(page2);

// =============================================
// TASK 4: Aggregation Pipeline
// =============================================

print("\n=== TASK 4: Aggregation Pipeline ===");

// 1. Calculate average price of books by genre
print("\n1. Average price by genre:");
const avgPriceByGenre = db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }
  }
]).toArray();
printjson(avgPriceByGenre);

// 2. Find author with the most books
const authorsMostBooks = db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 3
  }
]).toArray();
printjson(authorsMostBooks);

// 3. Group books by publication decade and count them
print("\n3. Books count by publication decade:");
const booksByDecade = db.books.aggregate([
  {
    $project: {
      title: 1,
      published_year: 1,
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  {
    $sort: { _id: 1 }
  }
]).toArray();
printjson(booksByDecade);

// =============================================
// TASK 5: Indexing
// =============================================

print("\n=== TASK 5: Indexing ===");

// 1. Create an index on the title field
print("\n1. Creating index on title field:");
const titleIndex = db.books.createIndex({ title: 1 });
print(`Title index created: ${titleIndex}`);

// 2. Create a compound index on author and published_year
print("\n2. Creating compound index on author and published_year:");
const compoundIndex = db.books.createIndex({ author: 1, published_year: 1 });
print(`Compound index created: ${compoundIndex}`);

// 3. Use explain() to demonstrate performance improvement
print("\n3. Performance comparison with explain():");

print("\nQuery without index (on genre field - no index):");
const withoutIndex = db.books.find({ genre: "Fiction" }).explain("executionStats");
print(`Execution time: ${withoutIndex.executionStats.executionTimeMillis} ms`);
print(`Documents scanned: ${withoutIndex.executionStats.totalDocsExamined}`);

print("\nQuery with title index:");
const withTitleIndex = db.books.find({ title: "1984" }).explain("executionStats");
print(`Execution time: ${withTitleIndex.executionStats.executionTimeMillis} ms`);
print(`Documents scanned: ${withTitleIndex.executionStats.totalDocsExamined}`);

print("\nQuery with compound index (author and year):");
const withCompoundIndex = db.books.find({ 
  author: "George Orwell", 
  published_year: { $gt: 1940 } 
}).explain("executionStats");
print(`Execution time: ${withCompoundIndex.executionStats.executionTimeMillis} ms`);
print(`Documents scanned: ${withCompoundIndex.executionStats.totalDocsExamined}`);

// Show all indexes
print("\n4. Current indexes on books collection:");
const indexes = db.books.getIndexes();
printjson(indexes);

print("\n=== End of Assignment! ===");