const { Int32 } = require("mongodb");

module.exports = (mongoose) => {
    const Author = mongoose.model(
      'authors',
      mongoose.Schema(
        {
          firstName: String,
          lastName: String,
          age: Number,
          email: String,
          city: String,
          country: String,
          isActive: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Author;
  };
