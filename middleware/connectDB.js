const mongoose=require('mongoose');
require('dotenv').config();



const uri = process.env.MONGO_URI;



async function connectDB() {
  mongoose.connect(uri);
  const db = mongoose.connection;
  // check connection status
  db.once("open", () => {
    console.log("Db is connected");
  });
}



module.exports = connectDB;