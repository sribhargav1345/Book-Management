const express = require("express");
const router = express.Router();

const Books = require("../models/books");
const Users = require("../models/Users");

const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { File } = require("buffer");

const upload = multer({ dest: 'uploads/'});

// Posting a new single book
router.post("/", async(req,res) => {

    try{
        const book_present = await Books.findOne({ title: req.body.title, author: req.body.author });

        if(book_present){
            return res.status(400).json({ error: "Book Aldready present "});
        }

        const book_id = await Books.findOne({ bookId: req.body.bookId });

        if(book_id){
            return res.status(400).json({ error: "ID Aldready registered"});
        }

        const newBook =  new Books({
            bookId: req.body.bookId,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            count: req.body.count
        });

        await newBook.save();

        return res.json({ success: true, book: newBook });
    }
    catch(error){
        console.error("Error Adding books:", error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

// Posting of multiple books
router.post("/upload",upload.single('file'), async(req,res) => {
    
    if(!req.file){
        return res.status(400).json({ error: "File Not uploaded "});
    }

    try{
        const books = []
        const file = req.file.path;

        fs.createReadStream(file)
        .pipe(csv())
        .on('data', (row) => {

            // Cleaning the row, so that spaces won't affect our solution
            const cleanedRow = {};
            for (let key in row) {
                const trimmedKey = key.trim();
                cleanedRow[trimmedKey] = row[key];
            }

            books.push(cleanedRow);
        })
        .on('end', async() => {
            try{
                const errors = [];
                for(const book of books){
                    
                    const book_present = await Books.findOne({ title: book.title, author: book.author });

                    if(book_present){
                        errors.push(`Book with the Title ${book.title} and Author ${book.author} is aldready present`);
                        continue;
                    }

                    const book_id = await Books.findOne({ bookId: book.bookId });

                    if(book_id){
                        errors.push(`Book with the ID ${book_id} is aldready present`);
                        continue;
                    }

                    const newBook =  new Books({
                        bookId: book.bookId,
                        title: book.title,
                        author: book.author,
                        genre: book.genre,
                        year: book.year,
                        count: book.count
                    });
            
                    await newBook.save();
                }
                res.status(200).json({ message: `Successfull: ${books.length-errors.length} Books, Failed: ${errors.length} Books`})
            }   
            catch(error){
                res.status(500).json({ message: "File Received, Internal Server Error"});
            }
        })
    }
    catch(error){
        res.status(500).json({ message: "Internal Server Error"});
    }
});


// Retrieving books based on query parameters
router.get('/books', async (req, res) => {

    try {
        const { bookId, title, author, genre, year } = req.query;
        let filter = {};

        if (bookId) filter.bookId = Number(bookId);
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

// Issuing,Returning Books related
router.post("/books/:book_id", async(req,res) => {

    const { book_id } = req.params;
    const { email, action } = req.body;

    try{ 
        const book = await Books.findOne({ bookId: book_id });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (action === "Issue") {
            
            if(book.count <= 1){
                return res.status(400).json({ message: "Can't Issue, Only 1 left" });
            }

            if (!user.issues.includes(book_id)){
                user.issues.push(book_id);

                book.count -= 1;
                console.log(book.count);
                
                await user.save();
                return res.status(200).json({ message: 'Book issued successfully' });
            } 
            else {
                return res.status(400).json({ message: 'Book already issued to the user' });
            }
        } 
        else if (action === "Return") {

            if (user.issues.includes(book_id)) 
            {
                user.issues = user.issues.filter(id => id != book_id);

                book.count += 1;
                await user.save();
                return res.status(200).json({ message: 'Book returned successfully' });
            } 
            else {
                return res.status(400).json({ message: 'Book not issued to the user' });
            }
        } 
        else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})

module.exports = router;