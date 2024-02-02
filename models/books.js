const { ObjectId } = require("mongodb");

module.exports = (mongoose) => {
    const Book = mongoose.model(
      'books',
      mongoose.Schema(
        {
          title: String,
          authorId: ObjectId,
          genre: String,
          year: String
        },
        { timestamps: true }
      )
    );
  
    return Book;
  };
