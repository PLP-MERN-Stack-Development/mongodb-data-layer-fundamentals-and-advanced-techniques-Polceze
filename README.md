# MongoDB Fundamentals - Week 1 Assignment

This project demonstrates comprehensive MongoDB operations including CRUD, advanced queries, aggregation pipelines, and indexing for a bookstore database.

## Prerequisites

- MongoDB Atlas account
- `mongosh` (MongoDB Shell) installed
- Internet connection
- Access to the `plp_bookstore` database

## Database Setup

1. **Ensure your database has the books collection** with sample data. If not, run the insertion script first:

```bash
# Load the initial book data
load("insert_books.js")
```
## Running the Queries Script

1. Connect to your MongoDB Atlas database using mongosh:

```bash
mongosh "mongodb+srv://Cluster0.your-cluster-id.mongodb.net/plp_bookstore" --username your-username
```
2. Once connected, run the queries script:
```bash
load("queries.js")
```
## Script Output
The script will execute and display results for:

### Task 2: Basic CRUD Operations
- Find all books in "Fiction" genre

- Find books published after 1950

- Find books by George Orwell

- Update price of "The Great Gatsby"

- Delete "Moby Dick" book

### Task 3: Advanced Queries
- Books in stock published after 1950

- Projection showing only title, author, price

- Sorting by price (ascending/descending)

- Pagination (5 books per page)

### Task 4: Aggregation Pipeline
- Average price by genre

- Authors with most books

- Books count by publication decade

### Task 5: Indexing
- Create indexes on title field

- Create compound index on author + published_year

- Performance comparison using explain()

## Expected Results
- After running the script, you should see:

- JSON output of all query results

- Counts of documents found

- Aggregation results with calculated values

- Index creation confirmation

- Performance metrics

## Files in this Project
- insert_books.js - Initial data population script

- queries.js - Main assignment queries script

- README.md - This documentation file

## Troubleshooting
- Connection issues: Ensure your IP is whitelisted in Atlas Network Access

- Database not found: Make sure you're connected to the correct cluster and database

- Script errors: Verify all files are in the same directory as where you're running mongosh