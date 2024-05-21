const express = require("express");
const router = express.Router();

const Books = require("../models/books");
const validationBooks = require("../middlewares/validationBooks");

// Posting a new book
router.post("/api", validationBooks, async(req,res) => {

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
        console.error("Error Adding books:", err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

// Retrieving all books
router.get("/api/Books", async(req,res) => {

    try{
        const books = await Books.find();

        return res.json({ success: true, books });
    }
    catch(err){
        console.error("Error retrieving books:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Updating a book
router.put("api/Books/:book_id", async(req,res) => {

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
router.delete("/api/Books/:book_id", async(req,res) => {

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

module.exports = router;