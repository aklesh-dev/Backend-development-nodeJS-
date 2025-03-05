const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://akleshyadav0408:akleshyadav1998@cluster0.i20uv.mongodb.net/')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting DB:', err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// user model
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
  try {
    // create a new document
    // const newUser = await User.create({
    //   name: 'Aklesh Yadav',
    //   email: 'aklesh@gmail.com',
    //   age: '26',
    //   isActive: true,
    //   tags: ['developer', 'designer', 'manager'],
    // });

    // const newUser = new User({
    //   name: 'Izumi Yadav',
    //   email: 'izumi@gmail.com',
    //   age: '26',
    //   isActive: true,
    //   tags: ['developer', 'designer', 'manager'],
    // });
    // await newUser.save();

    // console.log(newUser);

    // const allUsers = await User.find();
    // console.log(allUsers);

    const getUserActive = await User.find({isActive: true});
    console.log("Active user:", getUserActive);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

runQueryExamples();