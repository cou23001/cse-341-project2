module.exports = (mongoose) => {
    const User = mongoose.model(
      'users',
      mongoose.Schema(
        {
          email: String,
          username: String,
          name: String,
          ipaddress: String,
        },
        { timestamps: true }
      )
    );
  
    return User;
  };
