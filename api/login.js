const loginUser=require('../routes/login')

const login =async (request,response)=>{
    const {username,password}=request.body;
    const output=await loginUser(username,password);
    response.status(output.statusCode).json(output.token? {token:output.token, message: output.message} : {message :output.message})
};
module.exports=login;