import express from 'express'
import bodyParser from 'body-parser'
import {Book} from './models/books.js'
import mongoose from 'mongoose';

const app  = express();
app.use(bodyParser.urlencoded({extended:true}));


//1. connection url
const url = `mongodb://localhost:27017/booksDB`;

////////////////////////////////////////////
////////SETTING UP THE ROUTES/////////////////

/////////////////////////////////////////////
//1. GET ROUTE for performing R of CRUD operations

//Getting all the books

app.get("/api/booksinfo", async (req,res)=>{

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const books = await Book.find()
            console.log(books);
            res.send(JSON.stringify(books));
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Reading from DB ${err}`)
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }


})

//getting a book by ID
app.get("/api/booksinfo/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const book = await Book.findOne({_id})
            console.log(book);
            res.send(JSON.stringify(book));

            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Reading from DB ${err}`)
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }

})

//2. POST ROUTE performing C of CRUD operations
app.post("/api/addbook", async (req,res)=>{

    //process the request body
    const {title,rating,author,numberInStock,like} = req.body;

    const newBook = new Book({title,rating,author,numberInStock,like})

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const savedBook = await newBook.save()
            console.log(`Save Successful: ${savedBook}`);
            res.send(JSON.stringify(savedBook));
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Adding the new document to DB ${err}`)
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }


})

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`The app is up and listening on port ${port}`)
})

//3. PUT ROUTE performing U operation of CRUD operations
//deleting a book by ID
app.put("/api/updatebook/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    //process the request body
    const {title,rating,author,numberInStock,like} = req.body;
    const updatedData = {title,rating,author,numberInStock,like}

    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const updatedBook = await Book.findByIdAndUpdate(filter,updatedData, {new:true});
            if (updatedBook) {
                console.log(`Sucessfully Updated ${updatedBook}`);
                res.send(JSON.stringify(updatedBook))
            }
            else {
                console.log(`No matching document could be found `)
                res.send(`No matching document could be found.`)
            }
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Deleting from DB ${err}`)
        }
    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }

})

//4. DELETE ROUTE performing D of CRUD operation
//deleting a book by ID
app.delete("/api/deletebook/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const result = await Book.deleteOne(filter);
            if (result.deletedCount === 0) {
                console.log(`No matching document could be found; so deleted none`);
                res.send(`No matching document could be found; so deleted none`)
            }
            else {
                console.log(`Successfully deleted ${result.deletedCount} documents.`)
                res.send(`Successfully deleted ${result.deletedCount} documents.`)
            }
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Deleting from DB ${err}`)
        }
    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }

})