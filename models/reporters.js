const { Int32 } = require("mongodb");

module.exports = (mongoose) => {
    const Reporter = mongoose.model(
      'reporters',
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
  
    return Reporter;
  };
