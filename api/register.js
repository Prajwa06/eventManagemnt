const registerUser=require('../routes/register');

const register= async (request,response)=>{
    const {username, email, password}=request.body;
    const output=await registerUser(username,email,password);
    response.status(output.statusCode).json({message :output.message});
}

module.exports=register;