const { userLoginSchema } = require("../validation/userLogin");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY=process.env.SECRET_KEY;
const loginUser = async (username, password) => {
  try {
    // input validation
    const parsedData = userLoginSchema.safeParse({
      username,
      password,
    });

    if (!parsedData.success) {
      return {
        statusCode: 403,
        message: "Validation error, Please enter valid input",
      };
    }

    data = parsedData.data;

    // find the user in database
    const user = await User.findOne({ username: data.username });

    if (!user){
      return {
        statusCode: 400,
        message: "User does not exist",
      };
    }
      // compared the entered password with hashed password
      const isMatch = await bcrypt.compare(data.password, user.password);
      if(!isMatch){
        return {
            statusCode: 401,
            message: "Invalid Password, Please try Again",
          };
      }

      // Generate a JWT
      const token=jwt.sign({username:data.username},SECRET_KEY);


      // send response 
      return{
        statusCode: 200,
        message: "Login Succesful",
        token : token
      }
  } catch (error) {
    console.log("Error during login, ", error.message);
    return {
        statusCode: 500,
        message: "Internal Server Error",
    }
  }
};

module.exports = loginUser;
