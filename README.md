## Project - Books Management

design a simple REST API for managing a collection of books. The API should
allow users to perform CRUD (create, read, update, delete) operations on books using HTTP
requests.






## Tech Stack

    Node.js for server-side JavaScript
    Express.js for building the web application
    MongoDB for the database
    Mongoose for object modeling
    


    ## Sample database schema:

## The MongoDB database can have the following collections:

    Book

    title (string)
    author (string)
    description (string)
    publishedDate (string)

  

## The API should support the following endpoints:

 . GET /books: Retrieves a list of all books in the collection
 . GET /books/:id: Retrieves a specific book by Id
 . POST /books: Creates a new book in the collection
 . PUT /books/:id: Updates an existing book by Id
 . DELETE /books/:id: Deletes a book by Id