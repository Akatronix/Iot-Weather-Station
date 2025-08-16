// const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI).then(() => {
//       console.log("connected to database");
//     });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// module.exports = connectDB;

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
