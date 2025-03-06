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

    // const getUserActive = await User.find({isActive: true});
    // console.log("Active user:", getUserActive);

    // const getSingleUser = await User.findOne({name:'Izumi Yadav'})
    // console.log(getSingleUser);

    // const getLastCreatedUserById = await User.findById(newUser._id)
    // console.log(getLastCreatedUserById);


    // const selectedFields = await User.find().select('name email -_id'); // Exclude the _id field from the result
    // console.log(selectedFields);

    // const limitedUsers = await User.find().limit(5).skip(1); // Retrieve 5 users starting from the second user (skip the first one)
    // console.log(limitedUsers);

    // const sortedUsers = await User.find().sort({age: -1}); // Retrieve all users sorted by age in descending order
    // console.log(sortedUsers);

    // const countDocument = await User.countDocuments({isActive: true}); // Count the number of active users

    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);

    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 100 },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log("updated user", updateUser);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

runQueryExamples();