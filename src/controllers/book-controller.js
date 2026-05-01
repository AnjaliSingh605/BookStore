const Books = require("../models/book");

const AddNewBook = async(req, res)=>{
    try{
    const BookData = req.body;

    const newBook = await  Books.create(BookData);
    if(newBook){
        return res.status(200).json({
            success : true,
            message : "New Book Added successfully"
        });
    }
    }catch(err){
         console.log("ERROR:", err); 
        res.status(500).json({
            success : false,
            message : "Some Error occured, Unable to add Book Try again later"
        })
    }
}

const UpdateBook = async(req, res)=>{
    try{
        const BookData = req.body;
        const BookId = req.params.id;

        const UpdatedData = await Books.findByIdAndUpdate( BookId, 
        BookData,
        {new : true,  runValidators: true});


        if(!UpdatedData){
            return res.status(200).json({
                success : false,
                message : "Not Able to update data"
            })
        }

        res.status(200).json({
            success: true,
            message : "Book Data Uploaded Successfully!"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Some Error occured, Unable to add Book Try again later"
        })
    }
};

const deleteBook = async(req, res)=>{
    try{
      const bookId = req.params.id;
      
      const deletedBook = await Books.findByIdAndDelete(bookId);

      if(!deletedBook){
        return res.status(404).json({
            success : false,
            message : "No Books Found"
        });
      };

      res.status(200).json({
        success : true,
        message : "Book Deleted Successfully"
      });

    }catch(err){
       res.status(500).json({
        success : false,
        message : "Some Error Occured. Try Again Later"
       })
    }
};

const getSingleBook = async(req, res)=>{
    try{
    const bookId = req.params.id;

    const findBook = await Books.findById(bookId);

    if(!findBook){
        return res.status(404).json({
            sucess : false,
            message : "No Book Found"
        })
    }

    res.status(200).json({
        sucess : true,
        message : "Book Found Successfully!",
        findBook
    })

    }catch(err){
        console.log(err);
        res.status(500).json({
        success : false,
        message : "Some Error Occured. Try Again Later"
       })
    }
}

const getAllBooks = async(req, res)=>{
    try{
       const books = await Books.find({});

       if(books.length === 0){
        res.status(404).json({
            sucess : false,
            message : "NO Book Found",
            data : books
        })
       }

       res.status(200).json({
        success : true,
        message : "Books found successfully",
        data : books
       })

    }catch(err){
        res.status(500).json({
        success : false,
        message : "Some Error Occured. Try Again Later"
       })
    }
}

module.exports = {
    getAllBooks,
    getSingleBook,
    deleteBook,
    AddNewBook ,
    UpdateBook
};