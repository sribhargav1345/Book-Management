const express = require("express");
const router = express.Router();

const cron = require("node-cron");

const Books = require("../models/books");
const Users = require("../models/Users");
const Issues = require("../models/Issues");
const Returns = require("../models/Return");

// Issuing, Returning Books related
router.post("/books/:book_id", async (req, res) => {

    const { book_id } = req.params;
    const { email, action } = req.body;

    try {
        const book = await Books.findOne({ bookId: book_id });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (action === "Issue") {
            if (book.count <= 1) {
                return res.status(400).json({ message: "Can't issue, only 1 left" });
            }

            if (!user.issues.includes(book_id)) {
                user.issues.push(book_id);
                book.count -= 1;

                await user.save();
                await book.save();

                const issue = new Issues({
                    email: email,
                    bookId: book_id,
                });

                await issue.save();
                return res.status(200).json({ message: 'Book issued successfully' });
            } 
            else {
                return res.status(400).json({ message: 'Book already issued to the user' });
            }
        } 
        else if (action === "Return") {
            if (user.issues.includes(book_id)) {

                user.issues = user.issues.filter(id => id !== book_id);
                book.count += 1;

                await user.save();
                await book.save(); 

                const returns = new Returns({
                    email: email,
                    bookId: book_id,
                    createdAt: new Date() 
                });

                await returns.save();

                await Issues.findOneAndDelete({ email: email, bookId: book_id });

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
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get("/issues", async (req, res) => {
    try {
        const { email, bookId } = req.query;
        let filter = {};

        if (email) filter.email = { $regex: email, $options: 'i' };
        if (bookId) filter.bookId = Number(bookId);

        const issues = await Issues.find(filter);

        const issuesWithUserNames = await Promise.all(issues.map(async issue => {
            const user = await Users.findOne({ email: issue.email }, 'name').lean();
            return {
                _id: issue._id,
                email: issue.email,
                bookId: issue.bookId,
                date: issue.date,
                name: user ? user.name : null
            };
        }));

        res.json({ issues: issuesWithUserNames });
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/returns", async (req, res) => {
    try {
        const { email, bookId } = req.query;
        let filter = {};

        if (email) filter.email = { $regex: email, $options: 'i' };
        if (bookId) filter.bookId = Number(bookId);

        const returns = await Returns.find(filter);

        const returnsWithUserNames = await Promise.all(returns.map(async retur => {
            const user = await Users.findOne({ email: retur.email }, 'name').lean();
            return {
                _id: retur._id,
                email: retur.email,
                bookId: retur.bookId,
                date: retur.date,
                name: user ? user.name : null
            };
        }));

        res.json({ returns: returnsWithUserNames });
    } catch (error) {
        console.error('Error fetching returns:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

cron.schedule('0 0 * * *', async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const result = await Returns.deleteMany({
            createdAt: { $lt: thirtyDaysAgo }
        });

        console.log(`Cleanup complete: ${result.deletedCount} old issues removed.`);
    } 
    catch (err) {
        console.error("Error during cleanup:", err);
    }
});

module.exports = router;
