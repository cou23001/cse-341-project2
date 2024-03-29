module.exports = (mongoose) => {
    const User = mongoose.model(
      'users',
      mongoose.Schema(
        {
          username: String,
          password: String,
          name: String
        },
        { timestamps: true }
      )
    );
    return User;
  };