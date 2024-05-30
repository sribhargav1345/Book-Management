const express = require("express");
const router = express.Router();

const Books = require("../models/books");
const Users = require("../models/Users");

// Posting a new book
router.post("/", async(req,res) => {

    try{
        const book_present = await Books.findOne({title: req.body.title, author: req.body.author});

        if(book_present){
            return res.status(400).json({ error: "Book Aldready present "});
        }

        const newBook =  new Books({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year
        });

        await newBook.save();

        return res.json({ success: true, book: newBook });
    }
    catch(error){
        console.error("Error Adding books:", error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

//Retrieving all books
router.get("/Books-all", async(req,res) => {

    try{
        const books = await Books.find();
        return res.json({ success: true, books });
    }
    catch(err){
        console.error("Error retrieving books:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Retrieving books based on query parameters
router.get('/books', async (req, res) => {

    try {
        const { title, author, genre, year } = req.query;
        let filter = {};

        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };
        if (genre) filter.genre = { $regex: genre, $options: 'i' };
        if (year) filter.year = Number(year);

        const books = await Books.find(filter);
        res.json({ books });
    } 
    catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Updating a book
router.put("/Books/:book_id", async(req,res) => {

    const { book_id } = req.params;

    try{
        const book = await Books.findById(book_id);

        if(!book){
            return res.status(404).json({ error: "Book Not Found "});
        }

        const updatedBook = await Books.findByIdAndUpdate(book_id, req.body, { new: true });

        return res.json({ success: true, book: updatedBook });
    }
    catch(err){
        console.error("Error updating book:", err);
        return res.status(500).json({ err: "Internal Server error"});
    }
});

// Deleting the book
router.delete("/Books/:book_id", async(req,res) => {

    const {book_id} = req.params;

    try{
        const book = await Books.findById(book_id);

        if(!book){
            return res.status(404).json({ error: "Book Not Found "});
        }

        await Books.findByIdAndDelete(book_id);

        return res.status(200).json({ success: true, message: "Successfully Deleted"});
    }
    catch(err){
        console.log("Error deleting book");
        return res.status(500).json({ err: "Internal Server error, not deleted"});
    }
});

// Issuing Books related
router.get("/books/:book_id", async(req,res) => {

    const { book_id } = req.params;

    const { email } = req.body;

    try{ 
        const book = Books.findOne({ book_id });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const user = Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.books.push(book._id);
        await user.save();
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})

module.exports = router;