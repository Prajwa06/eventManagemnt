const {userRegistrationSchema} =require('../validation/userRegistration');
const User = require('../models/User');
const bcrypt =require('bcrypt');
const registerUser = async (username,email,password)=>{
    try{
        // validate input using zod
        const parsedData =  userRegistrationSchema.safeParse({
            username,
            email,
            password,
        });

        if(!parsedData.success){
            console.log(parsedData.error);
            return{
                statusCode : 403,
                message    : "Validation error, Please enter valid input",
            }
        }

       data=parsedData.data;
       

        // check if the user already exist
        const existingUser = await User.findOne({username:data.username});

        if(existingUser){
            return {
                statusCode : 400,
                message    : "User already exist",
            };
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // create new user
        const newUser = new User({
            username: data.username,
            email : data.email,
            password : hashedPassword,
        });

        await newUser.save();

        return {
            statusCode : 201,
            message    : "User registerd succesfully"
        };


    }catch(error){
        if(error ){
            console.log(error);
            return{
                statusCode : 400,
                message    : "Registration failed, Please try again" 
            }
        }
        return{
            statusCode : 500,
            message    : "Internal server error"
        }
    }
}

module.exports=registerUser;